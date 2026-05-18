import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib';

const SIGNED_URL_TTL = 7 * 24 * 60 * 60;

/**
 * Replaces Unicode characters that pdf-lib's WinAnsi (CP1252) standard fonts
 * cannot encode with ASCII-safe equivalents. Anything still outside printable
 * ASCII or Latin-1 supplement after replacement is replaced with '?'.
 * Latin-1 accented characters (é, ñ, ü, etc.) are preserved because WinAnsi
 * supports them.
 */
function sanitizeForWinAnsi(text: string): string {
  if (!text) return '';

  const replacements: Record<string, string> = {
    // Box-drawing horizontals/verticals
    '─': '-', '━': '-', '│': '|', '┃': '|',
    '┄': '-', '┅': '-', '┆': '|', '┇': '|',
    '┈': '-', '┉': '-', '┊': '|', '┋': '|',
    // Box-drawing corners and junctions
    '┌': '+', '┍': '+', '┎': '+', '┏': '+',
    '┐': '+', '┑': '+', '┒': '+', '┓': '+',
    '└': '+', '┕': '+', '┖': '+', '┗': '+',
    '┘': '+', '┙': '+', '┚': '+', '┛': '+',
    '├': '+', '┤': '+', '┬': '+', '┴': '+', '┼': '+',
    // Block elements
    '▀': '#', '▄': '#', '█': '#', '▌': '#', '▐': '#',
    '░': '#', '▒': '#', '▓': '#',
    // Dashes
    '‐': '-', '‑': '-', '‒': '-', '–': '-',
    '—': '--', '―': '--',
    // Quotes
    '‘': "'", '’': "'", '‚': ',', '‛': "'",
    '“': '"', '”': '"', '„': '"', '‟': '"',
    '′': "'", '″': '"',
    // Bullets
    '•': '*', '‣': '>', '⁃': '-',
    '⁌': '*', '⁍': '*', '∙': '*',
    '○': 'o', '●': '*', '◦': 'o',
    // Spaces (collapse to regular space; strip zero-width)
    ' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ',
    ' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ',
    ' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ',
    '　': ' ',
    '​': '', '‌': '', '‍': '', '﻿': '',
    // Ellipsis
    '…': '...',
    // Arrows
    '←': '<-', '→': '->', '↑': '^', '↓': 'v',
    '↔': '<->', '⇒': '=>', '⇐': '<=',
    // Math
    '×': 'x', '÷': '/', '−': '-', '±': '+/-',
    '≠': '!=', '≤': '<=', '≥': '>=', '∞': 'inf',
    // Checkmarks
    '✓': '[x]', '✔': '[x]', '✗': '[ ]', '✘': '[ ]',
    // Trademark
    '™': '(TM)',
  };

  let result = text;
  for (const [from, to] of Object.entries(replacements)) {
    if (result.indexOf(from) !== -1) {
      result = result.split(from).join(to);
    }
  }

  // Final pass: replace anything still outside tab/newline/printable ASCII/Latin-1 supplement with '?'
  result = result.replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '?');

  return result;
}

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    if (paragraph.length <= maxCharsPerLine) {
      lines.push(paragraph);
      continue;
    }
    let remaining = paragraph;
    while (remaining.length > maxCharsPerLine) {
      const slice = remaining.slice(0, maxCharsPerLine);
      const breakAt = slice.lastIndexOf(' ');
      if (breakAt === -1) {
        lines.push(slice);
        remaining = remaining.slice(maxCharsPerLine);
      } else {
        lines.push(slice.slice(0, breakAt));
        remaining = remaining.slice(breakAt + 1);
      }
    }
    if (remaining) lines.push(remaining);
  }
  return lines;
}

async function drawTextPages(
  pdf: PDFDocument,
  text: string,
  fontSize = 11
): Promise<void> {
  const font = await pdf.embedFont(StandardFonts.TimesRoman);
  const margin = 72;
  const pageWidth = PageSizes.Letter[0];
  const pageHeight = PageSizes.Letter[1];
  const usableWidth = pageWidth - margin * 2;
  const usableHeight = pageHeight - margin * 2;
  const lineHeight = fontSize * 1.4;
  // approximate chars per line
  const charsPerLine = Math.floor(usableWidth / (fontSize * 0.5));
  const wrapped = wrapText(sanitizeForWinAnsi(text), charsPerLine);
  const linesPerPage = Math.floor(usableHeight / lineHeight);

  for (let i = 0; i < wrapped.length; i += linesPerPage) {
    const slice = wrapped.slice(i, i + linesPerPage);
    const page = pdf.addPage(PageSizes.Letter);
    let y = pageHeight - margin;
    for (const line of slice) {
      try {
        page.drawText(line, {
          x: margin,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      } catch (err) {
        console.warn('[generate-pdfs] drawText failed for line, skipping:', err);
      }
      y -= lineHeight;
    }
  }
}

async function appendImageAsPage(pdf: PDFDocument, bytes: Uint8Array, mime: string): Promise<boolean> {
  try {
    let img;
    if (mime.includes('png')) {
      img = await pdf.embedPng(bytes);
    } else if (mime.includes('jpg') || mime.includes('jpeg')) {
      img = await pdf.embedJpg(bytes);
    } else {
      // try jpg first then png
      try {
        img = await pdf.embedJpg(bytes);
      } catch {
        img = await pdf.embedPng(bytes);
      }
    }
    const page = pdf.addPage(PageSizes.Letter);
    const pageWidth = PageSizes.Letter[0];
    const pageHeight = PageSizes.Letter[1];
    const margin = 36;
    const maxW = pageWidth - margin * 2;
    const maxH = pageHeight - margin * 2;
    const ratio = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    page.drawImage(img, {
      x: (pageWidth - w) / 2,
      y: (pageHeight - h) / 2,
      width: w,
      height: h,
    });
    return true;
  } catch (err) {
    console.warn('[generate-pdfs] image embed failed:', err);
    return false;
  }
}

async function appendPdfBytes(pdf: PDFDocument, bytes: Uint8Array): Promise<boolean> {
  try {
    const src = await PDFDocument.load(bytes);
    const indices = src.getPageIndices();
    const copied = await pdf.copyPages(src, indices);
    for (const p of copied) pdf.addPage(p);
    return true;
  } catch (err) {
    console.warn('[generate-pdfs] pdf load failed:', err);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { clientId, letterId } = req.body ?? {};
  if (!clientId || !letterId) {
    return res.status(400).json({ error: 'Missing clientId or letterId' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: letter, error: lErr } = await supabase
    .from('dispute_letters')
    .select('*')
    .eq('id', letterId)
    .maybeSingle();
  if (lErr || !letter) {
    return res.status(404).json({ error: 'Letter not found' });
  }

  const { data: client, error: cErr } = await supabase
    .from('credit_repair_clients')
    .select('*')
    .eq('id', clientId)
    .maybeSingle();
  if (cErr || !client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const pdf = await PDFDocument.create();

  // Page 1: packet top slip
  if (letter.packet_top_slip) {
    await drawTextPages(pdf, letter.packet_top_slip, 12);
  }
  // Letter content
  if (letter.content) {
    await drawTextPages(pdf, letter.content, 11);
  }
  // Attachment A
  if (letter.attachment_a) {
    await drawTextPages(pdf, '\nATTACHMENT A\n\n' + letter.attachment_a, 11);
  }

  // Append exhibits
  const exhibitFields: Array<{ field: string; label: string }> = [
    { field: 'doc_dl_front', label: "Driver's License (Front)" },
    { field: 'doc_dl_back', label: "Driver's License (Back)" },
    { field: 'doc_ss_card', label: 'Social Security Card' },
    { field: 'doc_utility_bill', label: 'Utility Bill' },
    { field: 'doc_ftc_report', label: 'FTC Identity Theft Report' },
  ];

  for (const ex of exhibitFields) {
    const path = (client as Record<string, unknown>)[ex.field];
    if (typeof path !== 'string' || !path) continue;
    try {
      const { data: blob, error: dErr } = await supabase.storage
        .from('intake-documents')
        .download(path);
      if (dErr || !blob) continue;
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const lower = path.toLowerCase();
      if (lower.endsWith('.pdf')) {
        await appendPdfBytes(pdf, bytes);
      } else if (
        lower.endsWith('.jpg') ||
        lower.endsWith('.jpeg') ||
        lower.endsWith('.png')
      ) {
        await appendImageAsPage(pdf, bytes, lower.endsWith('.png') ? 'png' : 'jpg');
      } else {
        // HEIC or other — try image embed; skip on fail
        await appendImageAsPage(pdf, bytes, 'jpg');
      }
    } catch (err) {
      console.warn(`[generate-pdfs] failed to append ${ex.label}:`, err);
    }
  }

  const pdfBytes = await pdf.save();
  const storagePath = `${clientId}/letters/letter-${letterId}.pdf`;

  const { error: upErr } = await supabase.storage
    .from('intake-documents')
    .upload(storagePath, pdfBytes, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (upErr) {
    console.error('[generate-pdfs] upload error:', upErr);
    return res.status(500).json({ error: 'Failed to upload PDF' });
  }

  await supabase
    .from('dispute_letters')
    .update({ pdf_unsigned_path: storagePath })
    .eq('id', letterId);

  const { data: signed } = await supabase.storage
    .from('intake-documents')
    .createSignedUrl(storagePath, SIGNED_URL_TTL);

  return res.status(200).json({ path: storagePath, signedUrl: signed?.signedUrl ?? null });
  } catch (err) {
    console.error('[generate-pdfs] unhandled error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ error: message });
  }
}

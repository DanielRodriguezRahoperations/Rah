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
    // Double-line box drawing (U+2550–U+256C)
    '═': '=', '║': '|',
    '╒': '+', '╓': '+', '╔': '+', '╕': '+',
    '╖': '+', '╗': '+', '╘': '+', '╙': '+',
    '╚': '+', '╛': '+', '╜': '+', '╝': '+',
    '╞': '+', '╟': '+', '╠': '+', '╡': '+',
    '╢': '+', '╣': '+', '╤': '+', '╥': '+',
    '╦': '+', '╧': '+', '╨': '+', '╩': '+',
    '╪': '+', '╫': '+', '╬': '+',
    // Heavier dashes / shapes
    '▬': '-', '■': '#', '□': '#',
    // Warning / alert symbols
    '⚠': '!',   // ⚠
    '❗': '!',   // ❗
    '❕': '!',   // ❕
    '⁉': '!?',  // ⁉
    '‼': '!!',  // ‼
    // Checkboxes
    '☐': '[ ]', // ☐
    '☑': '[x]', // ☑
    '☒': '[x]', // ☒
    // Variation selectors (strip — these modify preceding emoji)
    '︀': '', '︁': '', '︂': '', '︃': '',
    '︄': '', '︅': '', '︆': '', '︇': '',
    '︈': '', '︉': '', '︊': '', '︋': '',
    '︌': '', '︍': '', '︎': '', '️': '',
    // Section / paragraph marks already-handled WinAnsi chars left alone (§ ¶ © ® already encode)
  };

  let result = text;
  for (const [from, to] of Object.entries(replacements)) {
    if (result.indexOf(from) !== -1) {
      result = result.split(from).join(to);
    }
  }

  // Final pass: replace anything still outside tab/newline/printable ASCII/Latin-1 supplement with '?'
  result = result.replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/gu, '?');

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

type LineSpec = {
  text: string;
  bold: boolean;
  size: number;
  spacingBefore: number;
  spacingAfter: number;
};

function isAllCapsHeader(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 4) return false;
  const alphaChars = trimmed.match(/[a-zA-Z]/g) || [];
  if (alphaChars.length < 3) return false;
  const upperCount = (trimmed.match(/[A-Z]/g) || []).length;
  const lowerCount = (trimmed.match(/[a-z]/g) || []).length;
  // Strict: entirely uppercase letters
  if (lowerCount === 0 && upperCount >= 3) return true;
  // Loose: predominantly uppercase AND has a header marker (ends with ':' or contains ' -- ')
  if (upperCount / alphaChars.length >= 0.7) {
    if (trimmed.endsWith(':')) return true;
    if (trimmed.includes(' -- ')) return true;
  }
  return false;
}

function classifyAndBuildLines(
  text: string,
  bodySize: number,
  charsPerLineBody: number,
  charsPerLineBold: number
): LineSpec[] {
  const out: LineSpec[] = [];
  const rawLines = text.split('\n');
  const headerSize = bodySize + 2;

  for (const raw of rawLines) {
    const line = raw.replace(/\s+$/, ''); // preserve leading indent
    const trimmed = line.trim();

    // Blank line
    if (trimmed === '') {
      out.push({ text: '', bold: false, size: bodySize, spacingBefore: 0, spacingAfter: 0 });
      continue;
    }

    // Divider row (replace with vertical space only)
    if (/^[-=_]{8,}$/.test(trimmed)) {
      out.push({ text: '', bold: false, size: bodySize, spacingBefore: 2, spacingAfter: 2 });
      continue;
    }

    // Roman numeral H1: "I. INTRODUCTION..."
    if (/^(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX)\.\s+[A-Z]/.test(trimmed)) {
      const wrapped = wrapText(trimmed, charsPerLineBold);
      for (let i = 0; i < wrapped.length; i++) {
        out.push({
          text: wrapped[i],
          bold: true,
          size: headerSize,
          spacingBefore: i === 0 ? 12 : 0,
          spacingAfter: i === wrapped.length - 1 ? 4 : 0,
        });
      }
      continue;
    }

    // RE: subject line
    if (/^RE:/i.test(trimmed)) {
      const wrapped = wrapText(trimmed, charsPerLineBold);
      for (let i = 0; i < wrapped.length; i++) {
        out.push({
          text: wrapped[i],
          bold: true,
          size: bodySize,
          spacingBefore: i === 0 ? 4 : 0,
          spacingAfter: i === wrapped.length - 1 ? 4 : 0,
        });
      }
      continue;
    }

    // All-caps subsection label
    if (isAllCapsHeader(trimmed)) {
      const wrapped = wrapText(line, charsPerLineBold);
      for (let i = 0; i < wrapped.length; i++) {
        out.push({
          text: wrapped[i],
          bold: true,
          size: bodySize,
          spacingBefore: i === 0 ? 6 : 0,
          spacingAfter: i === wrapped.length - 1 ? 2 : 0,
        });
      }
      continue;
    }

    // Body line
    const wrapped = wrapText(line, charsPerLineBody);
    for (const w of wrapped) {
      out.push({
        text: w,
        bold: false,
        size: bodySize,
        spacingBefore: 0,
        spacingAfter: 0,
      });
    }
  }

  return out;
}

async function drawTextPages(
  pdf: PDFDocument,
  text: string,
  fontSize = 11
): Promise<void> {
  const fontRegular = await pdf.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdf.embedFont(StandardFonts.TimesRomanBold);

  const margin = 72;
  const pageWidth = PageSizes.Letter[0];
  const pageHeight = PageSizes.Letter[1];
  const usableWidth = pageWidth - margin * 2;

  const charsPerLineBody = Math.floor(usableWidth / (fontSize * 0.5));
  const charsPerLineBold = Math.floor(usableWidth / (fontSize * 0.55));

  const sanitized = sanitizeForWinAnsi(text);
  const lines = classifyAndBuildLines(sanitized, fontSize, charsPerLineBody, charsPerLineBold);

  let page = pdf.addPage(PageSizes.Letter);
  let y = pageHeight - margin;

  for (const ls of lines) {
    const lineHeight = ls.size * 1.4;
    y -= ls.spacingBefore;

    if (y - lineHeight < margin) {
      page = pdf.addPage(PageSizes.Letter);
      y = pageHeight - margin;
    }

    if (ls.text !== '') {
      try {
        page.drawText(ls.text, {
          x: margin,
          y,
          size: ls.size,
          font: ls.bold ? fontBold : fontRegular,
          color: rgb(0, 0, 0),
        });
      } catch (err) {
        console.warn('[generate-pdfs] drawText failed for line, skipping:', err);
      }
    }

    y -= lineHeight;
    y -= ls.spacingAfter;
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
    const pageCount = src.getPageCount();
    if (pageCount === 0) return false;
    const indices = Array.from({ length: pageCount }, (_, i) => i);
    const embeddedPages = await pdf.embedPdf(src, indices);

    const pageWidth = PageSizes.Letter[0];
    const pageHeight = PageSizes.Letter[1];
    const margin = 36;
    const maxW = pageWidth - margin * 2;
    const maxH = pageHeight - margin * 2;

    for (const embedded of embeddedPages) {
      const ratio = Math.min(maxW / embedded.width, maxH / embedded.height);
      const w = embedded.width * ratio;
      const h = embedded.height * ratio;
      const newPage = pdf.addPage(PageSizes.Letter);
      newPage.drawPage(embedded, {
        x: (pageWidth - w) / 2,
        y: (pageHeight - h) / 2,
        width: w,
        height: h,
      });
    }
    return true;
  } catch (err) {
    console.warn('[generate-pdfs] pdf load/embed failed:', err);
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

  const attachedPaths = new Set<string>();

  for (const ex of exhibitFields) {
    const path = (client as Record<string, unknown>)[ex.field];
    if (typeof path !== 'string' || !path) continue;
    if (attachedPaths.has(path)) continue;
    attachedPaths.add(path);
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

  type FileEntry = { path: string; filename: string; uploaded_at: string };
  const toFileArr = (raw: unknown): FileEntry[] =>
    Array.isArray(raw) ? (raw as FileEntry[]) : [];

  const arrayFieldSpecs: Array<{ field: string; label: string }> = [
    { field: 'doc_ftc_reports', label: 'FTC Report (additional)' },
    { field: 'doc_additional_files', label: 'Additional File' },
    { field: 'doc_misc_files', label: 'Misc File' },
  ];

  for (const spec of arrayFieldSpecs) {
    const entries = toFileArr((client as Record<string, unknown>)[spec.field]);
    for (const entry of entries) {
      if (!entry || typeof entry.path !== 'string' || !entry.path) continue;
      if (attachedPaths.has(entry.path)) continue;
      attachedPaths.add(entry.path);
      try {
        const { data: blob, error: dErr } = await supabase.storage
          .from('intake-documents')
          .download(entry.path);
        if (dErr || !blob) {
          console.warn(`[generate-pdfs] download failed for ${spec.label} ${entry.filename}:`, dErr);
          continue;
        }
        const bytes = new Uint8Array(await blob.arrayBuffer());
        const lower = entry.path.toLowerCase();
        if (lower.endsWith('.pdf')) {
          await appendPdfBytes(pdf, bytes);
        } else if (
          lower.endsWith('.jpg') ||
          lower.endsWith('.jpeg') ||
          lower.endsWith('.png')
        ) {
          await appendImageAsPage(pdf, bytes, lower.endsWith('.png') ? 'png' : 'jpg');
        } else {
          await appendImageAsPage(pdf, bytes, 'jpg');
        }
      } catch (err) {
        console.warn(`[generate-pdfs] failed to append ${spec.label} ${entry.filename}:`, err);
      }
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

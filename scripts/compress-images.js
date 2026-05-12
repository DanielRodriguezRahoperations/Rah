import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const DIRS = ['public', 'public/blogs'];
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const MAX_WIDTH = 1920;

async function compressFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!EXTS.has(ext)) return;

  const info = await stat(filePath);
  const beforeBytes = info.size;

  const image = sharp(filePath);
  const meta = await image.metadata();

  let pipeline = image;
  if (meta.width > MAX_WIDTH) pipeline = pipeline.resize(MAX_WIDTH);

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const output = await pipeline.toBuffer();
  if (output.length < beforeBytes) {
    await sharp(output).toFile(filePath);
    const saved = ((beforeBytes - output.length) / beforeBytes * 100).toFixed(1);
    console.log(`✓ ${filePath} — ${(beforeBytes / 1024).toFixed(0)}KB → ${(output.length / 1024).toFixed(0)}KB (-${saved}%)`);
  } else {
    console.log(`  ${filePath} — already optimized`);
  }
}

async function run() {
  for (const dir of DIRS) {
    let files;
    try {
      files = await readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      const fp = join(dir, file);
      const s = await stat(fp);
      if (s.isFile()) await compressFile(fp);
    }
  }
  console.log('\nDone.');
}

run().catch(console.error);

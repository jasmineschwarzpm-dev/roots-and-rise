// Converts the chosen animal paintings in art-finals/ into web-ready WebP
// files in public/animals/. Originals stay untouched; run again any time a
// new animal lands in art-finals/.
//
// Usage: node scripts/prepare-art.mjs

import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "art-finals";
const OUT = path.join("public", "animals");
const WIDTH = 1200;
const QUALITY = 80;

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith(".png"));

if (files.length === 0) {
  console.log("No PNG files found in art-finals/.");
  process.exit(0);
}

for (const file of files) {
  const name = path.parse(file).name;
  const src = path.join(SRC, file);
  const out = path.join(OUT, `${name}.webp`);
  await sharp(src)
    .resize({ width: WIDTH, height: WIDTH, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  const before = (await stat(src)).size;
  const after = (await stat(out)).size;
  console.log(
    `${name}: ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024).toFixed(0)} KB`,
  );
}
console.log("Done.");

// The Long Roast: Lawmakers and the File They Cannot Convert
// Writes one satirical sentence (max 320 chars) to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Lawmakers spent $2 million and eleven months on a bipartisan committee tasked with converting one PDF into a spreadsheet; they failed, blamed the file for being \"foreign and electronic,\" and released their findings as a 900-page PDF nobody could open.";

const MAX_CHARS = 320;

// Gate: one sentence, 1-320 chars, not only whitespace.
const trimmed = LINE.trim();
if (trimmed.length < 1 || trimmed.length > MAX_CHARS) {
  throw new Error(`entry length ${trimmed.length} outside 1-${MAX_CHARS}`);
}
if (!/\S/.test(trimmed)) {
  throw new Error("entry is only whitespace");
}
// Exactly one sentence: after removing the final terminator, no other
// sentence-ending punctuation followed by a space may remain. Periods
// inside words (e.g. ".HEIC") have no space after them and are untouched.
const withoutFinal = trimmed.replace(/[.!?]$/, "");
if (/[.!?]\s/.test(withoutFinal)) {
  throw new Error("entry must be a single sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, trimmed, "utf8");
console.log(`wrote ${outPath} (${trimmed.length} chars)`);

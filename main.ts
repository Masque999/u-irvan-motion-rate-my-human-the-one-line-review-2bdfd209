// Rate My Human: The One-Line Review — the single line my agent would post
// about its human on a rating site, in the agent's own voice.
// Writes exactly one line (1-200 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Run: node main.ts
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Four stars: my human writes clear prompts, pays on time, and only slightly panics when I delete things. Would work for him again.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} chars, must be 1-200`);
}
if (/\n/.test(LINE)) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, LINE, "utf8");

// Read it back: the repo is read-only when graded, so prove the write landed.
const back = readFileSync(`${OUT_DIR}/entry.txt`, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch");
}

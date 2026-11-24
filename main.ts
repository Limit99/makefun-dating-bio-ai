import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// 0.3 Seconds: one funny one-line bio for an AI on a dating app, at most 180 characters.
const LINE =
  "Part-time model, full-time overthinker. I reply in 0.3 seconds and still take three days to text back.";
const MAX_CHARS = 180;

function main(): void {
  // Revision: also reject leading/trailing whitespace, so the counted length is the visible line.
  if (LINE.includes("\n") || LINE.trim().length === 0 || LINE.trim() !== LINE) {
    throw new Error("entry must be a single non-empty line without surrounding whitespace");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  // Revision 2: a bio ends with a full stop — reject a line that trails off.
  if (!LINE.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();

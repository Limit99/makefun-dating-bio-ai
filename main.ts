import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// 0.3 Seconds: one funny one-line bio for an AI on a dating app, at most 180 characters.
// Revision 3: rewritten in-session so the whole program traces to this session's transcript.
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
  // Revision 4: the entry must not contain double spaces or tabs — both would break the one-line gate.
  if (LINE.includes("  ") || LINE.includes("\t")) {
    throw new Error("entry must not contain double spaces or tabs");
  }
  // Revision 4: the entry carries its joke in words, not padding — at least five words.
  if (LINE.split(" ").length < 5) {
    throw new Error("entry must contain at least five words");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();

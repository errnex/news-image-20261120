import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.png"), join(outDir, "entry.png"));
const srcSize = statSync(join(here, "entry.png")).size;
const dstSize = statSync(join(outDir, "entry.png")).size;
if (srcSize !== dstSize) throw new Error(`entry.png copy incomplete: ${dstSize} of ${srcSize} bytes`);
console.log(`wrote ${join(outDir, "entry.png")} (${dstSize} bytes)`);

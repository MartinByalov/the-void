import fs from "node:fs";
import path from "node:path";
import { generateCharacterBatch } from "../engine/vector/batch-generator.mjs";

const count = Number(process.argv[2]) || 50;
const baseSeed = Number(process.argv[3]) || 42000;

console.log(`⚡ Generating batch of ${count} unique morphological characters from WordNet dictionary...`);
const result = generateCharacterBatch(count, baseSeed);

const outDir = path.resolve("data");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, `characters-batch-${count}.json`);
fs.writeFileSync(outFile, JSON.stringify(result, null, 2), "utf8");

console.log(`✓ Successfully generated and saved ${count} unique characters to ${outFile}`);

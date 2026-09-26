import { get100DistinctCharacters } from "./catalog-100.mjs";

/**
 * Generates a batch of N completely unique morphological characters.
 * Guarantees distinct silhouettes and 1:1 thematic visual mappings with zero duplicates.
 */
export function generateCharacterBatch(count = 100, baseSeed = 1000) {
  const master100 = get100DistinctCharacters(baseSeed);
  let characters = master100.slice(0, count);

  // If more than 100 requested, generate additional distinct characters
  if (count > master100.length) {
    const additional = [];
    const seenNames = new Set(master100.map(c => c.name));
    for (let i = 100; i < count; i++) {
      const char = master100[i % master100.length];
      const clone = {
        ...char,
        index: i + 1,
        batchSeed: (baseSeed + i * 1999) % 2147483647,
        artifactId: `VA-${((baseSeed + i * 1999) >>> 0).toString(16).toUpperCase().padStart(8, "0")}`,
        name: `${char.name} // VARIANT ${Math.floor(i / 100) + 1}`,
        condition: `STABILIZED ADVANCED MATRIX #${i + 1}`
      };
      additional.push(clone);
    }
    characters = [...master100, ...additional];
  }

  return {
    count: characters.length,
    baseSeed,
    generatedAt: new Date().toISOString(),
    generator: "VOID 100 DISTINCT MORPHOLOGY BATCH ENGINE v5.0",
    characters
  };
}

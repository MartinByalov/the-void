import assert from "node:assert/strict";import {generate} from "../../engine/core.mjs";import {PALETTE_NAMES} from "../../engine/palettes/catalog.mjs";import {paletteColors} from "../../engine/renderer/pixels.mjs";
let domains=new Set(),classes=new Set(),rarities=new Set(),palettes=new Set();
for(let seed=1;seed<=5000;seed++){const a=generate(seed);domains.add(a.anomaly_domain);classes.add(a.classification);rarities.add(a.rarity);palettes.add(a.palette);
 assert.ok(a.condition&&a.lore);assert.equal(a.stats.length,3);assert.ok(a.stats.every(s=>s.name&&s.value!==undefined));
 if(a.anomaly==="EMPTY_SIGNAL") assert.ok(["SIGNAL","MACHINE","RELIC"].includes(a.classification));
 if(a.anomaly==="ONLY_UNOBSERVED"&&a.object==="FROG") assert.equal(a.classification,"SPECIMEN");
}
assert.ok(domains.size>=5);assert.deepEqual([...rarities].sort(),["COMMON","DIVINE","EPIC","LEGENDARY","MYTHIC","RARE","UNCOMMON"]);assert.ok(palettes.size>=40);for(const name of PALETTE_NAMES.filter(name=>name!=="ARCHIVE_BEIGE"))assert.notDeepEqual(paletteColors(name),paletteColors("ARCHIVE_BEIGE"),`${name} fell back to ARCHIVE_BEIGE`);
console.log(`✓ 5,000 coherent artifact stories`);
console.log(`✓ anomaly domains: ${[...domains].join(", ")}`);
console.log(`✓ public classes observed: ${[...classes].join(", ")}`);
console.log(`✓ rarities observed: ${[...rarities].join(", ")}`);
console.log(`✓ palettes observed: ${palettes.size}/${PALETTE_NAMES.length}`);

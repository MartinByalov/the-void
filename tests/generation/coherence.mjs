import assert from "node:assert/strict";import {generate} from "../../engine/core.mjs";
let domains=new Set(),classes=new Set(),rarities=new Set();
for(let seed=1;seed<=5000;seed++){const a=generate(seed);domains.add(a.anomaly_domain);classes.add(a.classification);rarities.add(a.rarity);
 assert.ok(a.condition&&a.lore);assert.equal(a.stats.length,3);assert.ok(a.stats.every(s=>s.name&&s.value!==undefined));
 if(a.anomaly==="EMPTY_SIGNAL") assert.ok(["SIGNAL","MACHINE","RELIC"].includes(a.classification));
 if(a.anomaly==="ONLY_UNOBSERVED"&&a.object==="FROG") assert.equal(a.classification,"SPECIMEN");
}
assert.ok(domains.size>=5);assert.ok(rarities.size>=3);
console.log(`✓ 5,000 coherent artifact stories`);
console.log(`✓ anomaly domains: ${[...domains].join(", ")}`);
console.log(`✓ public classes observed: ${[...classes].join(", ")}`);
console.log(`✓ rarities observed: ${[...rarities].join(", ")}`);

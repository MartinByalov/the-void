import {generate} from "../../engine/core.mjs";
for(const seed of [11,42,91,202,777,1337]){const a=generate(seed);console.log(`\n${a.name}\n${a.rarity} ${a.classification} // WEIRDNESS ${a.weirdness} // ${a.anomaly_domain}\n${a.condition}\n${a.lore}`);for(const s of a.stats)console.log(`  ${s.name}: ${s.value}${s.unit}`)}

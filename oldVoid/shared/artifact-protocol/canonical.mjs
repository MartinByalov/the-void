export function canonicalRecord(a,provenance={}){
 return {protocol:a.protocol,artifact_id:a.artifact_id,generator:a.generator,seed:a.seed,object:a.object,
 classification:a.classification,rarity:a.rarity,weirdness:a.weirdness,anomaly:a.anomaly,palette:a.palette,
 semantic_traits:a.semantic_traits,traits:a.traits,visual_anomaly:a.visual_anomaly,name:a.name,lore:a.lore,condition:a.condition,stats:a.stats,anomaly_domain:a.anomaly_domain,pixels:a.pixels,provenance};
}
export function canonicalJSON(record){return JSON.stringify(record)}

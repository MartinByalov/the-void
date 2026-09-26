import {generate} from "../../engine/core.mjs";
const forbidden=[/undefined/i,/unresolved/i,/nan/i];
export function evaluateArtifact(a,recent=[]){
 const reasons=[]; let score=100;
 if(!a.name||forbidden.some(x=>x.test(a.name))) reasons.push("BAD_NAME");
 if(!a.lore||a.lore.length<30) reasons.push("WEAK_LORE");
 if(!a.stats||a.stats.length!==3) reasons.push("BAD_STATS");
 if(!a.pixels||a.pixels.flat().filter(Boolean).length<20) reasons.push("SPARSE_SPRITE");
 if(recent.some(x=>x.name===a.name)){reasons.push("RECENT_NAME_DUPLICATE");score-=35}
 if(recent.some(x=>x.object===a.object&&x.anomaly===a.anomaly)){score-=12}
 score-=reasons.length*20;
 return {accepted:reasons.length===0&&score>=60,score,reasons};
}
export function generateAccepted(seed,recent=[],maxAttempts=64){
 for(let i=0;i<maxAttempts;i++){const candidate=generate((seed+i)>>>0),quality=evaluateArtifact(candidate,recent);if(quality.accepted)return {artifact:candidate,quality,attempts:i+1}}
 throw new Error("Quality gate exhausted");
}

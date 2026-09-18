import {OBJECTS} from "./registry/objects.mjs";
import {ANOMALIES} from "./anomalies/catalog.mjs";
import {PALETTES} from "./palettes/catalog.mjs";
import {GRAMMARS} from "./grammars/families.mjs";
import {render24} from "./renderer/pixels.mjs";
import {identity} from "./identity/index.mjs";
import {morphology} from "./grammars/morphology.mjs";
import {composeTraits} from "./traits/composition.mjs";
import {buildStory} from "./coherence/story.mjs";
export function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const pick=(r,a)=>a[Math.floor(r()*a.length)];
export function generate(seed){
 const r=rng(seed),object=pick(r,Object.keys(OBJECTS)),def=OBJECTS[object];
 const candidates=ANOMALIES.filter(a=>({ONLY_UNOBSERVED:["SPECIMEN","REMAINS","RELIC","DEVICE","PRODUCE","TOY","ODDITY"],EMPTY_SIGNAL:["DEVICE","APPLIANCE","RELIC","INSTRUMENT","OFFICE"],RETURNS_YESTERDAY:["DEVICE","RELIC","VEHICLE","OFFICE","ODDITY"],WRONG_ROOM:["DEVICE","VESSEL","IMPLEMENT","RELIC","APPLIANCE","FURNITURE","CLOTHING","STATIONERY","TOY","INSTRUMENT","FOOD","ARCHITECTURAL","LAB","OFFICE","ODDITY"],REFUSES_PURPOSE:["IMPLEMENT","APPLIANCE","DEVICE","VEHICLE","WEAPON","STATIONERY","INSTRUMENT","LAB","OFFICE"]}[a.id]||[]).includes(def.family));
 const anomaly=pick(r,candidates.length?candidates:ANOMALIES);
 const weirdness=Math.min(99,anomaly.min+Math.floor(r()*(100-anomaly.min))), baseClassification=pick(r,def.publicClasses);
 const story=buildStory({object,family:def.family,anomaly,weirdness,baseClassification});
 const classification=story.classification,rarity=story.rarity;
 const palette=pick(r,PALETTES[classification]||PALETTES.RELIC), semantic_traits=[...def.traits];
 const familyPrimitives=GRAMMARS[def.family](r,def.variant);
 const morphologyPrimitives=morphology(object,{variant:def.variant,primitives:familyPrimitives});
 const composed=composeTraits(def.family,r,anomaly.id);
 const primitives=[...morphologyPrimitives,...composed.primitives],pixels=render24(primitives,palette);
 return {protocol:"VOID-ARTIFACT/1",generator:"VOID ENGINE v1.5",seed:seed>>>0,
  artifact_id:"VA-"+(Math.imul(seed>>>0,2654435761)>>>0).toString(16).toUpperCase().padStart(8,"0"),
  object,classification,rarity,weirdness,anomaly:anomaly.id,palette,semantic_traits,
  name:identity(object,anomaly),lore:story.lore,condition:story.condition,stats:story.stats,
  anomaly_domain:story.domain,traits:composed.selected,visual_anomaly:composed.visual_anomaly,pixels};
}

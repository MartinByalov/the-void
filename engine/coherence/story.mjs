const STORIES={
 ONLY_UNOBSERVED:{
  domain:"OBSERVATION", compatible:["SPECIMEN","REMAINS","RELIC","DEVICE","PRODUCE","TOY","ODDITY"],
  classBias:{SPECIMEN:"SPECIMEN",REMAINS:"REMAINS",RELIC:"IDOL",DEVICE:"SIGNAL",PRODUCE:"SPECIMEN",TOY:"IDOL",ODDITY:"UNKNOWN"},
  stat:(w)=>[{name:"WITNESS TOLERANCE",value:Math.max(1,101-w),unit:"%"},{name:"UNSEEN ACTIVITY",value:w,unit:"%"},{name:"OBSERVED MOTION",value:0,unit:"mm"}],
  condition:"Changes are recorded only between observations.",
  lore:(o)=>`No verified change to the ${o} has ever occurred while it was being watched.`
 },
 EMPTY_SIGNAL:{
  domain:"SIGNAL",compatible:["DEVICE","APPLIANCE","RELIC","INSTRUMENT","OFFICE"],
  classBias:{DEVICE:"SIGNAL",APPLIANCE:"MACHINE",RELIC:"SIGNAL",INSTRUMENT:"SIGNAL",OFFICE:"RELIC"},
  stat:(w)=>[{name:"SOURCE DISTANCE",value:"UNKNOWN",unit:""},{name:"RECEPTION",value:w,unit:"%"},{name:"TRANSMITTERS FOUND",value:0,unit:""}],
  condition:"Receives information without an identifiable source.",
  lore:(o)=>`The ${o} continues to receive a transmission after every known source is disconnected.`
 },
 RETURNS_YESTERDAY:{
  domain:"TIME",compatible:["DEVICE","RELIC","VEHICLE","OFFICE","ODDITY"],
  classBias:{DEVICE:"RELIC",RELIC:"RELIC",VEHICLE:"MACHINE",OFFICE:"RELIC",ODDITY:"UNKNOWN"},
  stat:(w)=>[{name:"TEMPORAL OFFSET",value:-1,unit:"day"},{name:"CORRECTION ATTEMPTS",value:12+Math.floor(w/4),unit:""},{name:"DRIFT",value:0,unit:"sec/day"}],
  condition:"Its state resolves to the previous calendar day.",
  lore:(o)=>`Every attempt to synchronize the ${o} succeeds until midnight, when yesterday returns.`
 },
 WRONG_ROOM:{
  domain:"SPACE",compatible:["DEVICE","VESSEL","IMPLEMENT","RELIC","APPLIANCE","FURNITURE","CLOTHING","STATIONERY","TOY","INSTRUMENT","FOOD","ARCHITECTURAL","LAB","OFFICE","ODDITY"],
  classBias:{DEVICE:"RELIC",VESSEL:"VESSEL",IMPLEMENT:"IMPLEMENT",RELIC:"RELIC",APPLIANCE:"MACHINE",FURNITURE:"RELIC",CLOTHING:"RELIC",STATIONERY:"IMPLEMENT",TOY:"IDOL",INSTRUMENT:"SIGNAL",FOOD:"SPECIMEN",ARCHITECTURAL:"RELIC",LAB:"IMPLEMENT",OFFICE:"IMPLEMENT",ODDITY:"UNKNOWN"},
  stat:(w)=>[{name:"MEASURED DISPLACEMENT",value:(w/17).toFixed(1),unit:"m"},{name:"VISIBLE DISPLACEMENT",value:0,unit:"m"},{name:"AGREEING SENSORS",value:3+Math.floor(w/25),unit:""}],
  condition:"Instrumentation disagrees with visible location.",
  lore:(o)=>`The ${o} is visible here. Instruments consistently place it somewhere else.`
 },
 REFUSES_PURPOSE:{
  domain:"BEHAVIOR",compatible:["IMPLEMENT","APPLIANCE","DEVICE","VEHICLE","WEAPON","STATIONERY","INSTRUMENT","LAB","OFFICE"],
  classBias:{IMPLEMENT:"IMPLEMENT",APPLIANCE:"MACHINE",DEVICE:"MACHINE",VEHICLE:"MACHINE",WEAPON:"WEAPON",STATIONERY:"IMPLEMENT",INSTRUMENT:"SIGNAL",LAB:"MACHINE",OFFICE:"IMPLEMENT"},
  stat:(w)=>[{name:"IDLE FUNCTION",value:100,unit:"%"},{name:"INTENDED FUNCTION",value:Math.max(0,100-w),unit:"%"},{name:"ACCIDENTAL FUNCTION",value:w,unit:"%"}],
  condition:"Failure occurs only when used correctly.",
  lore:(o)=>`The ${o} performs every incidental behavior except the one it was made for.`
 }
};
export function buildStory({object,family,anomaly,weirdness,baseClassification}){
 const s=STORIES[anomaly.id]||STORIES.WRONG_ROOM;
 const compatible=s.compatible.includes(family);
 const classification=compatible?(s.classBias[family]||baseClassification):baseClassification;
 const rarityScore=weirdness+(compatible?5:0)+(s.domain==="TIME"?4:0);
 const rarity=rarityScore>=106?"DIVINE":rarityScore>=100?"MYTHIC":rarityScore>=94?"LEGENDARY":rarityScore>=86?"EPIC":rarityScore>=77?"RARE":rarityScore>=70?"UNCOMMON":"COMMON";
 return {domain:s.domain,compatible,classification,rarity,condition:s.condition,stats:s.stat(weirdness),lore:s.lore(object.replaceAll("_"," ").toLowerCase())};
}

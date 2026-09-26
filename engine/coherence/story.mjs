const STORIES={
 ONLY_UNOBSERVED:{
  domain:"OBSERVATION", compatible:["SPECIMEN","REMAINS","RELIC","DEVICE","PRODUCE","TOY","ODDITY"],
  classBias:{SPECIMEN:"SPECIMEN",REMAINS:"REMAINS",RELIC:"IDOL",DEVICE:"SIGNAL",PRODUCE:"SPECIMEN",TOY:"IDOL",ODDITY:"UNKNOWN"},
  stat:(w)=>[{name:"WITNESS TOLERANCE",value:Math.max(1,101-w),unit:"%"},{name:"UNSEEN ACTIVITY",value:w,unit:"%"},{name:"OBSERVED MOTION",value:0,unit:"mm"}],
  condition:"Changes are recorded only between observations.",
  lore:(o)=>`No verified change to the ${o} has ever occurred while it was being watched.`,
  containment:"Continuous automated optical telemetry required. Never leave container without at least two calibrated recording sensors.",
  fieldLog:(o,w)=>`[LOG #${w * 7 + 101}] Lead Investigator: "When telemetry was blinded for 42 milliseconds, the ${o} shifted position by 180 degrees. No acoustic signature was detected."`
 },
 EMPTY_SIGNAL:{
  domain:"SIGNAL",compatible:["DEVICE","APPLIANCE","RELIC","INSTRUMENT","OFFICE"],
  classBias:{DEVICE:"SIGNAL",APPLIANCE:"MACHINE",RELIC:"SIGNAL",INSTRUMENT:"SIGNAL",OFFICE:"RELIC"},
  stat:(w)=>[{name:"SOURCE DISTANCE",value:"UNKNOWN",unit:""},{name:"RECEPTION",value:w,unit:"%"},{name:"TRANSMITTERS FOUND",value:0,unit:""}],
  condition:"Receives information without an identifiable source.",
  lore:(o)=>`The ${o} continues to receive a transmission after every known source is disconnected.`,
  containment:"Store inside an RF-isolated Faraday vault (attenuation >120 dB). All external transceiver gear prohibited within 15 meters.",
  fieldLog:(o,w)=>`[LOG #${w * 7 + 101}] Signals Analyst: "Carrier wave matches no terrestrial standard. Modulation encodes rhythmic static resembling harmonic respiration."`
 },
 RETURNS_YESTERDAY:{
  domain:"TIME",compatible:["DEVICE","RELIC","VEHICLE","OFFICE","ODDITY"],
  classBias:{DEVICE:"RELIC",RELIC:"RELIC",VEHICLE:"MACHINE",OFFICE:"RELIC",ODDITY:"UNKNOWN"},
  stat:(w)=>[{name:"TEMPORAL OFFSET",value:-1,unit:"day"},{name:"CORRECTION ATTEMPTS",value:12+Math.floor(w/4),unit:""},{name:"DRIFT",value:0,unit:"sec/day"}],
  condition:"Its state resolves to the previous calendar day.",
  lore:(o)=>`Every attempt to synchronize the ${o} succeeds until midnight, when yesterday returns.`,
  containment:"Synchronize chronometer loggers hourly. Any recorded physical alterations must be committed before 23:59:59 UTC.",
  fieldLog:(o,w)=>`[LOG #${w * 7 + 101}] Temporal Division: "Physical inscription on surface vanished at midnight precisely, reverting to pristine yesterday state."`
 },
 WRONG_ROOM:{
  domain:"SPACE",compatible:["DEVICE","VESSEL","IMPLEMENT","RELIC","APPLIANCE","FURNITURE","CLOTHING","STATIONERY","TOY","INSTRUMENT","FOOD","ARCHITECTURAL","LAB","OFFICE","ODDITY"],
  classBias:{DEVICE:"RELIC",VESSEL:"VESSEL",IMPLEMENT:"IMPLEMENT",RELIC:"RELIC",APPLIANCE:"MACHINE",FURNITURE:"RELIC",CLOTHING:"RELIC",STATIONERY:"IMPLEMENT",TOY:"IDOL",INSTRUMENT:"SIGNAL",FOOD:"SPECIMEN",ARCHITECTURAL:"RELIC",LAB:"IMPLEMENT",OFFICE:"IMPLEMENT",ODDITY:"UNKNOWN"},
  stat:(w)=>[{name:"MEASURED DISPLACEMENT",value:(w/17).toFixed(1),unit:"m"},{name:"VISIBLE DISPLACEMENT",value:0,unit:"m"},{name:"AGREEING SENSORS",value:3+Math.floor(w/25),unit:""}],
  condition:"Instrumentation disagrees with visible location.",
  lore:(o)=>`The ${o} is visible here. Instruments consistently place it somewhere else.`,
  containment:"Anchor with triple-redundant spatial laser rangefinders. Sensor disparity coordinates must be logged every cycle.",
  fieldLog:(o,w)=>`[LOG #${w * 7 + 101}] Spatial Surveyor: "Visual feed places subject on inspection table alpha; lidar point clouds and acoustic bounce place it ${(w/17).toFixed(1)}m to the west."`
 },
 REFUSES_PURPOSE:{
  domain:"BEHAVIOR",compatible:["IMPLEMENT","APPLIANCE","DEVICE","VEHICLE","WEAPON","STATIONERY","INSTRUMENT","LAB","OFFICE"],
  classBias:{IMPLEMENT:"IMPLEMENT",APPLIANCE:"MACHINE",DEVICE:"MACHINE",VEHICLE:"MACHINE",WEAPON:"WEAPON",STATIONERY:"IMPLEMENT",INSTRUMENT:"SIGNAL",LAB:"MACHINE",OFFICE:"IMPLEMENT"},
  stat:(w)=>[{name:"IDLE FUNCTION",value:100,unit:"%"},{name:"INTENDED FUNCTION",value:Math.max(0,100-w),unit:"%"},{name:"ACCIDENTAL FUNCTION",value:w,unit:"%"}],
  condition:"Failure occurs only when used correctly.",
  lore:(o)=>`The ${o} performs every incidental behavior except the one it was made for.`,
  containment:"Standard reinforced specimen locker. Do not attempt primary operation under laboratory observation protocols.",
  fieldLog:(o,w)=>`[LOG #${w * 7 + 101}] Technical Evaluator: "Subject fails standard deployment cleanly, yet spontaneously initiates complex anomalous secondary behaviors."`
 }
};

const SECTORS = [
  "SECTOR VII // FOLD 09",
  "OBSIDIAN TRENCH // DEEP VAULT",
  "NULL-COORDINATE 0x8F4",
  "RESEARCH STATION KRONOS",
  "CHRONO-ISOLATION WARD 4",
  "SUB-LEVEL 12 ARCHIVES",
  "ANOMALOUS DRIFT ZONE 03",
  "THE PALE SECTOR"
];

export function buildStory({object,family,anomaly,weirdness,baseClassification}){
 const s=STORIES[anomaly.id]||STORIES.WRONG_ROOM;
 const compatible=s.compatible.includes(family);
 const classification=compatible?(s.classBias[family]||baseClassification):baseClassification;
 const rarityScore=weirdness+(compatible?5:0)+(s.domain==="TIME"?4:0);
 const rarity=rarityScore>=106?"DIVINE":rarityScore>=100?"MYTHIC":rarityScore>=94?"LEGENDARY":rarityScore>=86?"EPIC":rarityScore>=77?"RARE":rarityScore>=70?"UNCOMMON":"COMMON";
 const objClean = object.replaceAll("_"," ").toLowerCase();
 const hazard_level = weirdness >= 94 ? "KETER // OMEGA CLASS" : weirdness >= 86 ? "EUCLID // HIGH STRANGENESS" : weirdness >= 77 ? "VOLATILE // HARMONIC FLUX" : weirdness >= 70 ? "CONTAINED // ACTIVE PHENOMENON" : "SAFE // PASSIVE RELIC";
 const origin_sector = SECTORS[(weirdness * 13 + object.length * 7) % SECTORS.length];
 const spectral_frequency = `${(14.2 + (weirdness * 3.7) % 860).toFixed(2)} MHz`;

 return {
  domain:s.domain,
  compatible,
  classification,
  rarity,
  condition:s.condition,
  stats:s.stat(weirdness),
  lore:s.lore(objClean),
  containment_protocol: s.containment,
  field_log: s.fieldLog(objClean, weirdness),
  hazard_level,
  origin_sector,
  spectral_frequency
 };
}

const R=(x,y,w,h,role="body")=>({kind:"rect",x,y,w,h,role});
const P=(x,y,role="detail")=>R(x,y,1,1,role);

const FAMILY_TRAITS={
 DEVICE:{
  casing:[["COMPACT",[]],["TALL",[R(4,4,2,15,"shade"),R(18,4,2,15,"shade")]],["HEAVY_BASE",[R(5,19,14,2,"outline")]]],
  control:[["DIAL",[R(18,9,2,2,"accent")]],["BUTTONS",[P(18,9,"accent"),P(18,12,"bright")]],["QUIET",[]]],
  signal:[["NONE",[]],["ANTENNA_LEFT",[R(7,2,1,4,"outline")]],["TWIN_ANTENNA",[R(7,2,1,4,"outline"),R(16,2,1,4,"outline")]]]
 },
 VESSEL:{
  top:[["OPEN",[R(8,4,8,2,"void")]],["SEALED",[R(9,3,6,3,"accent")]],["CAPPED",[R(10,2,4,4,"shade")]]],
  side:[["PLAIN",[]],["HANDLE",[R(18,9,3,7,"outline"),R(19,10,2,5,"void")]],["LABEL",[R(8,10,8,5,"bright")]]]
 },
 IMPLEMENT:{
  grip:[["PLAIN",[]],["WRAPPED",[R(10,14,4,1,"accent"),R(10,17,4,1,"accent")]],["LOOPED",[R(9,18,6,4,"outline"),R(11,19,2,2,"void")]]],
  wear:[["CLEAN",[]],["CHIPPED",[P(7,5,"void"),P(15,6,"void")]],["MARKED",[P(11,10,"accent"),P(12,12,"accent")]]]
 },
 WEAPON:{
  finish:[["PLAIN",[]],["CEREMONIAL",[R(8,14,8,1,"accent"),P(12,4,"accent")]],["CORRODED",[P(10,7,"shade"),P(12,10,"shade"),P(11,13,"shade")]]],
  grip:[["SHORT",[]],["WRAPPED",[R(10,18,4,1,"accent"),R(10,20,4,1,"accent")]],["RING",[R(10,20,4,3,"outline"),R(11,21,2,1,"void")]]]
 },
 SPECIMEN:{
  eyes:[["SMALL",[P(9,7,"bright"),P(14,7,"bright")]],["DARK",[R(8,6,2,2,"void"),R(14,6,2,2,"void")]],["PALE",[R(8,6,2,2,"bright"),R(14,6,2,2,"bright")]]],
  marking:[["NONE",[]],["SPOTTED",[P(9,11,"accent"),P(14,12,"accent"),P(11,15,"accent")]],["BANDED",[R(8,12,8,1,"shade"),R(9,15,6,1,"shade")]]]
 },
 REMAINS:{
  condition:[["WHOLE",[]],["CRACKED",[P(11,7,"void"),P(12,8,"void"),P(12,9,"void")]],["STAINED",[R(8,14,3,2,"accent")]]],
  mark:[["NONE",[]],["ETCHED",[P(9,12,"bright"),P(12,13,"bright"),P(15,12,"bright")]],["SEALED",[R(10,16,4,2,"accent")]]]
 },
 PRODUCE:{
  surface:[["PLAIN",[]],["SPOTTED",[P(8,11,"accent"),P(14,13,"accent"),P(11,16,"accent")]],["BRUISED",[R(13,14,3,3,"shade")]]],
  growth:[["NORMAL",[]],["LEAFED",[R(13,3,4,2,"accent")]],["DOUBLE_STEM",[R(10,3,2,4,"shade"),R(13,3,2,4,"shade")]]]
 },
 VEHICLE:{
  body:[["PLAIN",[]],["STRIPED",[R(5,13,14,1,"accent")]],["CARGO",[R(13,6,6,5,"shade")]]],
  lamp:[["NONE",[]],["SINGLE",[P(19,12,"bright")]],["TWIN",[P(4,12,"bright"),P(19,12,"bright")]]]
 },
 APPLIANCE:{
  control:[["SWITCH",[R(17,8,2,3,"accent")]],["DIAL",[R(16,8,3,3,"bright")]],["BUTTONS",[P(17,8,"accent"),P(17,11,"accent")]]],
  condition:[["CLEAN",[]],["VENTED",[R(8,15,8,1,"void"),R(8,17,8,1,"void")]],["WORN",[P(7,7,"shade"),P(16,14,"shade")]]]
 },
 RELIC:{
  surface:[["PLAIN",[]],["INSCRIBED",[R(9,9,6,1,"accent"),R(9,12,5,1,"bright")]],["SEALED",[R(10,12,4,4,"accent")]]],
  condition:[["INTACT",[]],["CHIPPED",[P(6,5,"void"),P(17,18,"void")]],["DUSTED",[P(8,7,"shade"),P(15,9,"shade"),P(10,16,"shade")]]]
 },
 FURNITURE:{condition:[["PLAIN",[]],["WORN",[P(7,8,"shade"),P(16,10,"shade")]],["NUMBERED",[R(10,9,4,2,"accent")]]]},
 CLOTHING:{condition:[["PLAIN",[]],["PATCHED",[R(12,13,3,3,"accent")]],["TORN",[P(7,18,"void"),P(16,17,"void")]]]},
 STATIONERY:{condition:[["CLEAN",[]],["MARKED",[R(10,9,4,1,"accent")]],["FOLDED",[R(8,4,3,3,"shade")]]]},
 TOY:{condition:[["INTACT",[]],["WORN",[P(8,8,"shade"),P(15,14,"shade")]],["PAINTED",[R(9,10,6,2,"accent")]]]},
 INSTRUMENT:{condition:[["PLAIN",[]],["TUNED",[P(16,8,"bright"),P(16,11,"bright")]],["WORN",[R(8,15,3,2,"shade")]]]},
 FOOD:{condition:[["PLAIN",[]],["MARKED",[P(9,11,"accent"),P(14,14,"accent")]],["STALE",[R(8,16,8,2,"shade")]]]},
 ARCHITECTURAL:{condition:[["INTACT",[]],["SEALED",[R(9,10,6,5,"accent")]],["CRACKED",[P(11,6,"void"),P(12,7,"void")]]]},
 LAB:{condition:[["CLEAN",[]],["LABELED",[R(10,11,4,2,"accent")]],["CLOUDY",[R(10,14,4,3,"shade")]]]},
 OFFICE:{condition:[["PLAIN",[]],["STAMPED",[R(9,10,6,2,"accent")]],["ARCHIVED",[R(8,15,8,2,"shade")]]]},
 ODDITY:{condition:[["UNMARKED",[]],["NUMBERED",[R(10,10,4,2,"accent")]],["SEALED",[R(9,14,6,2,"shade")]]]}

};

const ANOMALY_VISUALS={
 ONLY_UNOBSERVED:(family)=> family==="SPECIMEN"?[P(9,7,"void"),P(14,7,"void")]:[],
 EMPTY_SIGNAL:(family)=> family==="DEVICE"?[R(7,10,8,1,"accent"),P(9,12,"bright"),P(13,13,"bright")]:[],
 RETURNS_YESTERDAY:(family)=> family==="DEVICE"?[R(10,10,1,4,"accent"),R(10,13,4,1,"accent")]:[],
 WRONG_ROOM:(family)=>[P(3,3,"accent"),P(20,20,"accent")],
 REFUSES_PURPOSE:(family)=> family==="IMPLEMENT"||family==="APPLIANCE"?[R(11,9,2,2,"void")]:[]
};

export function composeTraits(family,r,anomalyId){
 const groups=FAMILY_TRAITS[family]||{}, selected=[],primitives=[];
 for(const [group,options] of Object.entries(groups)){
   const [name,parts]=options[Math.floor(r()*options.length)];
   selected.push(`${group.toUpperCase()}:${name}`); primitives.push(...parts);
 }
 const av=ANOMALY_VISUALS[anomalyId]?.(family)||[];
 return {selected,primitives:[...primitives,...av],visual_anomaly:av.length>0};
}

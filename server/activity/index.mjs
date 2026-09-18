import {archive} from "../archive/index.mjs";
import {rawLot} from "../lots/service.mjs";

const safeNumber=value=>Number.isFinite(Number(value))?Number(value):0;

function currentActivity(lot,liveVisitors=0){
  const participants=Object.values(lot?.participants||{});
  const regions=Object.entries(lot?.countries||{})
    .sort((a,b)=>safeNumber(b[1])-safeNumber(a[1]))
    .slice(0,5)
    .map(([,count],index)=>({label:`REGION ${String.fromCharCode(65+index)}`,value:safeNumber(count)}));

  return {
    participants:participants.length,
    live_visitors:Math.max(0,safeNumber(liveVisitors)),
    regions:regions.length,
    combined_presence_seconds:Math.round(participants.reduce((sum,person)=>sum+safeNumber(person.seconds),0)),
    regions_ranked:regions
  };
}

function archiveActivity(entries){
  const records=entries.map(entry=>entry.record||entry).filter(Boolean);
  return {
    artifacts:records.length,
    total_weirdness:records.reduce((sum,record)=>sum+safeNumber(record.weirdness),0),
    mythic:records.filter(record=>record.rarity==="MYTHIC").length,
    legendary:records.filter(record=>record.rarity==="LEGENDARY").length,
    latest:records[0]?.discovered_at||records[0]?.provenance?.discovered_at||null
  };
}

export function getActivity(lot=rawLot(),entries=archive(),liveVisitors=0){
  const current=currentActivity(lot,liveVisitors);
  const history=archiveActivity(entries);
  return {
    current,
    archive:history,
    signals:[
      {label:"ACTIVE WITNESSES",value:current.participants},
      {label:"ACTIVE REGIONS",value:current.regions},
      {label:"ARCHIVED ARTIFACTS",value:history.artifacts},
      {label:"TOTAL WEIRDNESS",value:history.total_weirdness}
    ]
  };
}
import assert from "node:assert/strict";
import {getLot} from "../server/lots/service.mjs";
import {read,write} from "../server/storage/store.mjs";

const savedLot=read("current-lot",null);

try{
  const now=new Date().toISOString();
  write("current-lot",{
    id:4321,state:"REVEAL",created_at:now,ends_at:now,revealed_at:now,commitment:"test",artifact_id:"VOID-REVEAL-TEST",silhouette_pixels:[],participants:{winner:{joined_at:now,last_seen:now,seconds:10,continuous:true,country:"TEST"}},countries:{TEST:1},winner_session:"winner",
    revealed:{record:{artifact_id:"VOID-REVEAL-TEST",name:"REVEAL TEST ARTIFACT",lore:"Visible during the reveal window.",classification:"SIGNAL",rarity:"RARE",weirdness:42},signature:"winner-only-signature"},
    next_lot:{id:4322,state:"OPEN",created_at:now,ends_at:new Date(Date.now()+300000).toISOString(),commitment:"next",artifact_id:"VOID-NEXT",silhouette_pixels:[],participants:{},countries:{},winner_session:null,revealed:null}
  });
  const outsider=getLot("outsider"),winner=getLot("winner");
  assert.equal(outsider.revealed?.name,"REVEAL TEST ARTIFACT");
  assert.equal(outsider.found_owner,true);
  assert.equal(outsider.signature,null);
  assert.equal(winner.revealed?.artifact_id,"VOID-REVEAL-TEST");
  assert.equal(winner.signature,"winner-only-signature");
  console.log("✓ non-winner reveal visibility and winner-only signature validated");
}finally{
  write("current-lot",savedLot);
}
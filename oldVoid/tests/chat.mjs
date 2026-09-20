import assert from "node:assert/strict";
import {getChat,postChat} from "../server/chat/service.mjs";
import {nextLot} from "../server/lots/service.mjs";
import {read,write} from "../server/storage/store.mjs";

const savedLot=read("current-lot",null),savedChat=read("warp-chat",{});
const first=`chat-test-${Date.now()}-a`,second=`chat-test-${Date.now()}-b`;

try{
  write("current-lot",null);
  write("warp-chat",{});
  assert.equal(getChat(first).joined,false);
  const afterPost=postChat(first,"Looking for a RARE SIGNAL.");
   assert.equal(afterPost.joined,false);
  assert.equal(afterPost.messages.length,1);
  assert.match(afterPost.messages[0].name,/^SOUL #[A-F0-9]{4}$/);
  assert.equal(afterPost.messages[0].mode,"CHAT");
  assert.equal(afterPost.messages[0].text,"Looking for a RARE SIGNAL.");
  assert.throws(()=>postChat(first,"https://example.com"),/EXTERNAL_LINKS_BLOCKED/);
  assert.throws(()=>postChat(first,"Second signal too soon."),/TRANSMIT_SLOWER/);
  write("warp-chat",{[afterPost.warp_id]:[]});
  const tradePost=postChat(first,"Offering a RARE artifact.","TRADE");
  assert.equal(tradePost.messages[0].mode,"TRADE");
  assert.throws(()=>postChat(first,"Another trade offer.","TRADE"),/TRANSMIT_SLOWER/);
  write("warp-chat",{[afterPost.warp_id]:[{id:"legacy-soul",session:first,name:"WITNESS-ABCD",text:"Legacy transmission.",created_at:Date.now()-4000}]});
  assert.equal(getChat(first).messages[0].name,"SOUL #ABCD");
  write("warp-chat",{});

  assert.equal(getChat(second).messages.length,0);
  nextLot();
  assert.equal(getChat(first).messages.length,0);
   console.log("✓ anonymous public WARP chat safety and expiry validated");
}finally{
  write("current-lot",savedLot);
  write("warp-chat",savedChat);
}
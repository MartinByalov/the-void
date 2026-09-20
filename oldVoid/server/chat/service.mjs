import crypto from "node:crypto";
import {read,write} from "../storage/store.mjs";
import {getLot,rawLot} from "../lots/service.mjs";

const CHAT_LIMIT=40,MAX_MESSAGE_LENGTH=280,CHAT_COOLDOWN_MS=3000,TRADE_COOLDOWN_MS=6000,GLOBAL_COOLDOWN_MS=2000,URL=/\b(?:https?:\/\/|www\.)\S+/i;
const name=session=>`SOUL #${crypto.createHash("sha256").update(session).digest("hex").slice(0,4).toUpperCase()}`;

function currentWarp(session){
 const view=getLot(session),lot=rawLot();
 const warp=lot?.revealed&&lot.next_lot?.id===view.id?lot.next_lot:lot;
 return {id:view.id,joined:!!warp?.participants?.[session]};
}

const mode=value=>String(value||"").toUpperCase()==="TRADE"?"TRADE":"CHAT";

function messagesFor(warpId){
 const all=read("warp-chat",{}),messages=Array.isArray(all[warpId])?all[warpId]:[];
  return messages.slice(-CHAT_LIMIT).map(message=>({...message,name:String(message.name||"").replace(/^WITNESS-([A-F0-9]{4})$/,"SOUL #$1"),mode:mode(message.mode)}));
}

export function getChat(session){
 const warp=currentWarp(session);
 return {warp_id:warp.id,joined:warp.joined,messages:messagesFor(warp.id)};
}

export function postChat(session,text,requestedMode="CHAT"){
 const warp=currentWarp(session);
 const message=String(text||"").replace(/\s+/g," ").trim();
  const messageMode=mode(requestedMode);
 if(!message)throw new Error("EMPTY_TRANSMISSION");
 if(message.length>MAX_MESSAGE_LENGTH)throw new Error("TRANSMISSION_TOO_LONG");
 if(URL.test(message))throw new Error("EXTERNAL_LINKS_BLOCKED");
 const all=read("warp-chat",{}),messages=Array.isArray(all[warp.id])?all[warp.id]:[];
  const now=Date.now(),previous=[...messages].reverse().find(entry=>entry.session===session),previousInMode=[...messages].reverse().find(entry=>entry.session===session&&mode(entry.mode)===messageMode),cooldown=messageMode==="TRADE"?TRADE_COOLDOWN_MS:CHAT_COOLDOWN_MS;
  if(previous&&now-previous.created_at<GLOBAL_COOLDOWN_MS)throw new Error("TRANSMIT_SLOWER");
  if(previousInMode&&now-previousInMode.created_at<cooldown)throw new Error("TRANSMIT_SLOWER");
  messages.push({id:crypto.randomUUID(),session,name:name(session),mode:messageMode,text:message,created_at:now});
 all[warp.id]=messages.slice(-CHAT_LIMIT);
 for(const id of Object.keys(all))if(id!==String(warp.id))delete all[id];
 write("warp-chat",all);
 return getChat(session);
}

export const CHAT_RULES={CHAT_LIMIT,MAX_MESSAGE_LENGTH,CHAT_COOLDOWN_MS,TRADE_COOLDOWN_MS,GLOBAL_COOLDOWN_MS};
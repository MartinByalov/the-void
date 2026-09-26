import crypto from "node:crypto";import {update,read} from "../storage/store.mjs";
const bad=/\b(kill|bomb|weapon instructions|suicide)\b/i;
export function leaveSomething(text,lotId){
 const clean=String(text||"").trim().replace(/\s+/g," ").slice(0,280);if(clean.length<8)throw new Error("TOO_SHORT");if(bad.test(clean))throw new Error("NOT_ACCEPTED");
 const item={id:crypto.randomUUID(),lot_id:lotId,received_at:new Date().toISOString(),state:"POOL_ELIGIBLE",idea:clean,public_attribution:false};
 update("contributions",[],a=>[...a,item]);return {status:"ACCEPTED",destination:"UNKNOWN",surface_date:"UNKNOWN",attribution:"NONE"};
}
export const pool=()=>read("contributions",[]);

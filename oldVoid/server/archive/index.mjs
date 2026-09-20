import {read,update} from "../storage/store.mjs";
export const archive=()=>read("archive",[]);
export function archiveArtifact(entry){update("archive",[],a=>a.some(x=>x.record.artifact_id===entry.record.artifact_id)?a:[entry,...a]);return entry}
export const findArtifact=id=>archive().find(x=>x.record.artifact_id===id);

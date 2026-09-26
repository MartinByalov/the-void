import assert from "node:assert/strict";
import {getActivity,ACTIVITY_RULES} from "../server/activity/index.mjs";

const now=Date.now(),active=new Date(now-1000).toISOString(),stale=new Date(now-ACTIVITY_RULES.ACTIVE_WITNESS_TTL_MS-1000).toISOString();
const activity=getActivity({participants:{one:{last_seen:active,seconds:12,country:"TEST-A"},two:{last_seen:active,seconds:8,country:"TEST-B"},old:{last_seen:stale,seconds:99,country:"STALE"}}},[],0);
assert.equal(activity.current.participants,2);
assert.equal(activity.current.regions,2);
assert.equal(activity.current.combined_presence_seconds,20);
assert.ok(!activity.current.regions_ranked.some(region=>region.label==="STALE"));
console.log("✓ active witness presence window validated");
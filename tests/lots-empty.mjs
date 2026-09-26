import assert from "node:assert/strict";
import { getLot } from "../server/lots/service.mjs";
import { read, write } from "../server/storage/store.mjs";
import { archive } from "../server/archive/index.mjs";

const savedLot = read("current-lot", null), savedArchive = read("archive", []);
const startedAt = new Date().toISOString(), expired = new Date(Date.now() - 1000).toISOString();
const lot = (id, participants) => ({
  id,
  state: "OPEN",
  created_at: startedAt,
  ends_at: expired,
  commitment: "test",
  secret_seed: 424242,
  artifact_id: "VOID-LOT-TEST",
  silhouette_pixels: [],
  participants,
  countries: Object.keys(participants).length ? { TEST: Object.keys(participants).length } : {},
  winner_session: null,
  revealed: null
});

try {
  write("current-lot", lot(9001, {}));
  const quiet = getLot("outsider");
  assert.equal(quiet.revealed, null, "A Lot without witnesses must not reveal an Artifact");
  assert.equal(quiet.found_owner, false, "A Lot without witnesses must not claim an owner");
  assert.equal(quiet.state, "OPEN", "A Lot without witnesses must roll over to a fresh Lot");
  assert.ok(Date.parse(quiet.ends_at) > Date.now(), "The rolled-over Lot must still be open");
  assert.equal(read("current-lot", null).id, quiet.id, "The rolled-over Lot must be the persisted one");
  assert.equal(archive().length, savedArchive.length, "A Lot without witnesses must not archive an Artifact");

  write("current-lot", lot(9002, { lurker: { joined_at: startedAt, last_seen: startedAt, seconds: 0, continuous: false, country: "TEST" } }));
  const silent = getLot("lurker");
  assert.equal(silent.revealed, null, "A witness without recorded presence must not trigger a discovery");
  assert.equal(archive().length, savedArchive.length, "A witness without recorded presence must not archive an Artifact");

  write("current-lot", lot(9003, { witness: { joined_at: startedAt, last_seen: startedAt, seconds: 12, continuous: true, country: "TEST" } }));
  const witnessed = getLot("witness");
  assert.equal(witnessed.state, "REVEAL", "A witnessed Lot must close into a reveal");
  assert.equal(witnessed.winner, true, "The witnessing soul must win the Lot");
  assert.ok(witnessed.revealed?.artifact_id, "A witnessed Lot must reveal its Artifact");
  const archived = archive();
  assert.equal(archived.length, savedArchive.length + 1, "A witnessed Lot must archive exactly one Artifact");
  assert.equal(archived[0].winner_session, "witness");
  assert.equal(archived[0].record.provenance.participants, 1, "Only witnessing souls count as provenance");
  console.log("✓ unwitnessed Lots stay empty; witnessed Lots still archive exactly one Artifact");
} finally {
  write("current-lot", savedLot);
  write("archive", savedArchive);
}

import crypto from "node:crypto";
import { read, write } from "./store.mjs";

const REGISTRY_KEY = "vault_queue_registry";
const ACTIVE_SPAWN_KEY = "active_spawn";
const WARP_STATE_KEY = "warp_state";

export function getVaultStatus() {
  return {
    ok: true,
    service: "THE VOID",
    version: 3,
    storage: "Local / Cloudflare KV",
    warpEngine: "UNKNOWN_CLAIM_WINDOW",
  };
}

export function getRegistry() {
  const reg = read(REGISTRY_KEY, null);
  if (!reg) {
    return { queue: [], spawnedHistory: [], lastSerialIndex: 0 };
  }
  if (!Array.isArray(reg.queue)) reg.queue = [];
  if (!Array.isArray(reg.spawnedHistory)) reg.spawnedHistory = [];
  if (!Number.isFinite(Number(reg.lastSerialIndex))) reg.lastSerialIndex = 0;
  return reg;
}

export function saveRegistry(reg) {
  return write(REGISTRY_KEY, reg);
}

export function getWarpState() {
  const existing = read(WARP_STATE_KEY, null);
  if (existing) return existing;
  return {
    warpId: 0,
    state: "IDLE",
    artifact: null,
    spawnedAt: null,
    claimedAt: null,
    archivedAt: null,
    claimedBy: null,
    claimAttempts: 0,
    secret: null,
  };
}

export function saveWarpState(warp) {
  return write(WARP_STATE_KEY, warp);
}

export function getActiveSpawn() {
  return read(ACTIVE_SPAWN_KEY, null);
}

export function setActiveSpawn(spawn) {
  if (spawn === null) {
    return write(ACTIVE_SPAWN_KEY, null);
  }
  return write(ACTIVE_SPAWN_KEY, spawn);
}

export function getInventory() {
  const registry = getRegistry();
  return {
    success: true,
    totalUnspawned: registry.queue.length,
    totalSpawned: registry.spawnedHistory.length,
    lastSerialIndex: registry.lastSerialIndex || 0,
  };
}

export function resetVaultState() {
  const reg = { queue: [], spawnedHistory: [], lastSerialIndex: 0 };
  saveRegistry(reg);
  setActiveSpawn(null);
  const freshWarp = {
    warpId: 0,
    state: "IDLE",
    artifact: null,
    spawnedAt: null,
    claimedAt: null,
    archivedAt: null,
    claimedBy: null,
    claimAttempts: 0,
    secret: null,
  };
  saveWarpState(freshWarp);
  return {
    success: true,
    message: "Vault and spawn state reset completely.",
    inventory: getInventory(),
    warp: publicWarp(freshWarp),
  };
}

export function registerArtifacts(artifacts) {
  if (!Array.isArray(artifacts)) {
    throw new Error("INVALID_ARTIFACT_LIST");
  }

  const registry = getRegistry();
  const existingIds = new Set([
    ...registry.queue.map(a => a.id),
    ...registry.spawnedHistory,
  ]);

  let added = 0;
  for (const artifact of artifacts) {
    if (!artifact?.id) continue;
    if (!existingIds.has(artifact.id)) {
      registry.queue.push(artifact);
      existingIds.add(artifact.id);
      added++;
    }
  }

  saveRegistry(registry);
  return {
    success: true,
    added,
    totalUnspawned: registry.queue.length,
  };
}

export function dispenseNextArtifact() {
  const existingSpawn = getActiveSpawn();
  if (existingSpawn) {
    const existingWarp = getWarpState();
    if (
      existingWarp.artifact &&
      existingWarp.artifact.id === existingSpawn.id &&
      existingWarp.state !== "ARCHIVED"
    ) {
      const err = new Error(`${existingSpawn.id} is still inside THE VOID.`);
      err.code = "ACTIVE_WARP_EXISTS";
      err.status = 409;
      throw err;
    }
  }

  const registry = getRegistry();
  if (!registry.queue.length) {
    const err = new Error("Vault is empty.");
    err.code = "VAULT_EMPTY";
    err.status = 409;
    throw err;
  }

  const artifact = registry.queue.shift();
  registry.spawnedHistory.push(artifact.id);
  saveRegistry(registry);

  const now = Date.now();
  const spawn = {
    ...artifact,
    spawnedAt: now,
  };

  setActiveSpawn(spawn);

  const secret = createClaimCondition(artifact, now);
  const previousWarp = getWarpState();

  const warp = {
    warpId: Number(previousWarp.warpId || 0) + 1,
    state: "ACTIVE",
    artifact: spawn,
    spawnedAt: now,
    claimedAt: null,
    archivedAt: null,
    claimedBy: null,
    claimAttempts: 0,
    secret,
  };

  saveWarpState(warp);

  return {
    success: true,
    spawn,
    warp: publicWarp(warp),
  };
}

function checkAndAutoExpireWarp(warp, now = Date.now()) {
  if (
    warp &&
    warp.state === "ACTIVE" &&
    warp.secret?.closesAt &&
    now > warp.secret.closesAt
  ) {
    warp.state = "ARCHIVED";
    warp.archivedAt = now;
    warp.outcome = "LOST";
    saveWarpState(warp);
    setActiveSpawn(null);
  }
  return warp;
}

export function getCurrentDrop() {
  let warp = getWarpState();
  warp = checkAndAutoExpireWarp(warp);

  const spawn = getActiveSpawn();
  if (!spawn) {
    return {
      success: true,
      active: false,
      spawn: null,
    };
  }

  return {
    success: true,
    active: warp.state === "ACTIVE" || warp.state === "CLAIMED",
    spawn,
  };
}

export function getCurrentWarp() {
  let warp = getWarpState();
  warp = checkAndAutoExpireWarp(warp);

  if (!warp.artifact || warp.state === "IDLE") {
    return {
      success: true,
      active: false,
      warp: publicWarp(warp),
    };
  }

  return {
    success: true,
    active: warp.state === "ACTIVE",
    warp: publicWarp(warp),
  };
}

export function claimWarpAttempt(claimIdRaw) {
  const warp = getWarpState();

  if (!warp.artifact || warp.state === "IDLE") {
    return { status: 409, data: { success: false, result: "NO_WARP" } };
  }

  if (warp.state === "CLAIMED") {
    return { status: 409, data: { success: false, result: "ALREADY_CLAIMED", warp: publicWarp(warp) } };
  }

  if (warp.state === "ARCHIVED") {
    return { status: 409, data: { success: false, result: "GONE", warp: publicWarp(warp) } };
  }

  const now = Date.now();
  warp.claimAttempts = Number(warp.claimAttempts || 0) + 1;

  const evaluation = evaluateClaimCondition(warp, now);

  if (evaluation === "NOT_YET") {
    saveWarpState(warp);
    return { status: 200, data: { success: true, result: "NOT_YET" } };
  }

  if (evaluation === "GONE") {
    warp.state = "ARCHIVED";
    warp.archivedAt = now;
    saveWarpState(warp);
    setActiveSpawn(null);
    return { status: 200, data: { success: true, result: "GONE", warp: publicWarp(warp) } };
  }

  if (evaluation === "CLAIM") {
    const claimId = normalizeClaimId(claimIdRaw) || crypto.randomUUID();
    warp.state = "CLAIMED";
    warp.claimedAt = now;
    warp.claimedBy = claimId;
    saveWarpState(warp);

    return {
      status: 200,
      data: {
        success: true,
        result: "CLAIMED",
        artifact: warp.artifact,
        claim: { claimId, claimedAt: now },
        warp: publicWarp(warp),
      },
    };
  }

  return { status: 500, data: { success: false, result: "UNKNOWN" } };
}

function createClaimCondition(artifact, spawnedAt) {
  const weirdness = clamp(Number(artifact?.weirdness || 0), 0, 100);
  const rarityWeight = getRarityWeight(artifact?.rarity);

  const randomA = secureRandom();
  const randomB = secureRandom();

  const baseDelay = 45_000 + Math.floor(randomA * 210_000);
  const anomalyDelay = Math.floor(weirdness * 350);
  const rarityDelay = rarityWeight * 5_000;
  const opensAt = spawnedAt + baseDelay + anomalyDelay + rarityDelay;

  const windowLength = 20_000 + Math.floor(randomB * 70_000);
  const closesAt = opensAt + windowLength;

  return {
    version: 1,
    family: "TEMPORAL_WINDOW",
    opensAt,
    closesAt,
    createdAt: spawnedAt,
  };
}

function evaluateClaimCondition(warp, now) {
  const secret = warp.secret;
  if (!secret) return "NOT_YET";

  switch (secret.family) {
    case "TEMPORAL_WINDOW": {
      if (now < secret.opensAt) return "NOT_YET";
      if (now > secret.closesAt) return "GONE";
      return "CLAIM";
    }
    default:
      return "NOT_YET";
  }
}

export function publicWarp(warp) {
  if (!warp) {
    return {
      warpId: 0,
      state: "IDLE",
      artifact: null,
      spawnedAt: null,
      claimedAt: null,
      archivedAt: null,
      outcome: null,
    };
  }

  return {
    warpId: Number(warp.warpId || 0),
    state: warp.state || "IDLE",
    artifact: warp.artifact || null,
    spawnedAt: warp.spawnedAt || warp.artifact?.spawnedAt || null,
    claimedAt: warp.claimedAt || null,
    archivedAt: warp.archivedAt || null,
    outcome:
      warp.outcome ||
      (warp.claimedAt ? "CLAIMED" : warp.state === "ARCHIVED" ? "LOST" : null),
  };
}

function secureRandom() {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] / 4294967296;
}

function getRarityWeight(rarity) {
  switch (String(rarity || "").toUpperCase()) {
    case "COMMON": return 0;
    case "UNCOMMON": return 1;
    case "RARE": return 2;
    case "EPIC": return 3;
    case "LEGENDARY": return 4;
    case "MYTHIC": return 5;
    case "DIVINE": return 6;
    default: return 0;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeClaimId(value) {
  if (!value) return null;
  const id = String(value).trim();
  if (id.length < 8 || id.length > 128) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return null;
  return id;
}

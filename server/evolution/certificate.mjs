import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { keys } from "../crypto/keys.mjs";

const INSTANCE_REGISTRY_FILE = path.resolve("data/instance-registry.json");

function ensureDir(fp) {
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadRegistry() {
  ensureDir(INSTANCE_REGISTRY_FILE);
  if (!fs.existsSync(INSTANCE_REGISTRY_FILE)) {
    fs.writeFileSync(INSTANCE_REGISTRY_FILE, "{}", "utf8");
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(INSTANCE_REGISTRY_FILE, "utf8"));
  } catch {
    return {};
  }
}

function saveRegistry(reg) {
  ensureDir(INSTANCE_REGISTRY_FILE);
  fs.writeFileSync(INSTANCE_REGISTRY_FILE, JSON.stringify(reg, null, 2), "utf8");
}

/**
 * Canonical stringifier for cryptographic deterministic hashing
 */
export function canonicalizeState(state) {
  const keys = Object.keys(state).sort();
  const sortedObj = {};
  for (const k of keys) {
    if (k === "signature") continue;
    sortedObj[k] = state[k];
  }
  return JSON.stringify(sortedObj);
}

/**
 * Signs an instance evolution certificate using the Void's authoritative server key
 */
export function signEvolutionCertificate(certData) {
  const { privateKey } = keys();
  const canonical = canonicalizeState(certData);
  const sig = crypto.sign(null, Buffer.from(canonical), privateKey).toString("base64");
  return {
    ...certData,
    signature: sig
  };
}

/**
 * Verifies if an evolution certificate has a valid Void signature
 */
export function verifyEvolutionCertificate(cert) {
  const { publicKey } = keys();
  const canonical = canonicalizeState(cert);
  if (!cert.signature) return false;
  return crypto.verify(null, Buffer.from(canonical), publicKey, Buffer.from(cert.signature, "base64"));
}

/**
 * Diminishing returns stat addition to prevent infinite stat inflation
 * e.g. Base 50 + current 30: +4 delta gets compressed if approaching saturation limit (e.g. 100)
 */
export function applyDiminishingDelta(currentVal, delta, maxCap = 100) {
  const val = Number(currentVal) || 0;
  if (delta <= 0) return Math.max(0, val + delta);
  
  const room = Math.max(0, maxCap - val);
  const factor = room / maxCap; // As val approaches 100, factor approaches 0
  const effectiveDelta = Math.max(1, Math.round(delta * (0.3 + 0.7 * factor)));
  return Math.min(maxCap, val + effectiveDelta);
}

/**
 * Registers or retrieves the latest authoritative revision for an instance.
 */
export function getAuthoritativeInstance(instanceId) {
  const reg = loadRegistry();
  return reg[instanceId] || null;
}

/**
 * Atomically mutates an instance with a new revision, evolution stats, and provenance record.
 */
export function mutateInstanceAtomic({
  instanceId,
  artifactId,
  controllerPublicKey,
  currentRevision,
  statMutations, // array of { stat, delta, source: "DUEL"|"FUSION", interaction, interactionId }
  duelsDelta = 0,
  fusionsDelta = 0
}) {
  const reg = loadRegistry();
  const existing = reg[instanceId];

  if (existing) {
    if (existing.latestRevision !== currentRevision) {
      throw new Error(`STALE_REVISION: Client revision is ${currentRevision}, but server authoritative revision is ${existing.latestRevision}`);
    }
  }

  const prevRevision = existing ? existing.latestRevision : 0;
  const newRevision = prevRevision + 1;
  const prevStats = existing ? { ...existing.evolution } : {};
  const newStats = { ...prevStats };
  const provenanceHistory = existing ? [...existing.provenance] : [];

  for (const mut of statMutations) {
    const prev = newStats[mut.stat] || 0;
    const next = applyDiminishingDelta(prev, mut.delta);
    newStats[mut.stat] = next;
    provenanceHistory.unshift({
      stat: mut.stat,
      delta: next - prev,
      source: mut.source || "UNKNOWN",
      interaction: mut.interaction || "VOID_INTERACTION",
      interactionId: mut.interactionId || `MUT-${Date.now()}`,
      revision: newRevision,
      timestamp: new Date().toISOString()
    });
  }

  // Keep last 30 provenance entries
  const trimmedProvenance = provenanceHistory.slice(0, 30);

  const certData = {
    instanceId,
    artifactId,
    controller: controllerPublicKey || existing?.controller || "ANONYMOUS_VOID_SOUL",
    revision: newRevision,
    evolution: newStats,
    duels: (existing?.duels || 0) + duelsDelta,
    fusions: (existing?.fusions || 0) + fusionsDelta,
    provenance: trimmedProvenance,
    rulesVersion: "void-evolution-v2.5",
    updatedAt: new Date().toISOString()
  };

  const signed = signEvolutionCertificate(certData);

  reg[instanceId] = {
    latestRevision: newRevision,
    artifactId,
    controller: certData.controller,
    evolution: newStats,
    duels: certData.duels,
    fusions: certData.fusions,
    provenance: trimmedProvenance,
    certificate: signed
  };

  saveRegistry(reg);
  return signed;
}

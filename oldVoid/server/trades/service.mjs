import crypto from "node:crypto";
import { archive } from "../archive/index.mjs";

// In-memory trade registry
const trades = new Map();

// Seed initial public trade offers from archive so the marketplace is active
function initSeedTrades() {
  if (trades.size > 0) return;
  const arch = archive();
  if (!arch || arch.length < 2) return;

  // Pick up to 3 distinct artifacts for public offers
  const candidates = arch.slice(0, Math.min(arch.length, 4));
  candidates.forEach((item, idx) => {
    const id = `tr_${crypto.randomUUID().slice(0, 8)}`;
    const soulNum = (100 + (idx * 37) % 899);
    trades.set(id, {
      id,
      creator_session: `seed_soul_${idx}`,
      creator_name: `SOUL #${soulNum}`,
      artifact: item.record,
      signature: item.signature,
      status: "OPEN", // "OPEN", "PENDING", "COMPLETED", "CANCELLED"
      published_at: Date.now() - (idx + 1) * 3600000,
      offered_artifact: null,
      offered_by_session: null,
      offered_by_name: null,
      creator_confirmed: true, // Seeded witnesses are pre-agreed to valid offers
      respondent_confirmed: false
    });
  });
}

// Get all active trades (filtered or all)
export function getTrades(currentSessionId) {
  initSeedTrades();
  const list = [];
  for (const t of trades.values()) {
    list.push({
      ...t,
      is_owner: t.creator_session === currentSessionId,
      is_respondent: t.offered_by_session === currentSessionId
    });
  }
  // Sort: PENDING first, then OPEN, newest first
  return list.sort((a, b) => {
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (b.status === "PENDING" && a.status !== "PENDING") return 1;
    return b.published_at - a.published_at;
  });
}

export function publishTrade(sessionId, artifact, signature = null) {
  if (!artifact || !artifact.artifact_id || !artifact.name) {
    throw new Error("INVALID_ARTIFACT");
  }
  const id = `tr_${crypto.randomUUID().slice(0, 8)}`;
  const witnessHash = crypto.createHash("sha256").update(sessionId).digest("hex").slice(0, 4).toUpperCase();
  const trade = {
    id,
    creator_session: sessionId,
    creator_name: `SOUL #${witnessHash}`,
    artifact,
    signature,
    status: "OPEN",
    published_at: Date.now(),
    offered_artifact: null,
    offered_by_session: null,
    offered_by_name: null,
    creator_confirmed: false,
    respondent_confirmed: false
  };
  trades.set(id, trade);
  return trade;
}

export function proposeTrade(tradeId, sessionId, offeredArtifact) {
  const trade = trades.get(tradeId);
  if (!trade) throw new Error("TRADE_NOT_FOUND");
  if (trade.status !== "OPEN" && trade.status !== "PENDING") throw new Error("TRADE_NOT_AVAILABLE");
  if (!offeredArtifact || !offeredArtifact.artifact_id) throw new Error("INVALID_OFFER");

  const witnessHash = crypto.createHash("sha256").update(sessionId).digest("hex").slice(0, 4).toUpperCase();
  trade.status = "PENDING";
  trade.offered_artifact = offeredArtifact;
  trade.offered_by_session = sessionId;
  trade.offered_by_name = `SOUL #${witnessHash}`;
  trade.respondent_confirmed = false;
  // If seeded witness, creator is automatically ready to confirm
  if (trade.creator_session.startsWith("seed_soul_")) {
    trade.creator_confirmed = true;
  } else {
    trade.creator_confirmed = false;
  }
  trade.updated_at = Date.now();
  return trade;
}

export function confirmTrade(tradeId, sessionId, role = null) {
  const trade = trades.get(tradeId);
  if (!trade) throw new Error("TRADE_NOT_FOUND");
  if (trade.status !== "PENDING") throw new Error("TRADE_NOT_PENDING");

  const isCreator = trade.creator_session === sessionId || trade.creator_session.startsWith("seed_soul_");
  const isRespondent = trade.offered_by_session === sessionId;

  if (role === "creator" || isCreator) {
    trade.creator_confirmed = true;
  }
  if (role === "respondent" || isRespondent) {
    trade.respondent_confirmed = true;
  }

  // Double confirmation check
  if (trade.creator_confirmed && trade.respondent_confirmed) {
    trade.status = "COMPLETED";
    trade.completed_at = Date.now();
  }

  return trade;
}

export function cancelTrade(tradeId, sessionId) {
  const trade = trades.get(tradeId);
  if (!trade) throw new Error("TRADE_NOT_FOUND");

  const isCreator = trade.creator_session === sessionId;
  const isRespondent = trade.offered_by_session === sessionId;

  if (trade.status === "PENDING") {
    // If pending, reset back to OPEN or CANCELLED
    trade.status = "OPEN";
    trade.offered_artifact = null;
    trade.offered_by_session = null;
    trade.offered_by_name = null;
    trade.creator_confirmed = trade.creator_session.startsWith("seed_soul_");
    trade.respondent_confirmed = false;
    return { ...trade, message: "TRADE_OFFER_CANCELLED" };
  }

  if (isCreator) {
    trades.delete(tradeId);
    return { id: tradeId, status: "DELETED", message: "TRADE_LISTING_REMOVED" };
  }

  throw new Error("UNAUTHORIZED_CANCEL");
}

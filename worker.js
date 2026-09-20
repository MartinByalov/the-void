const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const REGISTRY_KEY = "VAULT_QUEUE_REGISTRY";
const ACTIVE_SPAWN_KEY = "ACTIVE_SPAWN";
const WARP_STATE_KEY = "WARP_STATE";

// ========================================================
// WORKER
// ========================================================

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);

    try {
      // --------------------------------------------------
      // ROOT & STATUS
      // --------------------------------------------------

      if (
        (url.pathname === "/" || url.pathname === "/api" || url.pathname === "/api/status") &&
        request.method === "GET"
      ) {
        return json({
          ok: true,
          service: "THE VOID",
          version: 3,
          storage: "Cloudflare KV",
          warpEngine: "UNKNOWN_CLAIM_WINDOW",
          status: "ONLINE",
          endpoints: [
            "/api/status",
            "/api/vault/inventory",
            "/api/vault/register",
            "/api/vault/dispense",
            "/api/drop",
            "/api/warp",
            "/api/warp/claim",
          ],
        }, 200, 30);
      }

      // --------------------------------------------------
      // VAULT INVENTORY
      // --------------------------------------------------

      if (
        url.pathname === "/api/vault/inventory" &&
        request.method === "GET"
      ) {
        const registry = await getRegistry(env);

        return json({
          success: true,
          totalUnspawned: registry.queue.length,
          totalSpawned: registry.spawnedHistory.length,
          lastSerialIndex: registry.lastSerialIndex || 0,
        }, 200, 30);
      }

      // --------------------------------------------------
      // REGISTER ARTIFACT BATCH
      // --------------------------------------------------

      if (
        url.pathname === "/api/vault/register" &&
        request.method === "POST"
      ) {
        const body = await safeJson(request);
        const artifacts = body.artifacts;

        if (!Array.isArray(artifacts)) {
          return json(
            {
              success: false,
              error: "INVALID_ARTIFACT_LIST",
            },
            400
          );
        }

        const registry = await getRegistry(env);

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

        await saveRegistry(env, registry);

        return json({
          success: true,
          added,
          totalUnspawned: registry.queue.length,
        });
      }

      // --------------------------------------------------
      // DISPENSE NEXT ARTIFACT
      // --------------------------------------------------

      if (
        url.pathname === "/api/vault/dispense" &&
        request.method === "POST"
      ) {
        const existingSpawn = await env.VOID_KV.get(
          ACTIVE_SPAWN_KEY,
          "json"
        );

        if (existingSpawn) {
          const existingWarp = await getWarpState(env);

          if (
            existingWarp.artifact &&
            existingWarp.artifact.id === existingSpawn.id &&
            existingWarp.state !== "ARCHIVED"
          ) {
            return json(
              {
                success: false,
                error: "ACTIVE_WARP_EXISTS",
                message:
                  `${existingSpawn.id} is still inside THE VOID.`,
              },
              409
            );
          }
        }

        const registry = await getRegistry(env);

        if (!registry.queue.length) {
          return json(
            {
              success: false,
              error: "VAULT_EMPTY",
              message: "Vault is empty.",
            },
            409
          );
        }

        const artifact = registry.queue.shift();

        registry.spawnedHistory.push(artifact.id);

        await saveRegistry(env, registry);

        const now = Date.now();

        const spawn = {
          ...artifact,
          spawnedAt: now,
        };

        await env.VOID_KV.put(
          ACTIVE_SPAWN_KEY,
          JSON.stringify(spawn)
        );

        // Generate the hidden condition immediately.
        const secret = createClaimCondition(artifact, now);

        const previousWarp = await getWarpState(env);

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

        await saveWarpState(env, warp);

        return json({
          success: true,
          spawn,
          warp: publicWarp(warp),
        });
      }

      // --------------------------------------------------
      // CURRENT DROP
      // --------------------------------------------------

      if (
        url.pathname === "/api/drop" &&
        request.method === "GET"
      ) {
        let warp = await getWarpState(env);
        warp = await checkAndAutoExpireWarp(env, warp);

        const spawn = await env.VOID_KV.get(
          ACTIVE_SPAWN_KEY,
          "json"
        );

        if (!spawn) {
          return json({
            success: true,
            active: false,
            spawn: null,
          }, 200, 15);
        }

        return json({
          success: true,
          active:
            warp.state === "ACTIVE" ||
            warp.state === "CLAIMED",
          spawn,
        }, 200, 15);
      }

      // --------------------------------------------------
      // CURRENT WARP
      // --------------------------------------------------

      if (
        url.pathname === "/api/warp" &&
        request.method === "GET"
      ) {
        let warp = await getWarpState(env);
        warp = await checkAndAutoExpireWarp(env, warp);

        if (
          !warp.artifact ||
          warp.state === "IDLE"
        ) {
          return json({
            success: true,
            active: false,
            warp: publicWarp(warp),
          }, 200, 15);
        }

        return json({
          success: true,
          active: warp.state === "ACTIVE",
          warp: publicWarp(warp),
        }, 200, 15);
      }

      // --------------------------------------------------
      // CLAIM ATTEMPT
      // --------------------------------------------------

      if (
        url.pathname === "/api/warp/claim" &&
        request.method === "POST"
      ) {
        const warp = await getWarpState(env);

        if (
          !warp.artifact ||
          warp.state === "IDLE"
        ) {
          return json(
            {
              success: false,
              result: "NO_WARP",
            },
            409
          );
        }

        if (warp.state === "CLAIMED") {
          return json(
            {
              success: false,
              result: "ALREADY_CLAIMED",
              warp: publicWarp(warp),
            },
            409
          );
        }

        if (warp.state === "ARCHIVED") {
          return json(
            {
              success: false,
              result: "GONE",
              warp: publicWarp(warp),
            },
            409
          );
        }

        const now = Date.now();

        warp.claimAttempts =
          Number(warp.claimAttempts || 0) + 1;

        const evaluation =
          evaluateClaimCondition(warp, now);

        // ----------------------------------------------
        // TOO EARLY / INVALID MOMENT
        // ----------------------------------------------

        if (evaluation === "NOT_YET") {
          await saveWarpState(env, warp);

          return json({
            success: true,
            result: "NOT_YET",
          });
        }

        // ----------------------------------------------
        // CLAIM WINDOW HAS PASSED
        // ----------------------------------------------

        if (evaluation === "GONE") {
          warp.state = "ARCHIVED";
          warp.archivedAt = now;

          await saveWarpState(env, warp);

          await env.VOID_KV.delete(
            ACTIVE_SPAWN_KEY
          );

          return json({
            success: true,
            result: "GONE",
            warp: publicWarp(warp),
          });
        }

        // ----------------------------------------------
        // SUCCESSFUL CLAIM
        // ----------------------------------------------

        if (evaluation === "CLAIM") {
          const body = await safeJson(request);

          const claimId =
            normalizeClaimId(body?.claimId) ||
            crypto.randomUUID();

          warp.state = "CLAIMED";
          warp.claimedAt = now;
          warp.claimedBy = claimId;

          await saveWarpState(env, warp);

          return json({
            success: true,
            result: "CLAIMED",

            artifact: warp.artifact,

            claim: {
              claimId,
              claimedAt: now,
            },

            warp: publicWarp(warp),
          });
        }

        return json(
          {
            success: false,
            result: "UNKNOWN",
          },
          500
        );
      }

      // --------------------------------------------------
      // ARTIFACT IMAGE PROXY (GOOGLE DRIVE BRIDGE)
      // --------------------------------------------------

      if (
        url.pathname.startsWith("/api/artifact/") &&
        (url.pathname.endsWith("/image") || url.pathname.endsWith(".png")) &&
        request.method === "GET"
      ) {
        const parts = url.pathname.split("/");
        const rawId = parts[3]?.replace(/\.png$/, "") || "";
        const artifactId = decodeURIComponent(rawId);

        if (!artifactId) {
          return new Response("Missing artifact ID", { status: 400, headers: corsHeaders });
        }

        const cacheKey = `IMG_CACHE_${artifactId}`;
        const cachedBase64 = env.VOID_KV ? await env.VOID_KV.get(cacheKey) : null;
        if (cachedBase64) {
          const binary = Uint8Array.from(atob(cachedBase64), c => c.charCodeAt(0));
          return new Response(binary, {
            headers: {
              ...corsHeaders,
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=86400, immutable",
            },
          });
        }

        const bridgeUrl = env.GDRIVE_BRIDGE_URL || "https://script.google.com/macros/s/AKfycbxU71GcSxKJSODAik_dfMXpBiKetK77A070POiFEkAPIracZMBodgVI3swztKKMXTKSgA/exec";
        const bridgeKey = env.GDRIVE_BRIDGE_KEY || "Lglwos8XzCSJaQvTAMKuhRvXkNHAkpKQ";

        let variants = [artifactId];
        if (artifactId.includes("-")) variants.push(artifactId.replace(/-/g, "_"));
        if (artifactId.includes("_")) variants.push(artifactId.replace(/_/g, "-"));

        for (let targetId of variants) {
          try {
            const gdriveRes = await fetch(`${bridgeUrl}?id=${encodeURIComponent(targetId)}&key=${encodeURIComponent(bridgeKey)}`);
            if (gdriveRes.ok) {
              const data = await gdriveRes.json();
              if (data && data.found && data.base64) {
                if (env.VOID_KV) {
                  await env.VOID_KV.put(cacheKey, data.base64, { expirationTtl: 604800 });
                }
                const binary = Uint8Array.from(atob(data.base64), c => c.charCodeAt(0));
                return new Response(binary, {
                  headers: {
                    ...corsHeaders,
                    "Content-Type": data.mimeType || "image/png",
                    "Cache-Control": "public, max-age=86400, immutable",
                  },
                });
              }
            }
          } catch (err) {
            // continue
          }
        }

        return new Response("Artifact image not found in Google Drive", { status: 404, headers: corsHeaders });
      }

      // --------------------------------------------------
      // UNKNOWN ENDPOINT
      // --------------------------------------------------

      return json(
        {
          ok: false,
          error: "NOT_FOUND",
        },
        404
      );
    } catch (error) {
      console.error(error);

      return json(
        {
          ok: false,
          error: "INTERNAL_ERROR",
          message:
            error?.message ||
            "Unknown Worker error",
        },
        500
      );
    }
  },
};

// ========================================================
// SECRET CLAIM ENGINE
// ========================================================

function createClaimCondition(artifact, spawnedAt) {
  /*
    Calibrated for 15-30 spawns per 24 hours (1440 minutes):
    - COMMON:    35 - 50 minutes
    - UNCOMMON:  45 - 60 minutes
    - RARE:      60 - 80 minutes
    - EPIC:      75 - 95 minutes
    - LEGENDARY: 95 - 120 minutes
    - MYTHIC:    120 - 150 minutes

    Weighted daily average: ~23 spawns per day (Range: 15-30).
    Loot window once spawned: Exactly 60 seconds (1 minute).
  */

  const weirdness = clamp(
    Number(artifact?.weirdness || 0),
    0,
    100
  );

  const rarity = String(artifact?.rarity || "COMMON").toUpperCase();
  const rarityWeight = getRarityWeight(rarity);

  // Random server-side entropy for jitter
  const randomA = secureRandom();

  let baseDelayMinutes = 35; // Default for COMMON
  let varianceMinutes = 15;

  if (rarity === "DIVINE" || rarity === "COSMIC") {
    baseDelayMinutes = 360; // 6 hours base
    varianceMinutes = 120;  // 6 - 8 hours (360 - 480 min)
  } else if (rarity === "MYTHIC") {
    baseDelayMinutes = 120;
    varianceMinutes = 30; // 120 - 150 min (2 - 2.5 hours)
  } else if (rarity === "LEGENDARY") {
    baseDelayMinutes = 95;
    varianceMinutes = 25; // 95 - 120 min (~1.5 - 2 hours)
  } else if (rarity === "EPIC") {
    baseDelayMinutes = 75;
    varianceMinutes = 20; // 75 - 95 min
  } else if (rarity === "RARE") {
    baseDelayMinutes = 60;
    varianceMinutes = 20; // 60 - 80 min
  } else if (rarity === "UNCOMMON") {
    baseDelayMinutes = 45;
    varianceMinutes = 15; // 45 - 60 min
  } else {
    // COMMON
    baseDelayMinutes = 35;
    varianceMinutes = 15; // 35 - 50 min
  }

  // Jitter and weirdness influence within bounds
  const jitterMs = Math.floor(randomA * varianceMinutes * 60 * 1000);
  const anomalyJitterMs = Math.floor(weirdness * 1200); // 0 - 120 sec subtle variance

  const opensAt =
    spawnedAt +
    (baseDelayMinutes * 60 * 1000) +
    jitterMs +
    anomalyJitterMs;

  // Exact 1 minute (60 seconds) LOOT window once materialized
  const windowLength = 60 * 1000;

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

  if (!secret) {
    return "NOT_YET";
  }

  switch (secret.family) {
    case "TEMPORAL_WINDOW": {
      if (now < secret.opensAt) {
        return "NOT_YET";
      }

      if (now > secret.closesAt) {
        return "GONE";
      }

      return "CLAIM";
    }

    default:
      return "NOT_YET";
  }
}

async function checkAndAutoExpireWarp(env, warp, now = Date.now()) {
  if (
    warp &&
    warp.state === "ACTIVE" &&
    warp.secret?.closesAt &&
    now > warp.secret.closesAt
  ) {
    warp.state = "ARCHIVED";
    warp.archivedAt = now;
    warp.outcome = "LOST";
    await saveWarpState(env, warp);
    await env.VOID_KV.delete(ACTIVE_SPAWN_KEY);
  }
  return warp;
}

// ========================================================
// PUBLIC WARP
// ========================================================

function publicWarp(warp) {
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
    warpId:
      Number(warp.warpId || 0),

    state:
      warp.state || "IDLE",

    artifact:
      warp.artifact || null,

    spawnedAt:
      warp.spawnedAt ||
      warp.artifact?.spawnedAt ||
      null,

    claimedAt:
      warp.claimedAt || null,

    archivedAt:
      warp.archivedAt || null,

    outcome:
      warp.outcome ||
      (warp.claimedAt ? "CLAIMED" : warp.state === "ARCHIVED" ? "LOST" : null),
  };
}

// ========================================================
// REGISTRY
// ========================================================

async function getRegistry(env) {
  const registry = await env.VOID_KV.get(
    REGISTRY_KEY,
    "json"
  );

  if (!registry) {
    return {
      queue: [],
      spawnedHistory: [],
      lastSerialIndex: 0,
    };
  }

  if (!Array.isArray(registry.queue)) {
    registry.queue = [];
  }

  if (!Array.isArray(registry.spawnedHistory)) {
    registry.spawnedHistory = [];
  }

  if (
    !Number.isFinite(
      Number(registry.lastSerialIndex)
    )
  ) {
    registry.lastSerialIndex = 0;
  }

  return registry;
}

async function saveRegistry(env, registry) {
  await env.VOID_KV.put(
    REGISTRY_KEY,
    JSON.stringify(registry)
  );
}

// ========================================================
// WARP STATE
// ========================================================

async function getWarpState(env) {
  const existing = await env.VOID_KV.get(
    WARP_STATE_KEY,
    "json"
  );

  if (existing) {
    return existing;
  }

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

async function saveWarpState(env, warp) {
  await env.VOID_KV.put(
    WARP_STATE_KEY,
    JSON.stringify(warp)
  );
}

// ========================================================
// RANDOM
// ========================================================

function secureRandom() {
  const values = new Uint32Array(1);

  crypto.getRandomValues(values);

  return values[0] / 4294967296;
}

// ========================================================
// ARTIFACT HELPERS
// ========================================================

function getRarityWeight(rarity) {
  switch (
    String(rarity || "").toUpperCase()
  ) {
    case "COMMON":
      return 0;

    case "UNCOMMON":
      return 1;

    case "RARE":
      return 2;

    case "EPIC":
      return 3;

    case "LEGENDARY":
      return 4;

    case "MYTHIC":
      return 5;

    case "DIVINE":
      return 6;

    default:
      return 0;
  }
}

function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

function normalizeClaimId(value) {
  if (!value) return null;

  const id = String(value).trim();

  if (
    id.length < 8 ||
    id.length > 128
  ) {
    return null;
  }

  if (
    !/^[A-Za-z0-9_-]+$/.test(id)
  ) {
    return null;
  }

  return id;
}

// ========================================================
// GENERAL HELPERS
// ========================================================

async function safeJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function json(data, status = 200, cdnTtlSeconds = 0) {
  const headers = {
    ...corsHeaders,
    "Content-Type": "application/json; charset=utf-8",
  };

  if (cdnTtlSeconds > 0) {
    // Enable Cloudflare CDN edge caching
    headers["Cache-Control"] = `public, max-age=5, s-maxage=${cdnTtlSeconds}, stale-while-revalidate=10`;
  } else {
    headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
  }

  return new Response(JSON.stringify(data), {
    status,
    headers,
  });
}

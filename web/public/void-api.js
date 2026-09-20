const API_BASE =
  "https://crimson-smoke-3553.byalov-v-martin.workers.dev";

export const VoidAPI = {
  async status() {
    return request("/api/status");
  },

  async getInventory() {
    return request("/api/vault/inventory");
  },

  async getActiveDrop() {
    return request("/api/drop");
  },

  async getWarp() {
    return request("/api/warp");
  },

  async claimWarp(claimId) {
  return request("/api/warp/claim", {
    method: "POST",
    body: JSON.stringify({
      claimId,
    }),
  });
},

  async registerArtifacts(artifacts) {
    return request("/api/vault/register", {
      method: "POST",
      body: JSON.stringify({ artifacts }),
    });
  },

  async dispenseNextSpawn(durationMinutes = 10) {
    return request("/api/vault/dispense", {
      method: "POST",
      body: JSON.stringify({
        durationMinutes,
      }),
    });
  },
};

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(API_BASE + path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch (err) {
    // If external Cloudflare worker is unreachable or blocked, fallback to local server
    try {
      response = await fetch(path, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });
    } catch {
      throw err;
    }
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      `THE VOID API returned invalid response (${response.status})`
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      `THE VOID API error (${response.status})`
    );
  }

  return data;
}
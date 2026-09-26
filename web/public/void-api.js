const API_BASE = "https://crimson-smoke-3553.byalov-v-martin.workers.dev";

export const VoidAPI = {
  warpSocketUrl() {
    const url = new URL(API_BASE);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = "/warp-stream";
    url.search = "";
    return url.toString();
  },
  async getPublicWarpState() { return publicRequest("/warp-state"); },
  async status() { return request("/api/status"); },
  async getInventory() { return request("/api/vault/inventory", {}, true); },
  async getWarp() { return request("/api/warp", {}, true); },
  async getActiveDrop() { return request("/api/drop", {}, true); },
  async getVaultRegistry() { return request("/api/vault/registry", {}, true); },
  async getArchive() { return publicRequest("/api/archive"); },
  async scanDrive() { return request("/api/vault/scan-drive", { method: "POST" }); },
  async startWarp() { return request("/api/warp/start", { method: "POST" }); },
  async stopWarp() {
    try {
      return await request("/api/warp/stop", { method: "POST" });
    } catch (err) {
      if (err.status === 404 || err.code === "NOT_FOUND" || String(err.message).includes("NOT_FOUND")) {
        return await request("/api/vault/reset", { method: "POST" });
      }
      throw err;
    }
  },
  async forceDrop(payload = {}) {
    try {
      return await request("/api/warp/force-drop", { method: "POST", body: JSON.stringify(payload) });
    } catch (err) {
      if (err.message && (err.message.includes("already active") || err.message.includes("DROP_ALREADY_ACTIVE"))) {
        try { await request("/api/warp/stop", { method: "POST" }); } catch {}
        return await request("/api/warp/force-drop", { method: "POST", body: JSON.stringify(payload) });
      }
      throw err;
    }
  },
  async claimWarp() { return request("/api/warp/claim", { method: "POST" }); },
  async createArtifact(payload) {
    return request("/api/artifacts/create", { method: "POST", body: JSON.stringify(payload) });
  },
  async syncArchive() { return request("/api/archive/sync", { method: "POST" }); },
  async clearVaultRegistry() { return request("/api/vault/registry/clear", { method: "POST" }); },
  async removeLastVaultArtifact() { return request("/api/vault/registry/remove-last", { method: "POST" }); },
  async clearArchive() { return request("/api/archive/clear", { method: "POST" }); },
  async registerArtifacts(artifacts) {
    if (!Array.isArray(artifacts)) throw new Error("registerArtifacts expects an array");
    return request("/api/vault/register", { method: "POST", body: JSON.stringify({ artifacts }) });
  },
  async resetVault() { return request("/api/vault/reset", { method: "POST" }); },
  artifactImageUrl(artifactId) {
    return artifactId ? API_BASE + "/api/artifact/" + encodeURIComponent(artifactId) + "/image" : "";
  },
};

async function request(path, options = {}, bustCache = false) {
  let url = API_BASE + path;
  if (bustCache) url += (url.includes("?") ? "&" : "?") + "_=" + Date.now();
  let response;
  try {
    response = await fetch(url, { ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  } catch { throw new Error("THE VOID Worker is unreachable"); }
  let data;
  try { data = await response.json(); }
  catch { throw new Error(`THE VOID API returned invalid response (${response.status})`); }
  if (!response.ok) {
    const error = new Error(data.message || data.error || `THE VOID API error (${response.status})`);
    error.status = response.status; error.code = data.error || null; error.data = data; throw error;
  }
  return data;
}

async function publicRequest(path) {
  let response;
  try { response = await fetch(API_BASE + path, { method: "GET", headers: { Accept: "application/json" }, cache: "no-store" }); }
  catch { throw new Error("THE VOID public state is unreachable"); }
  let data;
  try { data = await response.json(); }
  catch { throw new Error(`THE VOID public state returned invalid response (${response.status})`); }
  if (!response.ok) throw new Error(data?.error || `THE VOID public state error (${response.status})`);
  return data;
}

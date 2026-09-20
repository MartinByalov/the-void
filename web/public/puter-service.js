/**
 * ✦ THE VOID — Puter.js Decentralized Storage & Spawn Engine
 * 
 * Provides:
 * 1. Private Vault Storage (the_void_vault/VA-XXXXXX.png)
 * 2. Active Spawn Buffer & KV Registry (ACTIVE_SPAWN)
 * 3. Public Archive Storage for Claimed Artifacts (the_void_archive/VA-XXXXXX.png)
 * 4. Zero-Knowledge Drop delivery
 */

const VAULT_DIR = "the_void_vault";
const ACTIVE_DROP_DIR = "the_void_active_drop";
const ARCHIVE_DIR = "the_void_archive";
const VAULT_REGISTRY_KEY = "VAULT_QUEUE_REGISTRY";

export const PuterService = {
  /**
   * Check if Puter.js is loaded and ready
   */
  isReady() {
    return typeof window !== "undefined" && typeof window.puter !== "undefined";
  },

  /**
   * Check if user is signed into Puter
   */
  async isSignedIn() {
    if (!this.isReady()) return false;
    try {
      return await window.puter.auth.isSignedIn();
    } catch {
      return false;
    }
  },

  /**
   * Sign in / authenticate with Puter (for Admin/Vault management)
   */
  async signIn() {
    if (!this.isReady()) throw new Error("Puter.js not loaded");
    return await window.puter.auth.signIn();
  },

  /**
   * 1. ADMIN: Batch register/upload artifacts into the Vault Pool
   * Can accept an array of 50-100+ artifacts with their metadata
   */
  async registerVaultBatch(artifactsList) {
    if (!this.isReady()) throw new Error("Puter.js not loaded");

    // Fetch existing registry or initialize
    let registry = (await window.puter.kv.get(VAULT_REGISTRY_KEY)) || {
      queue: [],
      spawnedHistory: [],
      lastSerialIndex: 0
    };

    if (!Array.isArray(registry.queue)) registry.queue = [];

    // Add new items to queue ensuring uniqueness
    const existingIds = new Set(registry.queue.map(a => a.id).concat(registry.spawnedHistory || []));
    let addedCount = 0;

    for (const art of artifactsList) {
      if (!existingIds.has(art.id)) {
        registry.queue.push(art);
        existingIds.add(art.id);
        addedCount++;
      }
    }

    await window.puter.kv.set(VAULT_REGISTRY_KEY, registry);
    return {
      success: true,
      added: addedCount,
      totalUnspawned: registry.queue.length
    };
  },

  /**
   * 2. INVENTORY MONITOR: Check how many artifacts remain in the vault
   */
  async getVaultInventory() {
    if (!this.isReady()) return { unspawned: 0, totalSpawned: 0, isLow: true };

    try {
      const registry = (await window.puter.kv.get(VAULT_REGISTRY_KEY)) || { queue: [], spawnedHistory: [] };
      const unspawned = registry.queue ? registry.queue.length : 0;
      const totalSpawned = registry.spawnedHistory ? registry.spawnedHistory.length : 0;

      return {
        unspawnedRemaining: unspawned,
        totalSpawned: totalSpawned,
        isLow: unspawned < 10 // Alert flag when < 10 artifacts remain
      };
    } catch {
      return { unspawnedRemaining: 0, totalSpawned: 0, isLow: true };
    }
  },

  /**
   * 3. AUTOMATIC DISPENSER: Takes the next artifact from the vault and drops it
   */
  async dispenseNextSpawn(durationMinutes = 10) {
    if (!this.isReady()) throw new Error("Puter.js not loaded");

    let registry = (await window.puter.kv.get(VAULT_REGISTRY_KEY)) || { queue: [], spawnedHistory: [] };

    if (!registry.queue || registry.queue.length === 0) {
      return { success: false, error: "VAULT_EMPTY", message: "Vault is empty! Upload more artifacts." };
    }

    // Take the next artifact in line
    const nextArtifact = registry.queue.shift();
    if (!registry.spawnedHistory) registry.spawnedHistory = [];
    registry.spawnedHistory.push(nextArtifact.id);

    // Save updated queue back to KV
    await window.puter.kv.set(VAULT_REGISTRY_KEY, registry);

    // Activate the drop
    return await this.triggerSpawn(nextArtifact, durationMinutes);
  },

  /**
   * 4. ADMIN: Upload single image to Private Vault
   */
  async uploadToVault(fileOrBlob, artifactId) {
    if (!this.isReady()) throw new Error("Puter.js not loaded");
    
    // Ensure vault directory exists
    try {
      await window.puter.fs.mkdir(VAULT_DIR);
    } catch {}

    const filename = `${artifactId}.png`;
    const filePath = `${VAULT_DIR}/${filename}`;
    
    await window.puter.fs.write(filePath, fileOrBlob);
    return { success: true, path: filePath };
  },

  /**
   * 5. TRIGGER DROP: Moves single active image to buffer and sets KV
   */
  async triggerSpawn(artifact, durationMinutes = 10) {
    if (!this.isReady()) throw new Error("Puter.js not loaded");

    const durationMs = durationMinutes * 60 * 1000;
    const expiresAt = Date.now() + durationMs;

    // Ensure active drop directory exists
    try {
      await window.puter.fs.mkdir(ACTIVE_DROP_DIR);
    } catch {}

    const filename = `${artifact.id}.png`;
    const vaultPath = `${VAULT_DIR}/${filename}`;
    const activePath = `${ACTIVE_DROP_DIR}/current_spawn.png`;

    // Copy from private vault to active buffer
    try {
      const imgData = await window.puter.fs.read(vaultPath);
      await window.puter.fs.write(activePath, imgData);
    } catch (err) {
      console.warn("Vault read notice (fallback to metadata only if asset missing):", err);
    }

    // Write active spawn metadata to Puter KV
    const spawnMetadata = {
      id: artifact.id,
      name: artifact.name,
      rarity: artifact.rarity,
      weirdness: artifact.weirdness,
      taxonomy: artifact.taxonomy,
      stats: artifact.stats,
      anomaly: artifact.anomaly,
      description: artifact.description,
      spawnedAt: Date.now(),
      expiresAt: expiresAt
    };

    await window.puter.kv.set("ACTIVE_SPAWN", spawnMetadata);
    return { success: true, spawn: spawnMetadata };
  },

  /**
   * 3. PLAYER: Get Current Active Drop Status
   * Returns metadata only if drop is currently alive.
   */
  async getActiveSpawn() {
    if (!this.isReady()) return { active: false };

    try {
      const active = await window.puter.kv.get("ACTIVE_SPAWN");
      if (!active || typeof active !== "object") {
        return { active: false };
      }

      // Check expiry
      if (active.expiresAt && Date.now() > active.expiresAt) {
        return { active: false, expired: true };
      }

      return { active: true, artifact: active };
    } catch (err) {
      console.error("Error fetching active spawn from Puter KV:", err);
      return { active: false };
    }
  },

  /**
   * 4. PLAYER: Stream/Load Active Drop Visual
   * Reads from current_spawn.png and returns object URL.
   */
  async getActiveSpawnVisualUrl() {
    if (!this.isReady()) return null;

    try {
      const activePath = `${ACTIVE_DROP_DIR}/current_spawn.png`;
      const blob = await window.puter.fs.read(activePath);
      if (blob) {
        return URL.createObjectURL(blob);
      }
    } catch (err) {
      console.warn("Could not read active spawn visual from Puter:", err);
    }
    return null;
  },

  /**
   * 5. PLAYER: Claim Active Spawn
   * Copies image to public archive, clears active drop buffer.
   */
  async claimSpawn(userInstance) {
    if (!this.isReady()) throw new Error("Puter.js not loaded");

    const active = await this.getActiveSpawn();
    if (!active.active) {
      throw new Error("Spawn has expired or is already claimed");
    }

    const artifactId = active.artifact.id;

    // Ensure archive directory exists
    try {
      await window.puter.fs.mkdir(ARCHIVE_DIR);
    } catch {}

    // Move from active buffer to public archive
    try {
      const activePath = `${ACTIVE_DROP_DIR}/current_spawn.png`;
      const archivePath = `${ARCHIVE_DIR}/${artifactId}.png`;
      const imgData = await window.puter.fs.read(activePath);
      await window.puter.fs.write(archivePath, imgData);
      // Clean active buffer
      await window.puter.fs.delete(activePath);
    } catch {}

    // Clear active spawn KV
    await window.puter.kv.del("ACTIVE_SPAWN");

    return {
      success: true,
      claimedArtifact: active.artifact,
      instanceId: userInstance.instanceId
    };
  },

  /**
   * 6. PUBLIC ARCHIVE: Load Claimed Artifact Image
   */
  async getArchivedVisualUrl(artifactId) {
    if (!this.isReady()) return null;

    try {
      const archivePath = `${ARCHIVE_DIR}/${artifactId}.png`;
      const blob = await window.puter.fs.read(archivePath);
      if (blob) {
        return URL.createObjectURL(blob);
      }
    } catch {}
    return null;
  }
};

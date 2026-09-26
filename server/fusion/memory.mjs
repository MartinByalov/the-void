import fs from "node:fs";
import path from "node:path";

const MEMORY_FILE = path.resolve("data/semantic-memory.json");

// Default bootstrap knowledge base of learned bridges
const INITIAL_MEMORY = {
  version: "1.0.0",
  totalFusionsObserved: 124,
  bridges: [
    { source: "SCREEN", target: "EYE", relation: "SENSORY_SURFACE_EQUIVALENCE", strength: 0.94, examples: ["CRT × FROG", "CAMERA × OWL"] },
    { source: "ANTENNA", target: "SENSORY_APPENDAGE", relation: "SIGNAL_TRANSDUCTION", strength: 0.91, examples: ["RADIO × MOTH", "CRT × FROG"] },
    { source: "SIGNAL", target: "INSTINCT", relation: "BEHAVIORAL_RESONANCE", strength: 0.88, examples: ["CRT × FROG", "TELEGRAPH × BIRD"] },
    { source: "WET", target: "ELECTRICAL_ANOMALY", relation: "CONDUCTIVE_CATALYST", strength: 0.85, examples: ["FROG × CRT"] },
    { source: "SPOUT", target: "MUZZLE", relation: "SIPHONIC_APERTURE", strength: 0.92, examples: ["TEAPOT × MOUSE"] },
    { source: "HANDLE", target: "TAIL", relation: "VERTEBRATE_LEVERAGE", strength: 0.95, examples: ["TEAPOT × MOUSE", "MUG × OCTOPUS"] },
    { source: "STEAM", target: "RESPIRATION", relation: "THERMAL_METABOLISM", strength: 0.89, examples: ["BOILER × FISH", "KETTLE × TURTLE"] },
    { source: "DIAL", target: "HEARTBEAT", relation: "PULSE_CHRONOMETER", strength: 0.86, examples: ["CLOCK × SNAIL", "OSCILLOSCOPE × FROG"] },
    { source: "CARAPACE", target: "HOUSING", relation: "EXOSKELETAL_ARMOR", strength: 0.90, examples: ["TYPEWRITER × CRAB"] },
    { source: "PEDAL", target: "WEB_FOOT", relation: "PROPULSION_STANCE", strength: 0.82, examples: ["SEWING_MACHINE × DUCK"] }
  ],
  discoveredCombinations: [
    {
      id: "FUSION-0001",
      concepts: ["CRT", "FROG"],
      candidate: "BROADCAST_FROG",
      status: "ACCEPTED",
      coherence: 0.92,
      novelty: 0.86,
      observations: 42,
      bridges: ["screen->sensory_surface", "antenna->sensory_appendage", "signal->behavior", "wet->conductive_flux"],
      discoveredAt: "2026-09-18T10:14:00Z"
    },
    {
      id: "FUSION-0002",
      concepts: ["TEAPOT", "MOUSE"],
      candidate: "TEA_MOUSE",
      status: "ACCEPTED",
      coherence: 0.96,
      novelty: 0.79,
      observations: 38,
      bridges: ["spout->muzzle", "handle->tail", "lid->cranial_plate"],
      discoveredAt: "2026-09-18T14:22:00Z"
    },
    {
      id: "FUSION-0003",
      concepts: ["BOILER", "FISH"],
      candidate: "CIRCULATING_FISH",
      status: "ACCEPTED",
      coherence: 0.89,
      novelty: 0.88,
      observations: 19,
      bridges: ["pressure->depth_tolerance", "steam->respiration", "flue->dorsal_fin"],
      discoveredAt: "2026-09-19T02:05:00Z"
    },
    {
      id: "FUSION-0004",
      concepts: ["CLOCK", "SNAIL"],
      candidate: "CALLING_SNAIL",
      status: "ACCEPTED",
      coherence: 0.91,
      novelty: 0.84,
      observations: 25,
      bridges: ["escapement->radula_rhythm", "coiling_shell->clockwork_casing", "pendulum->equilibrium"],
      discoveredAt: "2026-09-19T06:11:00Z"
    }
  ],
  generationCandidatePool: [
    { name: "THE BROADCAST FROG", parents: ["CRT", "FROG"], rarityBias: "RARE", weirdnessBias: 78 },
    { name: "THE TEA MOUSE", parents: ["TEAPOT", "MOUSE"], rarityBias: "UNCOMMON", weirdnessBias: 72 },
    { name: "THE CIRCULATING FISH", parents: ["BOILER", "FISH"], rarityBias: "EPIC", weirdnessBias: 85 },
    { name: "THE CALLING SNAIL", parents: ["CLOCK", "SNAIL"], rarityBias: "RARE", weirdnessBias: 79 },
    { name: "THE POSTAL BIRD", parents: ["TYPEWRITER", "RAVEN"], rarityBias: "EPIC", weirdnessBias: 88 },
    { name: "THE BREAKFAST TURTLE", parents: ["TOASTER", "TURTLE"], rarityBias: "UNCOMMON", weirdnessBias: 74 }
  ]
};

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function loadSemanticMemory() {
  ensureDir(MEMORY_FILE);
  if (!fs.existsSync(MEMORY_FILE)) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(INITIAL_MEMORY, null, 2), "utf8");
    return JSON.parse(JSON.stringify(INITIAL_MEMORY));
  }
  try {
    return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
  } catch (e) {
    return JSON.parse(JSON.stringify(INITIAL_MEMORY));
  }
}

export function saveSemanticMemory(mem) {
  ensureDir(MEMORY_FILE);
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(mem, null, 2), "utf8");
}

/**
 * Records a discovered relationship to global semantic memory.
 * Does not store player PII or accounts.
 */
export function recordVoidKnowledge(fusionResult) {
  const mem = loadSemanticMemory();
  mem.totalFusionsObserved = (mem.totalFusionsObserved || 0) + 1;

  const conceptA = String(fusionResult.conceptA || "").toUpperCase();
  const conceptB = String(fusionResult.conceptB || "").toUpperCase();
  const key = [conceptA, conceptB].sort().join(" × ");

  // Check if combination already known
  const existing = mem.discoveredCombinations.find(c => {
    const k = [...c.concepts].sort().join(" × ");
    return k === key;
  });

  if (existing) {
    existing.observations = (existing.observations || 1) + 1;
    existing.lastObservedAt = new Date().toISOString();
  } else {
    const id = `FUSION-${String(mem.discoveredCombinations.length + 1).padStart(4, "0")}`;
    mem.discoveredCombinations.unshift({
      id,
      concepts: [conceptA, conceptB],
      candidate: fusionResult.candidateName || `${conceptA}_${conceptB}_GESTALT`,
      status: fusionResult.status || "ACCEPTED",
      coherence: Number(fusionResult.coherenceScore.toFixed(2)),
      novelty: Number(fusionResult.noveltyScore.toFixed(2)),
      observations: 1,
      bridges: fusionResult.bridges.map(b => `${b.source}->${b.target}`),
      discoveredAt: new Date().toISOString()
    });

    // Add candidate to future generator pool
    if (fusionResult.status === "ACCEPTED" || fusionResult.status === "STABLE_FUSION") {
      mem.generationCandidatePool.unshift({
        name: fusionResult.candidateTitle || `THE ${conceptA} ${conceptB}`,
        parents: [conceptA, conceptB],
        rarityBias: fusionResult.noveltyScore > 0.85 ? "EPIC" : "RARE",
        weirdnessBias: Math.round(70 + fusionResult.noveltyScore * 25)
      });
    }
  }

  // Register or strengthen new bridges
  for (const b of fusionResult.bridges || []) {
    const bKey = `${b.source} ↔ ${b.target}`;
    const exBridge = mem.bridges.find(x => `${x.source} ↔ ${x.target}` === bKey || `${x.target} ↔ ${x.source}` === bKey);
    if (exBridge) {
      exBridge.strength = Math.min(0.99, Number((exBridge.strength + 0.02).toFixed(2)));
      if (!exBridge.examples.includes(key)) exBridge.examples.push(key);
    } else {
      mem.bridges.push({
        source: b.source,
        target: b.target,
        relation: b.relation || "SEMANTIC_TRANSPOSITION",
        strength: 0.80,
        examples: [key]
      });
    }
  }

  saveSemanticMemory(mem);
  return {
    mem,
    isFirstDiscovery: !existing,
    totalObserved: mem.totalFusionsObserved
  };
}

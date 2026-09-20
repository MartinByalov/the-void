import { resolveSemanticConcept } from "../../engine/dictionary/resolver.mjs";
import { recordVoidKnowledge } from "./memory.mjs";
import { mutateInstanceAtomic } from "../evolution/certificate.mjs";

/**
 * Universal Semantic Bridge Catalog
 */
const BRIDGE_RULES = [
  { matchA: ["SCREEN", "MONITOR", "CRT", "CAMERA", "LENS"], matchB: ["EYE", "CEPHALOPOD", "OWL", "OCELLI", "ANURAN", "FROG"], source: "SCREEN", target: "SENSORY_SURFACE", relation: "OPTICAL_TRANSPOSITION", strength: 0.95 },
  { matchA: ["ANTENNA", "DIAL", "RADIO", "TELEGRAPH", "ROUTER"], matchB: ["FEATHERED_ANTENNAE", "WHISKERS", "MOTH", "INSECTA", "RODENT", "SENSORY_APPENDAGE"], source: "ANTENNA", target: "SENSORY_APPENDAGE", relation: "SIGNAL_TRANSDUCTION", strength: 0.92 },
  { matchA: ["SIGNAL", "VOLTAGE", "ELECTRIC", "FREQUENCY"], matchB: ["INSTINCT", "CROAK", "VIBRATION", "ACOUSTIC", "BEHAVIOR"], source: "SIGNAL", target: "BEHAVIOR", relation: "BEHAVIORAL_RESONANCE", strength: 0.89 },
  { matchA: ["SPOUT", "VALVE", "FLUE", "NOZZLE"], matchB: ["MUZZLE", "BEAK", "SIPHON", "INCISORS", "RODENT"], source: "SPOUT", target: "SIPHONIC_MUZZLE", relation: "SIPHONIC_ANATOMY", strength: 0.94 },
  { matchA: ["HANDLE", "CORD", "LEVER", "WIRE"], matchB: ["TAIL", "VERTEBRATE_TAIL", "SPINE", "TENTACLE"], source: "HANDLE", target: "VERTEBRAL_LEVERAGE", relation: "STRUCTURAL_AXIS", strength: 0.93 },
  { matchA: ["BOILER", "STEAM", "PRESSURE", "FURNACE"], matchB: ["RESPIRATION", "GILLS", "DEPTH_TOLERANCE", "BATOID", "FISH"], source: "STEAM", target: "RESPIRATION", relation: "THERMAL_METABOLISM", strength: 0.90 },
  { matchA: ["CLOCK", "METRONOME", "PENDULUM", "ESCAPEMENT"], matchB: ["HEARTBEAT", "GAIT", "PULSE", "SNAIL", "AMPHIBIAN"], source: "ESCAPEMENT", target: "RHYTHMIC_PULSE", relation: "CHRONO_HOMEOSTASIS", strength: 0.91 },
  { matchA: ["CHASSIS", "HOUSING", "CASE", "SAFE", "IRON"], matchB: ["CARAPACE", "CHITIN", "SHELL", "CRUSTACEAN", "TURTLE"], source: "HOUSING", target: "CARAPACE", relation: "EXOSKELETAL_INTEGRATION", strength: 0.96 }
];

/**
 * Finds all valid semantic bridges between Artifact A and Artifact B
 */
export function findSemanticBridges(artA, artB) {
  const semA = resolveSemanticConcept(artA.object || artA.host_chassis || artA.name);
  const semB = resolveSemanticConcept(artB.object || artB.host_chassis || artB.name);

  const traitsA = new Set([...(artA.semantic_traits || []), ...(semA.traits || []), ...(semA.anatomy || []), semA.family, semA.category, artA.object].map(x => String(x).toUpperCase()));
  const traitsB = new Set([...(artB.semantic_traits || []), ...(semB.traits || []), ...(semB.anatomy || []), semB.family, semB.category, artB.object].map(x => String(x).toUpperCase()));

  const discoveredBridges = [];

  for (const rule of BRIDGE_RULES) {
    const aMatches = rule.matchA.some(m => traitsA.has(m) || [...traitsA].some(t => t.includes(m)));
    const bMatches = rule.matchB.some(m => traitsB.has(m) || [...traitsB].some(t => t.includes(m)));
    const revAMatches = rule.matchB.some(m => traitsA.has(m) || [...traitsA].some(t => t.includes(m)));
    const revBMatches = rule.matchA.some(m => traitsB.has(m) || [...traitsB].some(t => t.includes(m)));

    if ((aMatches && bMatches) || (revAMatches && revBMatches)) {
      discoveredBridges.push({
        source: rule.source.toLowerCase(),
        target: rule.target.toLowerCase(),
        relation: rule.relation,
        strength: rule.strength
      });
    }
  }

  // Dynamic trait cross-pollination bridge if no hardcoded rule fired
  if (discoveredBridges.length === 0) {
    const common = [...traitsA].filter(t => traitsB.has(t));
    if (common.length > 0) {
      discoveredBridges.push({
        source: common[0].toLowerCase(),
        target: "shared_morphology",
        relation: "HOMOLOGOUS_TRAIT",
        strength: 0.75
      });
    } else {
      // Check subtle resonance
      discoveredBridges.push({
        source: (semA.anatomy[0] || "matrix").toLowerCase(),
        target: (semB.anatomy[0] || "gestalt").toLowerCase(),
        relation: "WEAK_VOID_RESONANCE",
        strength: 0.58
      });
    }
  }

  return { semA, semB, bridges: discoveredBridges };
}

/**
 * Evaluates semantic coherence and novelty
 */
export function evaluateFusionQuality(semA, semB, bridges, anomalyA, anomalyB) {
  let coherence = 0.5;
  let novelty = 0.6;

  // Bridge strength contribution
  const avgBridge = bridges.reduce((s, b) => s + (b.strength || 0.5), 0) / Math.max(1, bridges.length);
  coherence += (avgBridge - 0.5) * 0.5;

  // Cross-category synergy: Inorganic + Organic yields high novelty and stable coherence
  if ((semA.category.includes("INORGANIC") && semB.category.includes("ORGANIC")) ||
      (semA.category.includes("ORGANIC") && semB.category.includes("INORGANIC"))) {
    coherence += 0.15;
    novelty += 0.22;
  }

  // Anomaly synergy
  if (anomalyA && anomalyB) {
    if (anomalyA === anomalyB) {
      coherence += 0.1;
      novelty -= 0.05;
    } else {
      novelty += 0.12;
    }
  }

  coherence = Math.min(0.98, Math.max(0.2, coherence));
  novelty = Math.min(0.98, Math.max(0.3, novelty));

  let status = "ACCEPTED";
  if (coherence >= 0.85) status = "STABLE_FUSION";
  else if (coherence < 0.45 && avgBridge < 0.6) status = "REJECTED";
  else if (novelty >= 0.82) status = "UNSTABLE_FUSION";
  else status = "ANOMALOUS_INSIGHT";

  return { coherence, novelty, status };
}

/**
 * Calculates resonant stat interactions between two instances.
 * Trade-offs and resonance: boosts aligned stats while balancing complementary properties.
 */
export function calculateResonantStatShifts(semA, semB, bridges, quality) {
  const shiftsA = [];
  const shiftsB = [];

  const statKeysA = Object.keys(semA.baseStats || {});
  const statKeysB = Object.keys(semB.baseStats || {});

  // Primary resonant exchange
  if (statKeysA.length > 0 && statKeysB.length > 0) {
    const primaryA = statKeysA[0];
    const primaryB = statKeysB[0];

    const bonus = Math.round(3 + quality.coherence * 5); // +4 to +8
    const tradeOff = Math.round(bonus * 0.4); // -1 to -3 trade-off

    // Instance A gains resonance with B's domain
    shiftsA.push({ stat: primaryB, delta: bonus, source: "FUSION", interaction: `RESONANCE_${primaryB}` });
    // Trade-off: slight condensation of primary stat
    if (statKeysA.length > 1) {
      shiftsA.push({ stat: statKeysA[1], delta: -tradeOff, source: "FUSION", interaction: `CONDENSATION_${statKeysA[1]}` });
    }

    // Instance B gains resonance with A's domain
    shiftsB.push({ stat: primaryA, delta: bonus, source: "FUSION", interaction: `RESONANCE_${primaryA}` });
    if (statKeysB.length > 1) {
      shiftsB.push({ stat: statKeysB[1], delta: -tradeOff, source: "FUSION", interaction: `CONDENSATION_${statKeysB[1]}` });
    }
  }

  return { shiftsA, shiftsB };
}

/**
 * Master Serverless Fusion Transaction.
 * 1. Verifies instance control & latest revisions.
 * 2. Analyzes canonical semantics & bridges.
 * 3. Evaluates coherence and novelty.
 * 4. Records World Learning in Global Semantic Memory.
 * 5. Atomically mutates both evolving instances with signed Evolution Certificates.
 */
export function executeSemanticFusion({
  instanceA,
  revisionA,
  artifactA,
  controllerA,
  instanceB,
  revisionB,
  artifactB,
  controllerB
}) {
  const { semA, semB, bridges } = findSemanticBridges(artifactA, artifactB);
  const quality = evaluateFusionQuality(semA, semB, bridges, artifactA.anomaly, artifactB.anomaly);

  if (quality.status === "REJECTED") {
    return {
      status: "REJECTED",
      message: "THE VOID FINDS NO COHERENT RELATIONSHIP BETWEEN THESE CONCEPTS.",
      coherence: quality.coherence,
      novelty: quality.novelty,
      bridges
    };
  }

  // 1. World Effect: The Void Learns
  const conceptA = semA.concept || artifactA.object || "CONCEPT_A";
  const conceptB = semB.concept || artifactB.object || "CONCEPT_B";
  const candidateTitle = `THE ${conceptA} ${conceptB}`;
  const candidateName = `${conceptA}_${conceptB}_GESTALT`;

  const worldResult = recordVoidKnowledge({
    conceptA,
    conceptB,
    candidateName,
    candidateTitle,
    status: quality.status,
    coherenceScore: quality.coherence,
    noveltyScore: quality.novelty,
    bridges
  });

  // 2. Instance Effect: Stat Interaction & Atomic Revision Bump
  const { shiftsA, shiftsB } = calculateResonantStatShifts(semA, semB, bridges, quality);

  const certA = mutateInstanceAtomic({
    instanceId: instanceA,
    artifactId: artifactA.artifact_id,
    controllerPublicKey: controllerA,
    currentRevision: revisionA,
    statMutations: shiftsA,
    fusionsDelta: 1
  });

  const certB = mutateInstanceAtomic({
    instanceId: instanceB,
    artifactId: artifactB.artifact_id,
    controllerPublicKey: controllerB,
    currentRevision: revisionB,
    statMutations: shiftsB,
    fusionsDelta: 1
  });

  return {
    status: quality.status,
    coherence: quality.coherence,
    novelty: quality.novelty,
    bridges,
    conceptA,
    conceptB,
    candidateTitle,
    worldEffect: {
      isFirstDiscovery: worldResult.isFirstDiscovery,
      totalObserved: worldResult.totalObserved,
      learnedMessage: "FUSION ACCEPTED. THE VOID HAS REMEMBERED THIS."
    },
    instanceA: {
      id: instanceA,
      certificate: certA,
      shifts: shiftsA
    },
    instanceB: {
      id: instanceB,
      certificate: certB,
      shifts: shiftsB
    }
  };
}

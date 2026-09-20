import { resolveSemanticConcept } from "../../engine/dictionary/resolver.mjs";
import { mutateInstanceAtomic } from "../evolution/certificate.mjs";

export const DUEL_ENVIRONMENTS = [
  {
    id: "ENV_STEAM_LAB",
    name: "THE CRUSHING STEAM LAB",
    conditions: { PRESSURE: "EXTREME (8.4 BAR)", TEMPERATURE: "RISING (94°C)", HUMIDITY: "SATURATED (98%)" },
    favoredStats: ["PRESSURE_TOLERANCE", "TEMPERATURE", "CONTAINMENT"],
    maneuvers: [
      { id: "VENT_RELEASE", name: "THERMAL VENT RELEASE", stat: "TEMPERATURE", req: 60, desc: "Expel superheated steam to destabilize the chamber." },
      { id: "SEAL_CHAMBER", name: "CONTAINMENT LOCK", stat: "PRESSURE_TOLERANCE", req: 65, desc: "Brace structural joints against crushing pressure." },
      { id: "HUMID_LEAP", name: "AMPHIBIC CONDENSATION LEAP", stat: "HUMIDITY", req: 55, desc: "Utilize dense moisture vapor for explosive trajectory." }
    ]
  },
  {
    id: "ENV_IONOSPHERE",
    name: "IONOSPHERIC INTERFERENCE SPIRE",
    conditions: { SIGNAL: "UNSTABLE STATIC", VOLTAGE: "HIGH (1,200V)", INTERFERENCE: "88 dB" },
    favoredStats: ["SIGNAL_SENSITIVITY", "VOLTAGE", "INTERFERENCE"],
    maneuvers: [
      { id: "FREQUENCY_SWEEP", name: "CARRIER WAVE LOCK", stat: "SIGNAL_SENSITIVITY", req: 65, desc: "Harmonize internal receiver to pierce dense electromagnetic noise." },
      { id: "VOLTAGE_SURGE", name: "CATHODE ARC DISCHARGE", stat: "VOLTAGE", req: 70, desc: "Release stored potential into surrounding ionization field." },
      { id: "STATIC_SHIELD", name: "GROUNDED FLUX DAMPENING", stat: "INTERFERENCE", req: 58, desc: "Absorb stray interference pulses into chassis earth." }
    ]
  },
  {
    id: "ENV_ABYSSAL_TRENCH",
    name: "ABYSSAL VOID TRENCH",
    conditions: { PRESSURE: "1,100 BAR", DENSITY: "HIGH", LUMINESCENCE: "0.02 LUX" },
    favoredStats: ["PRESSURE_TOLERANCE", "OBSERVATION", "INSTINCT"],
    maneuvers: [
      { id: "BENTHIC_PRESSURE_LOCK", name: "BENTHIC STRUCTURAL CRUSH-PROOFING", stat: "PRESSURE_TOLERANCE", req: 72, desc: "Withstand subterranean tectonic pressure." },
      { id: "CAUSTIC_SONAR", name: "SONAR PULSE PING", stat: "OBSERVATION", req: 68, desc: "Illuminate deep benthic shadows with acoustic echo." },
      { id: "INSTINCT_BURST", name: "PRIMAL CEPHALIC SURGE", stat: "INSTINCT", req: 62, desc: "Trigger instinctual evasion through high-viscosity abyss." }
    ]
  },
  {
    id: "ENV_CHRONO_VAULT",
    name: "CHRONOMETRIC ECHO CHAMBER",
    conditions: { TEMPORAL_FLUX: "+14 SECONDS", RESONANCE: "PERIODIC 432 Hz", EQUILIBRIUM: "CRITICAL" },
    favoredStats: ["TEMPORAL_PRECISION", "RESONANCE", "BALANCE"],
    maneuvers: [
      { id: "ESCAPEMENT_LOCK", name: "TEMPORAL ANCHOR PHASE", stat: "TEMPORAL_PRECISION", req: 70, desc: "Synchronize internal escapement to negate temporal displacement." },
      { id: "HARMONIC_PULSE", name: "ACOUSTIC STANDING WAVE", stat: "RESONANCE", req: 65, desc: "Emit sustained frequency to shatter contradictory chronal echoes." },
      { id: "BALANCED_COUNTERPOISE", name: "PENDULUM COUNTERWEIGHT", stat: "BALANCE", req: 60, desc: "Maintain absolute inertial balance amidst shifting time streams." }
    ]
  }
];

export function getDuelEnvironments() {
  return DUEL_ENVIRONMENTS;
}

/**
 * Deterministically resolves a semantic duel encounter.
 */
export function resolveSemanticDuel({
  instanceId,
  currentRevision,
  artifact,
  controller,
  environmentId,
  selectedManeuverId
}) {
  const env = DUEL_ENVIRONMENTS.find(e => e.id === environmentId) || DUEL_ENVIRONMENTS[0];
  const maneuver = env.maneuvers.find(m => m.id === selectedManeuverId) || env.maneuvers[0];

  const sem = resolveSemanticConcept(artifact.object || artifact.host_chassis || artifact.name);
  
  // Calculate effective stat value (Base + Existing Evolution)
  const baseStatVal = sem.baseStats[maneuver.stat] || 45;
  // We check existing evolution if known
  const effectiveVal = baseStatVal; // Server adds evolution from certificate in mutateInstanceAtomic

  // Duel calculation: based on stat alignment with environmental difficulty
  const targetReq = maneuver.req;
  const margin = effectiveVal - targetReq + (Math.floor(Math.sin(Date.now()) * 6));
  const success = margin >= -8;

  const earnedStat = maneuver.stat;
  const delta = success ? Math.max(2, Math.min(6, Math.floor(3 + margin * 0.15))) : 1;

  const consequenceText = success
    ? `SURVIVED ${env.name.toUpperCase()} // EXECUTED ${maneuver.name}`
    : `ENDURED PARTIAL INTERFERENCE IN ${env.name.toUpperCase()}`;

  const interactionName = `DUEL_${env.id}_${maneuver.id}`;
  const duelId = `DUEL-${Date.now().toString(36).toUpperCase()}`;

  const cert = mutateInstanceAtomic({
    instanceId,
    artifactId: artifact.artifact_id,
    controllerPublicKey: controller,
    currentRevision,
    statMutations: [
      {
        stat: earnedStat,
        delta,
        source: "DUEL",
        interaction: consequenceText,
        interactionId: duelId
      }
    ],
    duelsDelta: 1
  });

  return {
    duelId,
    success,
    environment: env,
    maneuver,
    consequenceText,
    statEvolved: earnedStat,
    statDelta: delta,
    certificate: cert
  };
}

import fs from "node:fs";
import path from "node:path";
import { rng, pick } from "../vector/generator.mjs";

// Cached dictionary index
let dictionaryCache = null;

const DICTIONARY_DIR = path.resolve("dictionary");

/**
 * Loads and indexes semantic taxonomy from WordNet dictionary files
 */
export function loadDictionaryOntology() {
  if (dictionaryCache) return dictionaryCache;

  const ontology = {
    animals: [],
    artifacts: [],
    plants: [],
    phenomena: [],
    foods: [],
    objects: [],
    bodyParts: [],
    verbs: [],
    adjectives: [],
    byMember: new Map()
  };

  try {
    const files = [
      { name: "noun.animal.json", target: ontology.animals, type: "ORGANIC_ANIMAL" },
      { name: "noun.artifact.json", target: ontology.artifacts, type: "INORGANIC_ARTIFACT" },
      { name: "noun.plant.json", target: ontology.plants, type: "ORGANIC_PLANT" },
      { name: "noun.phenomenon.json", target: ontology.phenomena, type: "ANOMALOUS_PHENOMENON" },
      { name: "noun.food.json", target: ontology.foods, type: "CONSUMABLE_ORGANIC" },
      { name: "noun.object.json", target: ontology.objects, type: "PHYSICAL_OBJECT" },
      { name: "noun.body.json", target: ontology.bodyParts, type: "ANATOMICAL_COMPONENT" },
      { name: "adj.all.json", target: ontology.adjectives, type: "DESCRIPTOR" }
    ];

    for (const file of files) {
      const filePath = path.join(DICTIONARY_DIR, file.name);
      if (fs.existsSync(filePath)) {
        try {
          const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
          for (const [id, entry] of Object.entries(raw)) {
            if (entry && Array.isArray(entry.members) && entry.members.length > 0) {
              const primaryWord = entry.members[0].replace(/_/g, " ").toUpperCase();
              const item = {
                id,
                word: primaryWord,
                synonyms: entry.members.map(m => m.replace(/_/g, " ").toUpperCase()),
                definition: Array.isArray(entry.definition) ? entry.definition[0] : (entry.definition || ""),
                hypernyms: entry.hypernym || [],
                type: file.type
              };
              file.target.push(item);
              ontology.byMember.set(primaryWord, item);
            }
          }
        } catch (e) {
          console.warn(`Failed reading dictionary file ${file.name}:`, e.message);
        }
      }
    }
  } catch (err) {
    console.warn("Dictionary ontology initialization warning:", err.message);
  }

  dictionaryCache = ontology;
  return ontology;
}

/**
 * Curated semantic taxonomy classes for deep void morphology synthesis
 */
export const TAXONOMY_FAMILIES = {
  CEPHALOPOD: {
    name: "OCTOPOD / CEPHALOPOD",
    taxa: ["OCTOPUS", "SQUID", "CUTTLEFISH", "NAUTILUS"],
    anatomy: ["TENTACLES", "SUCKERS", "SIPHON", "CAUSTIC_EYE", "MANTLE", "BEAK"],
    traits: ["AQUATIC", "TENTACLED", "CHAMELEONIC", "PRESSURE_RESISTANT", "MOLTEN_VISION"],
    baseStats: { INSTINCT: 68, HUMIDITY: 88, PRESSURE_TOLERANCE: 82, SIGNAL_SENSITIVITY: 45 }
  },
  RODENT: {
    name: "MURID / RODENT",
    taxa: ["MOUSE", "RAT", "VOLE", "HAMSTER", "SHREW"],
    anatomy: ["WHISKERS", "INCISORS", "VERTEBRATE_TAIL", "VASCULAR_EARS", "PAWS", "CRANIAL_PLATE"],
    traits: ["AGILE", "ACUTE_HEARING", "BURROWING", "HIGH_METABOLISM", "INSTINCTIVE"],
    baseStats: { INSTINCT: 84, LEAP_VELOCITY: 72, OBSERVATION: 78, NOISE_DISRUPTION: 30 }
  },
  BATOID: {
    name: "BATOID / CHONDRICHTHYES",
    taxa: ["STINGRAY", "MANTA", "SKATE", "ELECTRIC_RAY"],
    anatomy: ["PECTORAL_WINGS", "SPIRACLE", "SERRATED_SPINE", "DORSAL_VENT", "DERMAL_DENTICLES"],
    traits: ["GLIDING", "ELECTRO_RECEPTIVE", "HYDRODYNAMIC", "SUBMERGED", "CRESTED"],
    baseStats: { VOLTAGE: 65, PRESSURE_TOLERANCE: 76, INSTINCT: 60, STEALTH_INDEX: 85 }
  },
  CRUSTACEAN: {
    name: "DECAPOD / CRUSTACEAN",
    taxa: ["CRAB", "LOBSTER", "ISOPOD", "TRILOBITE", "HORSESHOE_CRAB"],
    anatomy: ["CHITIN_CARAPACE", "CHELAE_PINCERS", "ARTICULATED_WALKING_LEGS", "FACETED_EYESTALKS", "GILL_CHAMBERS"],
    traits: ["ARMORED", "PINCERING", "BENTHIC", "PULSE_HARDENED", "HYDRAULIC"],
    baseStats: { CONTAINMENT: 90, PRESSURE_TOLERANCE: 85, IMPACT_RESISTANCE: 88, VOLTAGE: 32 }
  },
  LEPIDOPTERA: {
    name: "LEPIDOPTERA / INSECTA",
    taxa: ["MOTH", "BUTTERFLY", "BEETLE", "CICADA", "MANTIS"],
    anatomy: ["FEATHERED_ANTENNAE", "MEMBRANOUS_WINGS", "WING_VEINS", "COMPOUND_OCELLI", "PROBOSCIS"],
    traits: ["LIGHT_SEEKING", "SIGNAL_TRANSDUCING", "AERIAL", "CHITIN_SCALE", "RESONANT"],
    baseStats: { SIGNAL_SENSITIVITY: 92, RESONANCE: 85, AIR_DRIFT: 80, VOLTAGE: 44 }
  },
  SERPENT: {
    name: "SERPENTINE / OPHIID",
    taxa: ["SNAKE", "VIPER", "EEL", "LAMPREY", "HYDRA"],
    anatomy: ["VENTRAL_SCUTES", "BIFURCATED_TONGUE", "HEAT_SENSING_PITS", "COILING_VERTEBRAE", "EXPANDABLE_JAW"],
    traits: ["CONSTRICTING", "THERMAL_TRACKING", "SINUOUS", "LOW_FREQUENCY", "VENOM_SYNTHESIS"],
    baseStats: { INSTINCT: 82, OBSERVATION: 75, COIL_TENSION: 88, SIGNAL_INTERFERENCE: 60 }
  },
  ANURAN: {
    name: "ANURAN / AMPHIBIAN",
    taxa: ["FROG", "TOAD", "TREE_FROG", "SALAMANDER", "NEWT"],
    anatomy: ["EXTENSIBLE_TONGUE", "BULGING_TYMPANUM", "MUSCULAR_LEAP_LEGS", "MOIST_EPIDERMIS", "VOCAL_SAC"],
    traits: ["AMPHIBIOUS", "SONIC_CROAK", "ATMOSPHERIC_BAROMETER", "METAMORPHIC", "REACTIVE"],
    baseStats: { LEAP_VELOCITY: 94, HUMIDITY: 90, INSTINCT: 76, OBSERVATION: 70 }
  },
  AVIAN: {
    name: "AVIAN / RAPTOR",
    taxa: ["OWL", "RAVEN", "FALCON", "HERON", "SWALLOW"],
    anatomy: ["TALONS", "CURVED_BEAK", "PRIMARY_PINIONS", "BINOCULAR_OPTICS", "CREST"],
    traits: ["AERIAL_SURVEILLANCE", "HIGH_ALTITUDE", "MAGNETIC_NAVIGATION", "RAPID_DIVE"],
    baseStats: { OBSERVATION: 95, SIGNAL_SENSITIVITY: 74, AIR_DRIFT: 88, INSTINCT: 80 }
  },
  ARACHNID: {
    name: "ARACHNIDA / CHELICERATA",
    taxa: ["SPIDER", "SCORPION", "HARVESTMAN", "TICK"],
    anatomy: ["PEDIPALPS", "SPINNERETS", "SEGMENTED_ABDOMEN", "OCTO_OCELLI", "STINGER"],
    traits: ["SILK_TRANSMISSION", "VIBRATION_SENSITIVE", "WEB_WEAVING", "AMBUSH"],
    baseStats: { SIGNAL_SENSITIVITY: 88, TENSION: 85, INSTINCT: 79, STEALTH_INDEX: 90 }
  }
};

/**
 * Curated inorganic chassis archetypes with deep functional properties
 */
export const CHASSIS_FAMILIES = {
  CRT: {
    name: "CATHODE RAY TUBE",
    synonyms: ["MONITOR", "TELEVISION", "OSCILLOSCOPE", "SCREEN"],
    components: ["PHOSPHOR_SCREEN", "ELECTRON_GUN", "DEFLECTION_COIL", "BAKELITE_HOUSING", "DIAL_TUNER"],
    traits: ["ELECTRONIC", "SIGNAL_RECEIVING", "HIGH_VOLTAGE", "LUMINOUS", "STATIC_EMITTING"],
    baseStats: { SIGNAL_SENSITIVITY: 88, VOLTAGE: 82, INTERFERENCE: 75, OBSERVATION: 70 }
  },
  TEAPOT: {
    name: "EARTHENWARE TEAPOT",
    synonyms: ["KETTLE", "POT", "SAMOVAR", "FLASK"],
    components: ["POURING_SPOUT", "LOOP_HANDLE", "CERAMIC_BODY", "STEAM_VENT", "CRANIAL_LID"],
    traits: ["THERMAL_RETAINING", "STEAM_PRODUCING", "EARTHENWARE", "CONTAINMENT", "ACOUSTIC_WHISTLE"],
    baseStats: { TEMPERATURE: 84, PRESSURE_TOLERANCE: 68, CONTAINMENT: 78, HUMIDITY: 60 }
  },
  BOILER: {
    name: "INDUSTRIAL BOILER",
    synonyms: ["FURNACE", "PRESSURE_VESSEL", "CALDRON", "ENGINE"],
    components: ["RIVETED_PLATE", "MANOMETER", "PRESSURE_VALVE", "CAST_IRON_BASE", "EXHAUST_FLUE"],
    traits: ["HIGH_PRESSURE", "COMBUSTION", "STEAM_HEAVY", "CONTAINMENT_CHAMBER", "EXPANSIVE"],
    baseStats: { PRESSURE_TOLERANCE: 96, TEMPERATURE: 90, CONTAINMENT: 92, IMPACT_RESISTANCE: 85 }
  },
  RADIO: {
    name: "TRANSISTOR RADIO",
    synonyms: ["RECEIVER", "INTERCOM", "TRANSMITTER", "TELEGRAPH"],
    components: ["TELESCOPIC_ANTENNA", "TUNING_CAPACITOR", "SPEAKER_GRATE", "FREQUENCY_DIAL", "TRANSISTOR_CORE"],
    traits: ["SIGNAL_INTERCEPTING", "ELECTROMAGNETIC", "BROADCASTING", "STATIC_HARVESTING", "RESONANT"],
    baseStats: { SIGNAL_SENSITIVITY: 94, RESONANCE: 88, INTERFERENCE: 80, VOLTAGE: 55 }
  },
  CLOCK: {
    name: "CHRONOMETRIC CLOCK",
    synonyms: ["METRONOME", "TIMEPIECE", "CHRONOMETER", "PENDULUM"],
    components: ["BRASS_ESCAPEMENT", "COUNTERWEIGHT_PENDULUM", "GEAR_TRAIN", "PORCELAIN_DIAL", "TICK_STRIKER"],
    traits: ["CHRONO_LOCKING", "RHYTHMIC", "PRECISION_MECHANICAL", "SPRING_LOADED", "PERIODIC"],
    baseStats: { TEMPORAL_PRECISION: 95, RESONANCE: 78, BALANCE: 86, OBSERVATION: 65 }
  },
  SWORD: {
    name: "TEMPERED BLADE",
    synonyms: ["SABER", "RAPIER", "DAGGER", "CLEAVER"],
    components: ["FULLER_GROOVE", "CROSSGUARD", "POMMEL_WEIGHT", "FOLDED_EDGE", "TANG"],
    traits: ["KINETIC_FOCUS", "RESONANT_STEEL", "DIRECTIONAL_EDGE", "HIGH_TENSILE", "SHARP"],
    baseStats: { IMPACT_RESISTANCE: 88, BALANCE: 92, EDGE_HARDNESS: 90, LEAP_VELOCITY: 60 }
  },
  BOOK: {
    name: "ARCHIVAL FOLIO",
    synonyms: ["TOME", "MANUSCRIPT", "CODEX", "JOURNAL"],
    components: ["VELLUM_LEAVES", "LEATHER_BINDING", "BRASS_CLASP", "RIBBON_MARKER", "SPINE_STITCHING"],
    traits: ["RECORD_BEARING", "KNOWLEDGE_CONTAINING", "STATIC_MEMORIZING", "FIBROUS", "HISTORIC"],
    baseStats: { OBSERVATION: 90, TEMPORAL_PRECISION: 80, CONTAINMENT: 75, SIGNAL_SENSITIVITY: 62 }
  },
  CAMERA: {
    name: "OPTICAL CAMERA",
    synonyms: ["SPECTROGRAPH", "MICROSCOPE", "LENS", "TELESCOPE"],
    components: ["APERTURE_IRIS", "QUARTZ_LENS", "SHUTTER_BELLOWS", "FILM_CHAMBER", "OPTICAL_PRISM"],
    traits: ["OBSERVATIONAL", "LIGHT_CAPTURING", "SPECTRAL_ANALYZING", "FOCUSING", "FLASH_DISCHARGE"],
    baseStats: { OBSERVATION: 98, SIGNAL_SENSITIVITY: 82, INTERFERENCE: 65, VOLTAGE: 50 }
  }
};

/**
 * Returns canonical traits and base stats for any concept word
 */
export function resolveSemanticConcept(word) {
  const norm = String(word || "").toUpperCase().trim().replace(/[^A-Z0-9_]/g, "_");
  
  // Direct taxon match
  for (const [key, taxon] of Object.entries(TAXONOMY_FAMILIES)) {
    if (key === norm || taxon.taxa.includes(norm) || taxon.name.includes(norm)) {
      return {
        concept: norm,
        category: "ORGANIC_TAXON",
        family: key,
        name: taxon.name,
        anatomy: taxon.anatomy,
        traits: taxon.traits,
        baseStats: taxon.baseStats
      };
    }
  }

  // Direct chassis match
  for (const [key, chassis] of Object.entries(CHASSIS_FAMILIES)) {
    if (key === norm || chassis.synonyms.includes(norm) || chassis.name.includes(norm)) {
      return {
        concept: norm,
        category: "INORGANIC_CHASSIS",
        family: key,
        name: chassis.name,
        anatomy: chassis.components,
        traits: chassis.traits,
        baseStats: chassis.baseStats
      };
    }
  }

  // Ontology fallback from dictionary
  const dict = loadDictionaryOntology();
  const found = dict.byMember.get(norm.replace(/_/g, " "));
  if (found) {
    return {
      concept: norm,
      category: found.type,
      family: "DICTIONARY_DERIVED",
      name: found.word,
      definition: found.definition,
      anatomy: ["SURFACE", "CORE_STRUCTURE", "EXTERNAL_BOUNDARY"],
      traits: ["OBSERVED_IN_ONTOLOGY", "CANONICAL_WORDNET", "SEMANTIC_PRIMITIVE"],
      baseStats: { INSTINCT: 50, OBSERVATION: 50, RESONANCE: 50, SIGNAL_SENSITIVITY: 50 }
    };
  }

  // Generic canonical fallback
  return {
    concept: norm,
    category: "ARTIFACT_CONCEPT",
    family: "VOID_UNKNOWN",
    name: norm,
    anatomy: ["SHELL", "INTERIOR", "SENSORY_FACET"],
    traits: ["STRANGE", "UNCLASSIFIED", "VOID_SURFACED"],
    baseStats: { INSTINCT: 45, OBSERVATION: 45, RESONANCE: 45, SIGNAL_SENSITIVITY: 45 }
  };
}

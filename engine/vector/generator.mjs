// Elevated Morphological Vector Engine v4.0
// Seamlessly fuses inorganic chassis & organic taxa into continuous, authoritative vector gestalts.
// Directly implements the continuous-path, high-craft sculpting established in elevated_5_6_demo and elevated_morphology_demo.

export function rng(seed) {
  let a = (seed >>> 0) || 1;
  return () => {
    a += 0x6D2B79F5;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

// Raw system color mapping for all 46 archive palettes
export const SYSTEM_COLOR_MAP = {
  ARCHIVE_BEIGE: ["#171615","#625a4d","#a89b80","#ded1ad","#8d5d3c"],
  TERMINAL_GREEN: ["#07110b","#183c27","#3d7950","#91c78b","#d5c56a"],
  IRON: ["#111418","#394149","#77818a","#c0c7cb","#8a6139"],
  MARSH_GREEN: ["#0c130c","#30452b","#657a42","#a1aa68","#d4bd68"],
  BONE: ["#171511","#5d584a","#aaa28b","#e1dac0","#805c3d"],
  INDUSTRIAL_GREY: ["#101214","#363c40","#737b7d","#bec2bc","#c88c42"],
  COBALT: ["#0b1019","#18365d","#32659a","#82a9c8","#d4aa5b"],
  OBSIDIAN: ["#09090c","#25232e","#4c465a","#8a8197","#b87554"],
  PHOSPHOR_AMBER: ["#191305","#5b4210","#aa7b20","#f1ca5a","#fff2aa"],
  DEAD_BLUE: ["#0b1015","#233746","#456a7d","#86adbd","#c5dfd7"],
  STATIC_GREY: ["#101114","#41444a","#858990","#c4c8cc","#e0b45b"],
  EMERGENCY_RED: ["#1a080b","#5c1720","#a8343d","#ed7270","#ffd29a"],
  NIGHT_VIOLET: ["#100b19","#31234d","#62438d","#aa87d8","#e0b6ff"],
  OXIDIZED_BRONZE: ["#151512","#4f4d32","#817a48","#b9ab65","#78a898"],
  DUST_GREY: ["#151619","#46474b","#797b80","#b9bbc0","#c19768"],
  CEREMONIAL_RED: ["#1b090b","#5d1d1b","#963a2e","#d87a54","#e6c66e"],
  BONE_IVORY: ["#181611","#5c5848","#a69d80","#ddd4b9","#a6734d"],
  MUSEUM_GREEN: ["#0c1715","#284940","#4d7965","#91b49a","#d2bb69"],
  TOXIC_LIME: ["#0b1308","#29491c","#5c8f31","#b3df56","#efff9a"],
  MUD_BROWN: ["#17110d","#4b3324","#80563a","#b88b60","#d7c679"],
  COLD_BLUE: ["#09131a","#214457","#417b95","#8fc0d2","#d4edda"],
  PALE_FLESH: ["#1b1212","#5d4140","#a87770","#d9aea0","#f3d783"],
  MOSS: ["#0d140b","#31452a","#5e7540","#9cab62","#d9ca71"],
  ENAMEL_CREAM: ["#161511","#545044","#99917d","#ddd4ba","#b95d4b"],
  BOTTLE_GREEN: ["#091612","#1e4b3b","#397b61","#75b796","#d7cb75"],
  CLAY_RED: ["#1c100c","#603021","#9b5438","#d28a61","#e6c675"],
  SMOKE: ["#111215","#3c4148","#6c737c","#b6bdc3","#8ca4ba"],
  MILK_GLASS: ["#10171a","#385158","#719299","#bcd9d3","#f1e4aa"],
  BRASS: ["#191407","#59451a","#97752b","#d5b95c","#f7e59a"],
  RUST: ["#1b0f0a","#66321d","#9d512c","#c97b45","#e0b46a"],
  WORKSHOP_BLUE: ["#09121c","#203f5a","#3d7198","#78b0cb","#f0c66c"],
  BLACKENED_STEEL: ["#0b0d10","#2d343b","#59636c","#99a4a8","#c48c58"],
  SAFETY_YELLOW: ["#181504","#5d4e0b","#a88a17","#e5ca42","#fff1a0"],
  BLOOD_RED: ["#190708","#5a161c","#942d36","#d55c5d","#efb06d"],
  CEREMONIAL_GOLD: ["#181204","#584114","#967125","#d4af4e","#fff0a5"],
  FROST: ["#0a1118","#254455","#528198","#9bc9d8","#e7fbff"],
  ASH: ["#121213","#444347","#77757a","#b7b4b8","#d4a46a"],
  FOSSIL_BROWN: ["#17130f","#51412c","#816646","#b69a70","#d6c77d"],
  CHALK: ["#171716","#53524e","#929087","#d5d2c5","#b7a46a"],
  PEAT: ["#15100c","#4d3523","#765039","#a77b55","#c8b66f"],
  OLD_IVORY: ["#181611","#5c5748","#a99f81","#ded4b7","#b48858"],
  CONTROL_GREEN: ["#08150e","#1d4b31","#3a8050","#7fc98a","#d8ed93"],
  WARNING_ORANGE: ["#1a0e05","#643114","#a9571b","#e4943f","#ffe08a"],
  BEIGE: ["#171511","#514b3f","#8b806b","#c7bda2","#c38a58"],
  BLACK: ["#08090a","#24272b","#4c5258","#899198","#c5a46a"],
  LAB_BLUE: ["#07121c","#1a3b59","#32678e","#78b4d1","#d4e8a0"]
};

// Generates rich, calibrated 10-layer vector lighting values from any palette name
export function buildVectorPalette(paletteName) {
  const c = SYSTEM_COLOR_MAP[paletteName] || SYSTEM_COLOR_MAP.ARCHIVE_BEIGE;
  return {
    name: paletteName,
    dark: c[0],
    shade: c[1],
    base: c[2],
    light: c[3],
    highlight: "#ffffff",
    accent: c[4],
    organ: c[1],
    secondary: c[3],
    cork: c[4],
    brass: c[4]
  };
}

// All 46 high-contrast vector themes
export const PALETTE_THEMES = Object.keys(SYSTEM_COLOR_MAP).map(k => buildVectorPalette(k));

// Curated flagship themes for standalone previews
export const FLAGSHIP_PALETTES = [
  {
    name: "ABYSSAL SEAGLASS",
    dark: "#101417",
    base: "#3a645d",
    light: "#56877e",
    shade: "#25433e",
    accent: "#d8a436",
    highlight: "#e0f2ee",
    organ: "#427269",
    secondary: "#94baa8",
    cork: "#9e6c38",
    brass: "#d69e42"
  },
  {
    name: "STONEWARE & SINEW",
    dark: "#1c1917",
    base: "#8c765c",
    light: "#a48d71",
    shade: "#6f5b45",
    accent: "#e2b258",
    highlight: "#f2ece0",
    organ: "#987d65",
    secondary: "#b87d74",
    cork: "#8e6727",
    brass: "#d4a755"
  },
  {
    name: "CAST-IRON & STEAM",
    dark: "#121517",
    base: "#4c5553",
    light: "#65726f",
    shade: "#323837",
    accent: "#c64634",
    highlight: "#e6eeec",
    organ: "#6c3b28",
    secondary: "#96c4ba",
    cork: "#5a4238",
    brass: "#b88a44"
  },
  {
    name: "VERDIGRIS CHITIN",
    dark: "#0d1514",
    base: "#486e63",
    light: "#638f83",
    shade: "#2f4d44",
    accent: "#e0ab4c",
    highlight: "#e6f5f0",
    organ: "#9c6052",
    secondary: "#78a89b",
    cork: "#7a5538",
    brass: "#cfa142"
  },
  {
    name: "OBSIDIAN & PHOSPHOR",
    dark: "#0b0d12",
    base: "#383d47",
    light: "#535966",
    shade: "#23262e",
    accent: "#64d8a8",
    highlight: "#edf2fa",
    organ: "#8c5ca8",
    secondary: "#92b4d4",
    cork: "#684e3d",
    brass: "#7fb3a8"
  },
  {
    name: "AMBER & BAKELITE",
    dark: "#18110b",
    base: "#78533b",
    light: "#996d4e",
    shade: "#543926",
    accent: "#d99338",
    highlight: "#faebda",
    organ: "#a8543b",
    secondary: "#dca072",
    cork: "#966236",
    brass: "#e0ab46"
  },
  {
    name: "PORCELAIN & CARMINE",
    dark: "#14151a",
    base: "#828994",
    light: "#a2aab8",
    shade: "#5d636e",
    accent: "#c9424e",
    highlight: "#f4f7fb",
    organ: "#b2626e",
    secondary: "#dca8b2",
    cork: "#7d5b43",
    brass: "#d8b258"
  },
  {
    name: "CATHODE EMERALD",
    dark: "#09120e",
    base: "#284d3b",
    light: "#3d6e55",
    shade: "#183326",
    accent: "#72f07d",
    highlight: "#e9faee",
    organ: "#4a946b",
    secondary: "#70c294",
    cork: "#645039",
    brass: "#a5d852"
  }
];

// Backwards-compatible taxonomy registry
export const HOST_BODIES = [
  { id: "BOTTLE", name: "BOTTLE", classification: "VESSEL", archetype: "VESSEL_OCTOPUS" },
  { id: "TEAPOT", name: "TEAPOT", classification: "VESSEL", archetype: "VESSEL_RODENT" },
  { id: "IRON", name: "IRON", classification: "APPLIANCE", archetype: "WEDGE_BATOID" },
  { id: "TYPEWRITER", name: "TYPEWRITER", classification: "MACHINE", archetype: "CHASSIS_CRUSTACEAN" },
  { id: "RADIO", name: "RADIO", classification: "DEVICE", archetype: "DEVICE_LEPIDOPTERA" },
  { id: "CRT", name: "CRT", classification: "DEVICE", archetype: "CHASSIS_SERPENT" },
  { id: "CLOCK", name: "CLOCK", classification: "DEVICE", archetype: "AMPHIBIAN_MONOLITH" },
  { id: "BOOK", name: "BOOK", classification: "RELIC", archetype: "DEVICE_LEPIDOPTERA" }
];

export const ORGANIC_TAXA = [
  { id: "CEPHALOPOD", taxonName: "OCTOPOD / CEPHALOPOD", archetype: "VESSEL_OCTOPUS" },
  { id: "MURID", taxonName: "MURID / RODENT", archetype: "VESSEL_RODENT" },
  { id: "BATOID", taxonName: "BATOID / CHONDRICHTHYES", archetype: "WEDGE_BATOID" },
  { id: "CRUSTACEAN", taxonName: "DECAPOD / CRUSTACEAN", archetype: "CHASSIS_CRUSTACEAN" },
  { id: "LEPIDOPTERA", taxonName: "LEPIDOPTERA / INSECTA", archetype: "DEVICE_LEPIDOPTERA" },
  { id: "OPHIID", taxonName: "SERPENTINE / OPHIID", archetype: "CHASSIS_SERPENT" },
  { id: "ANURAN", taxonName: "ANURAN / AMPHIBIAN", archetype: "AMPHIBIAN_MONOLITH" }
];

export function renderJointSeam() {
  return ""; // Incorporated directly into continuous master geometries
}

// ============================================================================
// ARCHETYPE 1: THE BOTTLED DEEP (Octopod Flask / Vessel Siphon)
// Inspired directly by Subject 5 in elevated_5_6_demo:
// Continuous neck-lip -> flaring shoulder -> cylindrical visceral mantle ->
// continuous branching into 8 muscular tentacles with sucker rows and caustic eye.
// ============================================================================
function renderVesselOctopus(bx, by, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const glassBase = pal.base;
  const glassLight = pal.light;
  const glassShade = pal.shade;
  const glassSpec = pal.highlight;
  const suckerRim = pal.secondary || "#94baa8";
  const irisColor = pal.accent;
  const corkBase = pal.cork || "#9e6c38";
  const brassRing = pal.brass || "#d69e42";

  const neckH = 30 + r() * 10;
  const shoulderW = 60 + r() * 12;
  const waistW = 45 + r() * 10;
  const tentacleReach = 25 + r() * 15;

  // Ground Ambient Occlusion Shadow
  out += `
    <ellipse cx="${bx}" cy="${by + 110}" rx="95" ry="12" fill="#05070a" opacity="0.95"/>
    <ellipse cx="${bx}" cy="${by + 110}" rx="60" ry="6" fill="#020304" opacity="0.98"/>
  `;

  // Rear Tentacles (drawn behind the glass mantle)
  out += `
    <path d="M ${bx - 35} ${by + 60} C ${bx - 80} ${by + 65} ${bx - 110} ${by + 95} ${bx - 100} ${by + 108} C ${bx - 90} ${by + 115} ${bx - 75} ${by + 105} ${bx - 65} ${by + 88}"
          fill="none" stroke="${dark}" stroke-width="11" stroke-linecap="round"/>
    <path d="M ${bx - 35} ${by + 60} C ${bx - 80} ${by + 65} ${bx - 110} ${by + 95} ${bx - 100} ${by + 108} C ${bx - 90} ${by + 115} ${bx - 75} ${by + 105} ${bx - 65} ${by + 88}"
          fill="none" stroke="${glassShade}" stroke-width="8" stroke-linecap="round"/>

    <path d="M ${bx + 35} ${by + 60} C ${bx + 80} ${by + 65} ${bx + 110} ${by + 95} ${bx + 100} ${by + 108} C ${bx + 90} ${by + 115} ${bx + 75} ${by + 105} ${bx + 65} ${by + 88}"
          fill="none" stroke="${dark}" stroke-width="11" stroke-linecap="round"/>
    <path d="M ${bx + 35} ${by + 60} C ${bx + 80} ${by + 65} ${bx + 110} ${by + 95} ${bx + 100} ${by + 108} C ${bx + 90} ${by + 115} ${bx + 75} ${by + 105} ${bx + 65} ${by + 88}"
          fill="none" stroke="${glassShade}" stroke-width="8" stroke-linecap="round"/>
  `;

  // Continuous Master Path: Glass Vessel & Siphon Mantle branching directly into 8 tentacles
  const lipY = by - 85;
  const shoulderY = lipY + neckH;
  const bellyY = by + 20;

  out += `
    <!-- Continuous Master Mantle-Tentacle Silhouette -->
    <path d="M ${bx - 18} ${lipY}
             L ${bx + 18} ${lipY}
             L ${bx + 18} ${shoulderY}
             C ${bx + 35} ${shoulderY + 10} ${bx + shoulderW} ${by - 10} ${bx + shoulderW} ${bellyY}
             C ${bx + shoulderW + 3} ${by + 48} ${bx + waistW + 10} ${by + 72} ${bx + waistW} ${by + 84}
             C ${bx + waistW + 15} ${by + 96} ${bx + waistW + 35} ${by + 108} ${bx + waistW + 42} ${by + 118}
             C ${bx + waistW + 20} ${by + 116} ${bx + waistW + 5} ${by + 106} ${bx + waistW - 10} ${by + 94}
             C ${bx + waistW - 6} ${by + 106} ${bx + waistW - 5} ${by + 118} ${bx + waistW - 12} ${by + 124}
             C ${bx + waistW - 24} ${by + 115} ${bx + waistW - 28} ${by + 104} ${bx + waistW - 32} ${by + 92}
             C ${bx + 8} ${by + 92} ${bx + 4} ${by + 104} ${bx} ${by + 115}
             C ${bx - 4} ${by + 104} ${bx - 8} ${by + 92} ${bx - (waistW - 32)} ${by + 92}
             C ${bx - (waistW - 28)} ${by + 104} ${bx - (waistW - 24)} ${by + 115} ${bx - (waistW - 12)} ${by + 124}
             C ${bx - (waistW - 5)} ${by + 118} ${bx - (waistW - 6)} ${by + 106} ${bx - (waistW - 10)} ${by + 94}
             C ${bx - (waistW + 5)} ${by + 106} ${bx - (waistW + 20)} ${by + 116} ${bx - (waistW + 42)} ${by + 118}
             C ${bx - (waistW + 35)} ${by + 108} ${bx - (waistW + 15)} ${by + 96} ${bx - waistW} ${by + 84}
             C ${bx - (waistW + 10)} ${by + 72} ${bx - (shoulderW + 3)} ${by + 48} ${bx - shoulderW} ${bellyY}
             C ${bx - shoulderW} ${by - 10} ${bx - 35} ${shoulderY + 10} ${bx - 18} ${shoulderY} Z"
          fill="${glassBase}" stroke="${dark}" stroke-width="3.6" stroke-linejoin="round"/>

    <!-- Glass Interior Depth & Caustic Shadow -->
    <path d="M ${bx - shoulderW * 0.75} ${by + 15}
             C ${bx - shoulderW * 0.78} ${by + 52} ${bx - 30} ${by + 78} ${bx} ${by + 84}
             C ${bx + 30} ${by + 78} ${bx + shoulderW * 0.78} ${by + 52} ${bx + shoulderW * 0.75} ${by + 15}
             C ${bx + 32} ${by + 58} ${bx - 32} ${by + 58} ${bx - shoulderW * 0.75} ${by + 15} Z"
          fill="${glassShade}" opacity="0.6"/>

    <!-- Specular Glass Refraction Bands (Left Flank) -->
    <path d="M ${bx - shoulderW * 0.78} ${by - 6}
             C ${bx - shoulderW * 0.82} ${by + 24} ${bx - shoulderW * 0.7} ${by + 58} ${bx - 28} ${by + 78}"
          fill="none" stroke="${glassSpec}" stroke-width="3.5" stroke-linecap="round" opacity="0.65"/>
    <path d="M ${bx - shoulderW * 0.62} ${by - 16}
             C ${bx - shoulderW * 0.66} ${by + 16} ${bx - shoulderW * 0.55} ${by + 46} ${bx - 22} ${by + 64}"
          fill="none" stroke="${glassSpec}" stroke-width="1.3" stroke-linecap="round" opacity="0.45"/>

    <!-- Specular Shoulder Arc -->
    <path d="M ${bx - 14} ${shoulderY + 4} C ${bx - 26} ${shoulderY + 14} ${bx - shoulderW * 0.7} ${by - 24} ${bx - shoulderW * 0.75} ${by - 6}"
          fill="none" stroke="${glassSpec}" stroke-width="2.2" stroke-linecap="round" opacity="0.7"/>

    <!-- Cork Stopper & Brass Ring Collar -->
    <path d="M ${bx - 14} ${lipY} L ${bx - 12} ${lipY - 20} L ${bx + 12} ${lipY - 20} L ${bx + 14} ${lipY} Z"
          fill="${corkBase}" stroke="${dark}" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="${bx - 10}" y1="${lipY - 14}" x2="${bx - 4}" y2="${lipY - 14}" stroke="${dark}" stroke-width="1"/>
    <line x1="${bx + 3}" y1="${lipY - 9}" x2="${bx + 10}" y2="${lipY - 9}" stroke="${dark}" stroke-width="1"/>
    <rect x="${bx - 21}" y="${lipY - 2}" width="42" height="7" rx="2.5" fill="${brassRing}" stroke="${dark}" stroke-width="2"/>
    <ellipse cx="${bx}" cy="${lipY + 1.5}" rx="15" ry="1.2" fill="${glassSpec}" opacity="0.75"/>

    <!-- Sunken Ocular Cavity & Glowing Iris inside Glass Wall -->
    <ellipse cx="${bx}" cy="${by + 20}" rx="22" ry="24" fill="#0d1917" stroke="${dark}" stroke-width="2.4"/>
    <ellipse cx="${bx}" cy="${by + 20}" rx="18" ry="20" fill="${glassLight}"/>
    <ellipse cx="${bx}" cy="${by + 20}" rx="13" ry="15" fill="${irisColor}" stroke="${dark}" stroke-width="1.8"/>
    <ellipse cx="${bx}" cy="${by + 20}" rx="9" ry="12" fill="#7d5318"/>

    <!-- Deep-Sea W-Slit Cephalopod Pupil -->
    <path d="M ${bx - 9} ${by + 20} C ${bx - 5} ${by + 16} ${bx - 1} ${by + 23} ${bx} ${by + 20} C ${bx + 1} ${by + 17} ${bx + 5} ${by + 24} ${bx + 9} ${by + 20} L ${bx + 9} ${by + 22} C ${bx + 5} ${by + 26} ${bx + 1} ${by + 19} ${bx} ${by + 22} C ${bx - 1} ${by + 25} ${bx - 5} ${by + 18} ${bx - 9} ${by + 22} Z"
          fill="${dark}"/>
    <!-- Glass Specular Crescent over Eye -->
    <path d="M ${bx - 12} ${by + 8} C ${bx - 4} ${by + 5} ${bx + 8} ${by + 7} ${bx + 15} ${by + 14}"
          fill="none" stroke="${glassSpec}" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    <circle cx="${bx - 7}" cy="${by + 11}" r="1.5" fill="#ffffff"/>
  `;

  // Sucker Rows on the descending tentacles
  const suckers = [
    [bx - waistW - 25, by + 106, 3.8],
    [bx - waistW - 10, by + 98, 4.2],
    [bx - waistW + 4, by + 104, 3.5],
    [bx - 14, by + 96, 3.8],
    [bx + 14, by + 96, 3.8],
    [bx + waistW - 4, by + 104, 3.5],
    [bx + waistW + 10, by + 98, 4.2],
    [bx + waistW + 25, by + 106, 3.8]
  ];
  for (let [sx, sy, sr] of suckers) {
    out += `
      <circle cx="${sx}" cy="${sy}" r="${sr}" fill="${suckerRim}" stroke="${dark}" stroke-width="1.4"/>
      <circle cx="${sx}" cy="${sy}" r="${sr * 0.45}" fill="${dark}"/>
    `;
  }

  return out;
}

// ============================================================================
// ARCHETYPE 2: THE WHISPERING KETTLE (Rodent Earthenware / Tea Mouse)
// Inspired directly by Subject 1 in elevated_morphology_demo:
// Pot-belly stoneware body tapering seamlessly into a snouted muzzle with nostrils,
// vertebrate tail curling as handle with annular grip rings, cranial lid plate,
// vascular rodent ears with capillary veins, glassy rodent eye, and paws.
// ============================================================================
function renderVesselRodent(ox, oy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const chassisBase = pal.base;
  const chassisLight = pal.light;
  const chassisShade = pal.shade;
  const creamSpec = pal.highlight;
  const earPink = pal.secondary || "#b87d74";
  const brassHigh = pal.accent;
  const brassDeep = pal.cork || "#8e6727";

  // Ground Contact Shadow
  out += `
    <ellipse cx="${ox}" cy="${oy + 98}" rx="100" ry="12" fill="#05070a" opacity="0.95"/>
    <ellipse cx="${ox - 8}" cy="${oy + 98}" rx="65" ry="6" fill="#020304" opacity="0.98"/>
  `;

  // Vertebrate Mammalian Tail / Looping Handle issuing from rear ceramic wall
  out += `
    <!-- Rear Vertebrate Tail / Ceramic Handle -->
    <path d="M ${ox - 75} ${oy - 6} C ${ox - 135} ${oy - 42} ${ox - 150} ${oy + 48} ${ox - 96} ${oy + 78} C ${ox - 68} ${oy + 92} ${ox - 62} ${oy + 54} ${ox - 72} ${oy + 44}"
          fill="none" stroke="#100d0a" stroke-width="13" stroke-linecap="round"/>
    <path d="M ${ox - 75} ${oy - 6} C ${ox - 135} ${oy - 42} ${ox - 150} ${oy + 48} ${ox - 96} ${oy + 78} C ${ox - 68} ${oy + 92} ${ox - 62} ${oy + 54} ${ox - 72} ${oy + 44}"
          fill="none" stroke="${chassisShade}" stroke-width="9" stroke-linecap="round"/>
    <path d="M ${ox - 75} ${oy - 6} C ${ox - 135} ${oy - 42} ${ox - 150} ${oy + 48} ${ox - 96} ${oy + 78} C ${ox - 68} ${oy + 92} ${ox - 62} ${oy + 54} ${ox - 72} ${oy + 44}"
          fill="none" stroke="${dark}" stroke-width="1.8" stroke-linecap="round"/>
  `;

  // Annular segmental grip rings across the tail
  for (let t of [0.22, 0.38, 0.54, 0.70]) {
    let tx = ox - 132 + t * 55;
    let ty = oy - 14 + t * 80;
    out += `<line x1="${tx - 3.5}" y1="${ty - 4}" x2="${tx + 3.5}" y2="${ty + 4}" stroke="${dark}" stroke-width="1.4" stroke-linecap="round"/>`;
  }

  // Rear Hind Foot stance
  out += `
    <path d="M ${ox - 45} ${oy + 80} C ${ox - 58} ${oy + 90} ${ox - 65} ${oy + 102} ${ox - 48} ${oy + 100} C ${ox - 34} ${oy + 99} ${ox - 33} ${oy + 86} ${ox - 34} ${oy + 80} Z"
          fill="${chassisShade}" stroke="${dark}" stroke-width="2"/>
    <line x1="${ox - 59}" y1="${oy + 98}" x2="${ox - 52}" y2="${oy + 96}" stroke="${dark}" stroke-width="1.2"/>
  `;

  // Master Continuous Silhouette: Pot-belly stoneware + snout muzzle taper
  out += `
    <path d="M ${ox - 75} ${oy + 6}
             C ${ox - 78} ${oy - 52} ${ox - 38} ${oy - 82} ${ox + 8} ${oy - 82}
             C ${ox + 35} ${oy - 82} ${ox + 58} ${oy - 72} ${ox + 72} ${oy - 55}
             C ${ox + 86} ${oy - 41} ${ox + 106} ${oy - 31} ${ox + 134} ${oy - 17}
             C ${ox + 149} ${oy - 9} ${ox + 152} ${oy + 1} ${ox + 137} ${oy + 7}
             C ${ox + 115} ${oy + 16} ${ox + 97} ${oy + 20} ${ox + 86} ${oy + 38}
             C ${ox + 72} ${oy + 62} ${ox + 52} ${oy + 92} ${ox + 10} ${oy + 92}
             C ${ox - 45} ${oy + 92} ${ox - 75} ${oy + 65} ${ox - 75} ${oy + 6} Z"
          fill="${chassisBase}" stroke="${dark}" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Lower Belly Ambient Occlusion Shadow -->
    <path d="M ${ox - 68} ${oy + 28}
             C ${ox - 52} ${oy + 88} ${ox + 24} ${oy + 92} ${ox + 75} ${oy + 52}
             C ${ox + 52} ${oy + 82} ${ox + 10} ${oy + 86} ${ox - 45} ${oy + 82}
             C ${ox - 65} ${oy + 62} ${ox - 70} ${oy + 35} ${ox - 68} ${oy + 28} Z"
          fill="${chassisShade}" opacity="0.8"/>

    <!-- Specular Glaze Reflection Curve -->
    <path d="M ${ox - 55} ${oy - 45}
             C ${ox - 24} ${oy - 72} ${ox + 24} ${oy - 72} ${ox + 52} ${oy - 48}"
          fill="none" stroke="${creamSpec}" stroke-width="2.2" stroke-linecap="round" opacity="0.65"/>
    <path d="M ${ox - 44} ${oy - 34}
             C ${ox - 20} ${oy - 58} ${ox + 18} ${oy - 58} ${ox + 42} ${oy - 38}"
          fill="none" stroke="${creamSpec}" stroke-width="1" stroke-linecap="round" opacity="0.4"/>

    <!-- Ceramic Lid Rim Flange & Brass Finial Acorn -->
    <path d="M ${ox - 25} ${oy - 75} C ${ox - 7} ${oy - 70} ${ox + 28} ${oy - 70} ${ox + 45} ${oy - 75}"
          fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
    <path d="M ${ox - 26} ${oy - 77}
             C ${ox - 14} ${oy - 90} ${ox + 31} ${oy - 90} ${ox + 47} ${oy - 77} Z"
          fill="${chassisLight}" stroke="${dark}" stroke-width="2"/>
    <path d="M ${ox + 7} ${oy - 89} L ${ox + 14} ${oy - 89} L ${ox + 15} ${oy - 98} L ${ox + 6} ${oy - 98} Z"
          fill="${brassDeep}" stroke="${dark}" stroke-width="1.4"/>
    <ellipse cx="${ox + 10.5}" cy="${oy - 100}" rx="6" ry="4.5" fill="${brassHigh}" stroke="${dark}" stroke-width="1.6"/>
    <ellipse cx="${ox + 9.5}" cy="${oy - 101}" rx="2.5" ry="1.4" fill="${creamSpec}" opacity="0.8"/>

    <!-- Organic Rodent Ears with Vascular Pink Inner Cavity & Capillary Veins -->
    <!-- Rear Ear -->
    <path d="M ${ox - 34} ${oy - 68}
             C ${ox - 45} ${oy - 99} ${ox - 17} ${oy - 113} ${ox - 3} ${oy - 88}
             C ${ox - 2} ${oy - 77} ${ox - 12} ${oy - 70} ${ox - 16} ${oy - 68} Z"
          fill="${chassisShade}" stroke="${dark}" stroke-width="2"/>
    <path d="M ${ox - 29} ${oy - 72}
             C ${ox - 36} ${oy - 94} ${ox - 18} ${oy - 103} ${ox - 10} ${oy - 86} Z"
          fill="${earPink}" opacity="0.7"/>

    <!-- Foreground Ear -->
    <path d="M ${ox + 20} ${oy - 71}
             C ${ox + 22} ${oy - 104} ${ox + 54} ${oy - 108} ${ox + 61} ${oy - 81}
             C ${ox + 62} ${oy - 66} ${ox + 47} ${oy - 62} ${ox + 36} ${oy - 66} Z"
          fill="${chassisBase}" stroke="${dark}" stroke-width="2.4"/>
    <path d="M ${ox + 26} ${oy - 74}
             C ${ox + 29} ${oy - 97} ${ox + 50} ${oy - 100} ${ox + 54} ${oy - 79} Z"
          fill="${earPink}" opacity="0.85"/>
    <path d="M ${ox + 39} ${oy - 78} C ${ox + 40} ${oy - 86} ${ox + 39} ${oy - 93} ${ox + 36} ${oy - 97}"
          fill="none" stroke="#8c4e47" stroke-width="0.9" stroke-linecap="round"/>

    <!-- Glassy Rodent Eye embedded into ceramic transition -->
    <circle cx="${ox + 88}" cy="${oy - 20}" r="6.5" fill="#0d0b09" stroke="${dark}" stroke-width="1.8"/>
    <circle cx="${ox + 88}" cy="${oy - 20}" r="5" fill="#2d2116"/>
    <circle cx="${ox + 89}" cy="${oy - 21}" r="3" fill="#66462c"/>
    <circle cx="${ox + 90.5}" cy="${oy - 22.5}" r="1.3" fill="#ffffff"/>

    <!-- Spout Lip / Rhinarium (Nose pad doubling as spout rim) -->
    <ellipse cx="${ox + 144}" cy="${oy - 4}" rx="5" ry="7" fill="${brassDeep}" stroke="${dark}" stroke-width="1.6"/>
    <ellipse cx="${ox + 144}" cy="${oy - 4}" rx="3" ry="5" fill="${dark}"/>
    <ellipse cx="${ox + 144.5}" cy="${oy - 5}" rx="1" ry="2" fill="${creamSpec}" opacity="0.75"/>

    <!-- Tapered Whiskers (Fluid guide needles) -->
    <path d="M ${ox + 132} ${oy - 3} C ${ox + 148} ${oy - 12} ${ox + 167} ${oy - 18} ${ox + 185} ${oy - 19}"
          fill="none" stroke="${dark}" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M ${ox + 134} ${oy} C ${ox + 152} ${oy - 1} ${ox + 171} ${oy} ${ox + 189} ${oy + 3}"
          fill="none" stroke="${dark}" stroke-width="1" stroke-linecap="round"/>
    <path d="M ${ox + 131} ${oy + 4} C ${ox + 148} ${oy + 10} ${ox + 164} ${oy + 19} ${ox + 181} ${oy + 26}"
          fill="none" stroke="${dark}" stroke-width="1" stroke-linecap="round"/>

    <!-- Foreground Supporting Paw -->
    <path d="M ${ox + 24} ${oy + 86}
             C ${ox + 17} ${oy + 98} ${ox + 26} ${oy + 105} ${ox + 45} ${oy + 103}
             C ${ox + 54} ${oy + 100} ${ox + 47} ${oy + 88} ${ox + 36} ${oy + 86} Z"
          fill="${chassisLight}" stroke="${dark}" stroke-width="2"/>
    <line x1="${ox + 33}" y1="${oy + 102}" x2="${ox + 40}" y2="${oy + 99}" stroke="${dark}" stroke-width="1.2"/>
    <line x1="${ox + 37}" y1="${oy + 105}" x2="${ox + 44}" y2="${oy + 102}" stroke="${dark}" stroke-width="1.2"/>
  `;

  return out;
}

// ============================================================================
// ARCHETYPE 3: THE PRESSING RAY (Cast-Iron Wedge / Batoid Skate)
// Inspired directly by Subject 6 in elevated_5_6_demo:
// Flared triangular cast-iron body forming broad pectoral manta wings, arched
// bakelite handle neural arch with thermal indicator dial, caudal whip sting with
// venomous barbs, polished steel bevel ridge, and steam vent spiracles.
// ============================================================================
function renderWedgeBatoid(rx, ry, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const ironBase = pal.base;
  const ironLight = pal.light;
  const ironShade = pal.shade;
  const steelSpec = pal.highlight;
  const bakelite = pal.organ || pal.shade;
  const thermoRed = pal.accent;
  const steamCyan = pal.secondary || "#96c4ba";
  const brassGlow = pal.brass || "#d5b95c";

  // --- PARAMETRIC MORPHOLOGICAL DNA ---
  const wingSpan = 95 + r() * 35; // 95px (compact electric ray) to 130px (broad manta)
  const wingSweepY = -15 + r() * 20; // Wing tip sweep height
  const prowY = -70 - r() * 20; // Prow sharpness
  const tailType = Math.floor(r() * 3); // 0: Whip sting with venom barbs, 1: Segmented power conduit, 2: Heavy chain link
  const moduleType = Math.floor(r() * 3); // 0: Thermal dial gauge, 1: Luminous ocular turret, 2: Mechanical pressure regulator
  const ventCount = 3 + Math.floor(r() * 3); // 3 to 5 spiracle vents per wing

  // Ground Ambient Occlusion Shadow
  out += `
    <ellipse cx="${rx}" cy="${ry + 100}" rx="${wingSpan * 0.95}" ry="12" fill="#05070a" opacity="0.95"/>
    <ellipse cx="${rx}" cy="${ry + 100}" rx="${wingSpan * 0.65}" ry="6" fill="#020304" opacity="0.98"/>
  `;

  // DNA TAIL GENERATION
  if (tailType === 0) {
    // Caudal Whip Sting with Venomous Barbs
    out += `
      <!-- Caudal Sting / Organic Whip -->
      <path d="M ${rx} ${ry + 55} C ${rx - 4} ${ry + 78} ${rx + 10} ${ry + 92} ${rx + 24} ${ry + 100} C ${rx + 38} ${ry + 106} ${rx + 58} ${ry + 102} ${rx + 75} ${ry + 104}"
            fill="none" stroke="${dark}" stroke-width="6.5" stroke-linecap="round"/>
      <path d="M ${rx} ${ry + 55} C ${rx - 4} ${ry + 78} ${rx + 10} ${ry + 92} ${rx + 24} ${ry + 100} C ${rx + 38} ${ry + 106} ${rx + 58} ${ry + 102} ${rx + 75} ${ry + 104}"
            fill="none" stroke="${ironShade}" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Venomous Barbs -->
      <path d="M ${rx + 29} ${ry + 98} L ${rx + 36} ${ry + 90} L ${rx + 34} ${ry + 100} Z" fill="${dark}"/>
      <path d="M ${rx + 43} ${ry + 101} L ${rx + 50} ${ry + 93} L ${rx + 48} ${ry + 102} Z" fill="${dark}"/>
    `;
  } else if (tailType === 1) {
    // Braided High-Voltage Textile Conduit with Brass Coupler
    out += `
      <!-- Braided Industrial Power Conduit -->
      <path d="M ${rx} ${ry + 55} C ${rx - 12} ${ry + 75} ${rx - 25} ${ry + 90} ${rx - 45} ${ry + 98} C ${rx - 65} ${ry + 105} ${rx - 85} ${ry + 102} ${rx - 100} ${ry + 106}"
            fill="none" stroke="${dark}" stroke-width="8" stroke-linecap="round"/>
      <path d="M ${rx} ${ry + 55} C ${rx - 12} ${ry + 75} ${rx - 25} ${ry + 90} ${rx - 45} ${ry + 98} C ${rx - 65} ${ry + 105} ${rx - 85} ${ry + 102} ${rx - 100} ${ry + 106}"
            fill="none" stroke="${thermoRed}" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Terminal Brass Grounding Plug -->
      <rect x="${rx - 108}" y="${ry + 100}" width="12" height="10" rx="2" fill="${brassGlow}" stroke="${dark}" stroke-width="1.8"/>
    `;
  } else {
    // Articulated Vertebrate Chain Links
    out += `
      <!-- Articulated Vertebral Iron Links -->
      <ellipse cx="${rx + 8}" cy="${ry + 72}" rx="6" ry="10" fill="${ironLight}" stroke="${dark}" stroke-width="2"/>
      <ellipse cx="${rx + 20}" cy="${ry + 86}" rx="7" ry="11" fill="${ironShade}" stroke="${dark}" stroke-width="2"/>
      <ellipse cx="${rx + 38}" cy="${ry + 96}" rx="8" ry="12" fill="${ironBase}" stroke="${dark}" stroke-width="2.2"/>
      <ellipse cx="${rx + 60}" cy="${ry + 102}" rx="8" ry="12" fill="${ironLight}" stroke="${dark}" stroke-width="2.2"/>
      <polygon points="${rx + 72},${ry + 102} ${rx + 90},${ry + 102} ${rx + 76},${ry + 96}" fill="${dark}"/>
    `;
  }

  // Main Parametric Wing & Cast-Iron Sole Body
  out += `
    <!-- Main Parametric Sole Body -->
    <path d="M ${rx} ${prowY}
             C ${rx + wingSpan * 0.28} ${prowY + 10} ${rx + wingSpan * 0.68} ${prowY + 34} ${rx + wingSpan} ${wingSweepY}
             C ${rx + wingSpan + 14} ${wingSweepY + 18} ${rx + wingSpan + 3} ${wingSweepY + 41} ${rx + wingSpan * 0.8} ${wingSweepY + 51}
             C ${rx + wingSpan * 0.58} ${ry + 51} ${rx + 38} ${ry + 72} ${rx + 15} ${ry + 92}
             C ${rx + 5} ${ry + 98} ${rx - 5} ${ry + 98} ${rx - 15} ${ry + 92}
             C ${rx - 38} ${ry + 72} ${rx - wingSpan * 0.58} ${ry + 51} ${rx - wingSpan * 0.8} ${wingSweepY + 51}
             C ${rx - wingSpan - 3} ${wingSweepY + 41} ${rx - wingSpan - 14} ${wingSweepY + 18} ${rx - wingSpan} ${wingSweepY}
             C ${rx - wingSpan * 0.68} ${prowY + 34} ${rx - wingSpan * 0.28} ${prowY + 10} ${rx} ${prowY} Z"
          fill="${ironBase}" stroke="${dark}" stroke-width="3.6" stroke-linejoin="round"/>

    <!-- Pectoral Flank Volume Shadows -->
    <path d="M ${rx - wingSpan * 0.95} ${wingSweepY + 7}
             C ${rx - wingSpan * 0.71} ${ry + 24} ${rx - 48} ${ry + 45} ${rx - 14} ${ry + 82}
             C ${rx - 38} ${ry + 65} ${rx - wingSpan * 0.62} ${ry + 45} ${rx - wingSpan * 0.82} ${ry + 34} Z"
          fill="${ironShade}" opacity="0.75"/>
    <path d="M ${rx + wingSpan * 0.95} ${wingSweepY + 7}
             C ${rx + wingSpan * 0.71} ${ry + 24} ${rx + 48} ${ry + 45} ${rx + 14} ${ry + 82}
             C ${rx + 38} ${ry + 65} ${rx + wingSpan * 0.62} ${ry + 45} ${rx + wingSpan * 0.82} ${ry + 34} Z"
          fill="${ironShade}" opacity="0.75"/>

    <!-- Polished Steel Bevel Edge Ridge -->
    <path d="M ${rx} ${prowY + 6}
             C ${rx + wingSpan * 0.26} ${prowY + 16} ${rx + wingSpan * 0.62} ${prowY + 38} ${rx + wingSpan * 0.9} ${wingSweepY + 2}"
          fill="none" stroke="${steelSpec}" stroke-width="2.2" stroke-linecap="round" opacity="0.6"/>
    <path d="M ${rx} ${prowY + 6}
             C ${rx - wingSpan * 0.26} ${prowY + 16} ${rx - wingSpan * 0.62} ${prowY + 38} ${rx - wingSpan * 0.9} ${wingSweepY + 2}"
          fill="none" stroke="${steelSpec}" stroke-width="2.2" stroke-linecap="round" opacity="0.6"/>

    <!-- Central Rostral Spine -->
    <line x1="${rx}" y1="${prowY + 4}" x2="${rx}" y2="${ry + 30}" stroke="${ironLight}" stroke-width="1.8"/>
  `;

  // DNA PARAMETRIC SPIRACLE VENTS
  for (let i = 0; i < ventCount; i++) {
    const vx = 40 + i * 16;
    const vy = ry - 4 + i * 14;
    const vr = 4.2 - i * 0.4;
    out += `
      <ellipse cx="${rx - vx}" cy="${vy}" rx="${vr}" ry="${vr * 0.68}" fill="${dark}"/>
      <ellipse cx="${rx - vx}" cy="${vy}" rx="${vr * 0.65}" ry="${vr * 0.4}" fill="${steamCyan}" opacity="0.85"/>
      <ellipse cx="${rx + vx}" cy="${vy}" rx="${vr}" ry="${vr * 0.68}" fill="${dark}"/>
      <ellipse cx="${rx + vx}" cy="${vy}" rx="${vr * 0.65}" ry="${vr * 0.4}" fill="${steamCyan}" opacity="0.85"/>
    `;
  }

  // Heavy Arched Iron Handle
  out += `
    <!-- Heavy Arched Iron / Bakelite Handle functioning as Neural Arch -->
    <path d="M ${rx - 25} ${ry + 25}
             C ${rx - 32} ${ry - 40} ${rx - 28} ${ry - 68} ${rx} ${ry - 68}
             C ${rx + 28} ${ry - 68} ${rx + 32} ${ry - 40} ${rx + 25} ${ry + 25}
             L ${rx + 15} ${ry + 25}
             C ${rx + 20} ${ry - 35} ${rx + 18} ${ry - 56} ${rx} ${ry - 56}
             C ${rx - 18} ${ry - 56} ${rx - 20} ${ry - 35} ${rx - 15} ${ry + 25} Z"
          fill="${bakelite}" stroke="${dark}" stroke-width="2.6" stroke-linejoin="round"/>

    <!-- Handle Top Highlight -->
    <path d="M ${rx - 16} ${ry - 64} C ${rx - 6} ${ry - 67} ${rx + 6} ${ry - 67} ${rx + 16} ${ry - 64}"
          fill="none" stroke="${steelSpec}" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
  `;

  // DNA MODULE SITTING IN HANDLE CAVITY
  if (moduleType === 0) {
    // Thermal Dial Gauge
    out += `
      <circle cx="${rx}" cy="${ry - 12}" r="15" fill="${ironShade}" stroke="${dark}" stroke-width="2"/>
      <circle cx="${rx}" cy="${ry - 12}" r="12" fill="#181c20"/>
      <circle cx="${rx}" cy="${ry - 12}" r="8" fill="${thermoRed}" stroke="${dark}" stroke-width="1.2"/>
      <line x1="${rx}" y1="${ry - 12}" x2="${rx + 5}" y2="${ry - 16}" stroke="${steelSpec}" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="${rx}" cy="${ry - 12}" r="2" fill="${dark}"/>
      <ellipse cx="${rx - 3}" cy="${ry - 15}" rx="3" ry="1.5" fill="${steelSpec}" opacity="0.8"/>
    `;
  } else if (moduleType === 1) {
    // Living Cephalic Ocular Turret with W-slit pupil
    out += `
      <circle cx="${rx}" cy="${ry - 12}" r="16" fill="${dark}"/>
      <circle cx="${rx}" cy="${ry - 12}" r="13" fill="${ironLight}" stroke="${brassGlow}" stroke-width="1.6"/>
      <circle cx="${rx}" cy="${ry - 12}" r="9" fill="${brassGlow}"/>
      <!-- Horizontal W-shaped batoid pupil -->
      <path d="M ${rx - 6} ${ry - 12} Q ${rx - 3} ${ry - 9} ${rx} ${ry - 12} Q ${rx + 3} ${ry - 9} ${rx + 6} ${ry - 12}" fill="none" stroke="${dark}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="${rx - 2.5}" cy="${ry - 14}" r="1.5" fill="#ffffff" opacity="0.9"/>
    `;
  } else {
    // Heavy Brass Pressure Regulator Valve with Spindle
    out += `
      <rect x="${rx - 12}" y="${ry - 26}" width="24" height="28" rx="4" fill="${brassGlow}" stroke="${dark}" stroke-width="2"/>
      <circle cx="${rx}" cy="${ry - 12}" r="8" fill="${ironShade}" stroke="${dark}" stroke-width="1.6"/>
      <circle cx="${rx}" cy="${ry - 12}" r="4" fill="${thermoRed}"/>
      <line x1="${rx - 15}" y1="${ry - 26}" x2="${rx + 15}" y2="${ry - 26}" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
    `;
  }

  return out;
}

// ============================================================================
// ARCHETYPE 4: THE SCRIBING CRAB (Typewriter Decapod / Chitin Carapace)
// Inspired directly by Subject 2 in elevated_morphology_demo:
// Typewriter platen roller posterior hump, single-mesh armored carapace, 3 pairs
// of articulated walking legs with dactyl tips, raptorial cheliped pincers with
// articulating teeth, eyestalks, and keyboard mouthparts.
// ============================================================================
function renderChassisCrustacean(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const carapaceBase = pal.base;
  const carapaceLight = pal.light;
  const carapaceShade = pal.shade;
  const creamSpec = pal.highlight;
  const brassKnob = pal.brass || "#d4a755";
  const pincerAccent = pal.accent;

  // Ground Ambient Occlusion Shadow
  out += `
    <ellipse cx="${cx}" cy="${cy + 100}" rx="110" ry="12" fill="#05070a" opacity="0.95"/>
    <ellipse cx="${cx}" cy="${cy + 100}" rx="75" ry="6" fill="#020304" opacity="0.98"/>
  `;

  // 3 Pairs of Articulated Walking Legs emerging smoothly under carapace
  for (let side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      let ax = cx + side * (52 + i * 12);
      let ay = cy + 34 - i * 8;
      let bx = cx + side * (86 + i * 16);
      let by = cy + 62 + i * 5;
      let dx = cx + side * (100 + i * 18);
      let dy = cy + 100;

      out += `
        <path d="M ${ax} ${ay} Q ${bx} ${by} ${dx} ${dy}"
              fill="none" stroke="${dark}" stroke-width="7" stroke-linecap="round"/>
        <path d="M ${ax} ${ay} Q ${bx} ${by} ${dx} ${dy}"
              fill="none" stroke="${carapaceShade}" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="${dx}" cy="${dy}" r="2.2" fill="${dark}"/>
      `;
    }
  }

  // Typewriter Platen Roller / Posterior Cephalothorax Hump behind shell
  out += `
    <rect x="${cx - 72}" y="${cy - 64}" width="144" height="18" rx="4" fill="#181b22" stroke="${dark}" stroke-width="2.2"/>
    <line x1="${cx - 65}" y1="${cy - 55}" x2="${cx + 65}" y2="${cy - 55}" stroke="#3b4352" stroke-width="1.4"/>
    <circle cx="${cx - 75}" cy="${cy - 55}" r="6.5" fill="${brassKnob}" stroke="${dark}" stroke-width="1.6"/>
    <circle cx="${cx + 75}" cy="${cy - 55}" r="6.5" fill="${brassKnob}" stroke="${dark}" stroke-width="1.6"/>
  `;

  // Main Typewriter Chassis & Crab Carapace (Integrated Single Mesh)
  out += `
    <path d="M ${cx - 80} ${cy - 45}
             C ${cx - 76} ${cy - 58} ${cx - 48} ${cy - 65} ${cx} ${cy - 65}
             C ${cx + 48} ${cy - 65} ${cx + 76} ${cy - 58} ${cx + 80} ${cy - 45}
             L ${cx + 94} ${cy + 24}
             C ${cx + 96} ${cy + 52} ${cx + 65} ${cy + 64} ${cx} ${cy + 64}
             C ${cx - 65} ${cy + 64} ${cx - 96} ${cy + 52} ${cx - 94} ${cy + 24} Z"
          fill="${carapaceBase}" stroke="${dark}" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Metal Chassis Bevel Highlight -->
    <path d="M ${cx - 72} ${cy - 42}
             C ${cx - 45} ${cy - 56} ${cx + 45} ${cy - 56} ${cx + 72} ${cy - 42}"
          fill="none" stroke="${creamSpec}" stroke-width="1.8" stroke-linecap="round" opacity="0.45"/>

    <!-- Retractable Eyestalks with Hemispherical Optical Spheres -->
    <path d="M ${cx - 20} ${cy - 45} L ${cx - 28} ${cy - 72}" fill="none" stroke="${dark}" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="${cx - 28}" cy="${cy - 72}" r="5.5" fill="${dark}"/>
    <circle cx="${cx - 27}" cy="${cy - 73}" r="1.8" fill="${creamSpec}"/>

    <path d="M ${cx + 20} ${cy - 45} L ${cx + 28} ${cy - 72}" fill="none" stroke="${dark}" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="${cx + 28}" cy="${cy - 72}" r="5.5" fill="${dark}"/>
    <circle cx="${cx + 29}" cy="${cy - 73}" r="1.8" fill="${creamSpec}"/>

    <!-- Ribbed Keyboard Mouthparts (Ventral key tier basket) -->
    <rect x="${cx - 42}" y="${cy + 8}" width="84" height="28" rx="3" fill="#14171e" stroke="${dark}" stroke-width="1.8"/>
  `;

  // Individual circular keys acting as filter plates
  for (let row = 0; row < 2; row++) {
    for (let k = 0; k < 6; k++) {
      let kx = cx - 35 + k * 14;
      let ky = cy + 15 + row * 12;
      out += `
        <circle cx="${kx}" cy="${ky}" r="3.2" fill="${carapaceLight}" stroke="${dark}" stroke-width="0.9"/>
        <circle cx="${kx}" cy="${ky}" r="1.5" fill="${dark}"/>
      `;
    }
  }

  // Heavy Predatory Cheliped Claws (Left & Right) emerging from shoulder sockets
  // Left Claw
  out += `
    <path d="M ${cx - 75} ${cy + 12} Q ${cx - 100} ${cy - 5} ${cx - 118} ${cy + 5}"
          fill="none" stroke="${dark}" stroke-width="10" stroke-linecap="round"/>
    <path d="M ${cx - 75} ${cy + 12} Q ${cx - 100} ${cy - 5} ${cx - 118} ${cy + 5}"
          fill="none" stroke="${carapaceShade}" stroke-width="6.5" stroke-linecap="round"/>
    <!-- Claw Body -->
    <path d="M ${cx - 118} ${cy + 5} C ${cx - 138} ${cy - 12} ${cx - 150} ${cy - 8} ${cx - 156} ${cy + 12} C ${cx - 144} ${cy + 20} ${cx - 128} ${cy + 18} ${cx - 118} ${cy + 5} Z"
          fill="${carapaceBase}" stroke="${dark}" stroke-width="2.4"/>
    <!-- Articulating Pincer Dactyl Finger -->
    <path d="M ${cx - 156} ${cy + 12} C ${cx - 168} ${cy + 2} ${cx - 162} ${cy - 15} ${cx - 145} ${cy - 18} C ${cx - 152} ${cy - 6} ${cx - 148} ${cy + 3} ${cx - 156} ${cy + 12} Z"
          fill="${pincerAccent}" stroke="${dark}" stroke-width="1.8"/>

    <!-- Right Claw -->
    <path d="M ${cx + 75} ${cy + 12} Q ${cx + 100} ${cy - 5} ${cx + 118} ${cy + 5}"
          fill="none" stroke="${dark}" stroke-width="10" stroke-linecap="round"/>
    <path d="M ${cx + 75} ${cy + 12} Q ${cx + 100} ${cy - 5} ${cx + 118} ${cy + 5}"
          fill="none" stroke="${carapaceShade}" stroke-width="6.5" stroke-linecap="round"/>
    <!-- Claw Body -->
    <path d="M ${cx + 118} ${cy + 5} C ${cx + 138} ${cy - 12} ${cx + 150} ${cy - 8} ${cx + 156} ${cy + 12} C ${cx + 144} ${cy + 20} ${cx + 128} ${cy + 18} ${cx + 118} ${cy + 5} Z"
          fill="${carapaceBase}" stroke="${dark}" stroke-width="2.4"/>
    <!-- Articulating Pincer Dactyl Finger -->
    <path d="M ${cx + 156} ${cy + 12} C ${cx + 168} ${cy + 2} ${cx + 162} ${cy - 15} ${cx + 145} ${cy - 18} C ${cx + 152} ${cy - 6} ${cx + 148} ${cy + 3} ${cx + 156} ${cy + 12} Z"
          fill="${pincerAccent}" stroke="${dark}" stroke-width="1.8"/>
  `;

  return out;
}

// ============================================================================
// ARCHETYPE 5: THE CHRYSALIS RADIO (Folio Moth / Lepidoptera Cabinet)
// Wooden cathedral radio cabinet or antique leather tome acting as the thorax/chrysalis,
// expansive membranous wings with radiating structural venation and ocular lunules,
// illuminated vacuum tuning eye, and upwardly sweeping plumose antennae.
// ============================================================================
function renderDeviceLepidoptera(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const woodBase = pal.base;
  const woodLight = pal.light;
  const woodShade = pal.shade;
  const wingMembrane = pal.highlight;
  const eyeAccent = pal.accent;
  const phosphorDial = pal.secondary || "#96c4ba";

  // Ground Ambient Occlusion Shadow
  out += `
    <ellipse cx="${cx}" cy="${cy + 100}" rx="90" ry="12" fill="#05070a" opacity="0.95"/>
    <ellipse cx="${cx}" cy="${cy + 100}" rx="60" ry="6" fill="#020304" opacity="0.98"/>
  `;

  // Posterior Wing Array (Left & Right expansive lepidopteran wings)
  out += `
    <!-- Left Forewing -->
    <path d="M ${cx - 15} ${cy - 20}
             C ${cx - 55} ${cy - 75} ${cx - 105} ${cy - 88} ${cx - 132} ${cy - 60}
             C ${cx - 145} ${cy - 24} ${cx - 128} ${cy + 24} ${cx - 86} ${cy + 42}
             C ${cx - 55} ${cy + 34} ${cx - 24} ${cy + 16} ${cx - 15} ${cy - 20} Z"
          fill="${wingMembrane}" stroke="${dark}" stroke-width="2.8"/>
    <!-- Venation Lines -->
    <path d="M ${cx - 15} ${cy - 20} C ${cx - 48} ${cy - 48} ${cx - 92} ${cy - 52} ${cx - 124} ${cy - 42}" fill="none" stroke="${woodShade}" stroke-width="1.4"/>
    <path d="M ${cx - 15} ${cy - 20} C ${cx - 42} ${cy - 8} ${cx - 78} ${cy + 5} ${cx - 104} ${cy + 22}" fill="none" stroke="${woodShade}" stroke-width="1.4"/>
    <!-- Ocular Lunule (Eye-spot) -->
    <circle cx="${cx - 92}" cy="${cy - 25}" r="11" fill="${dark}"/>
    <circle cx="${cx - 92}" cy="${cy - 25}" r="8" fill="${eyeAccent}"/>
    <circle cx="${cx - 92}" cy="${cy - 25}" r="4" fill="${dark}"/>

    <!-- Right Forewing -->
    <path d="M ${cx + 15} ${cy - 20}
             C ${cx + 55} ${cy - 75} ${cx + 105} ${cy - 88} ${cx + 132} ${cy - 60}
             C ${cx + 145} ${cy - 24} ${cx + 128} ${cy + 24} ${cx + 86} ${cy + 42}
             C ${cx + 55} ${cy + 34} ${cx + 24} ${cy + 16} ${cx + 15} ${cy - 20} Z"
          fill="${wingMembrane}" stroke="${dark}" stroke-width="2.8"/>
    <!-- Venation Lines -->
    <path d="M ${cx + 15} ${cy - 20} C ${cx + 48} ${cy - 48} ${cx + 92} ${cy - 52} ${cx + 124} ${cy - 42}" fill="none" stroke="${woodShade}" stroke-width="1.4"/>
    <path d="M ${cx + 15} ${cy - 20} C ${cx + 42} ${cy - 8} ${cx + 78} ${cy + 5} ${cx + 104} ${cy + 22}" fill="none" stroke="${woodShade}" stroke-width="1.4"/>
    <!-- Ocular Lunule (Eye-spot) -->
    <circle cx="${cx + 92}" cy="${cy - 25}" r="11" fill="${dark}"/>
    <circle cx="${cx + 92}" cy="${cy - 25}" r="8" fill="${eyeAccent}"/>
    <circle cx="${cx + 92}" cy="${cy - 25}" r="4" fill="${dark}"/>
  `;

  // Central Cathedral Radio Cabinet / Thorax Body
  out += `
    <!-- Cathedral Arch Wooden Cabinet -->
    <path d="M ${cx - 36} ${cy + 85}
             L ${cx - 36} ${cy - 20}
             C ${cx - 36} ${cy - 65} ${cx + 36} ${cy - 65} ${cx + 36} ${cy - 20}
             L ${cx + 36} ${cy + 85} Z"
          fill="${woodBase}" stroke="${dark}" stroke-width="3.2" stroke-linejoin="round"/>

    <!-- Cabinet Inner Arch Shading -->
    <path d="M ${cx - 28} ${cy + 75}
             L ${cx - 28} ${cy - 18}
             C ${cx - 28} ${cy - 54} ${cx + 28} ${cy - 54} ${cx + 28} ${cy - 18}
             L ${cx + 28} ${cy + 75} Z"
          fill="${woodShade}" opacity="0.6"/>

    <!-- Speaker Fretwork Grille / Chitin Ribs -->
    <path d="M ${cx} ${cy - 48} L ${cx} ${cy - 12}" stroke="${dark}" stroke-width="2"/>
    <path d="M ${cx - 14} ${cy - 42} L ${cx - 14} ${cy - 14}" stroke="${dark}" stroke-width="1.6"/>
    <path d="M ${cx + 14} ${cy - 42} L ${cx + 14} ${cy - 14}" stroke="${dark}" stroke-width="1.6"/>

    <!-- Illuminated Circular Vacuum Tuning Eye / Dial -->
    <circle cx="${cx}" cy="${cy + 18}" r="15" fill="#11161d" stroke="${dark}" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy + 18}" r="11" fill="${phosphorDial}" opacity="0.85"/>
    <line x1="${cx}" y1="${cy + 18}" x2="${cx + 6}" y2="${cy + 12}" stroke="${dark}" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy + 18}" r="2" fill="${dark}"/>

    <!-- Radio Control Knobs -->
    <circle cx="${cx - 18}" cy="${cy + 55}" r="5" fill="${woodShade}" stroke="${dark}" stroke-width="1.4"/>
    <circle cx="${cx + 18}" cy="${cy + 55}" r="5" fill="${woodShade}" stroke="${dark}" stroke-width="1.4"/>

    <!-- Upwardly Sweeping Feathered Plumose Antennae -->
    <path d="M ${cx - 8} ${cy - 60} C ${cx - 20} ${cy - 85} ${cx - 36} ${cy - 100} ${cx - 50} ${cy - 105}" fill="none" stroke="${dark}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M ${cx + 8} ${cy - 60} C ${cx + 20} ${cy - 85} ${cx + 36} ${cy - 100} ${cx + 50} ${cy - 105}" fill="none" stroke="${dark}" stroke-width="2.4" stroke-linecap="round"/>
  `;

  // Comb Feathers on antennae
  for (let i = 1; i <= 5; i++) {
    let t = i / 6;
    let lx = cx - 8 - t * 38;
    let ly = cy - 60 - t * 40;
    let rx = cx + 8 + t * 38;
    let ry = cy - 60 - t * 40;
    out += `
      <line x1="${lx}" y1="${ly}" x2="${lx - 8}" y2="${ly - 5}" stroke="${dark}" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="${rx}" y1="${ry}" x2="${rx + 8}" y2="${ry - 5}" stroke="${dark}" stroke-width="1.5" stroke-linecap="round"/>
    `;
  }

  return out;
}

// ============================================================================
// ARCHETYPE 6: THE CATHODE SERPENT (CRT Oscilloscope / Ophiid Basilisk)
// Heavy vintage oscilloscope / monitor housing fused with a massive muscular
// serpent body coiling through the base, with rearing hooded viper head, glowing
// phosphor waveform slit stare, and transformer fin scales.
// ============================================================================
function renderChassisSerpent(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const chassisBase = pal.base;
  const chassisLight = pal.light;
  const chassisShade = pal.shade;
  const phosphorGlow = pal.accent;
  const specHighlight = pal.highlight;

  // Ground Ambient Occlusion Shadow
  out += `
    <ellipse cx="${cx}" cy="${cy + 105}" rx="115" ry="14" fill="#05070a" opacity="0.95"/>
    <ellipse cx="${cx}" cy="${cy + 105}" rx="75" ry="7" fill="#020304" opacity="0.98"/>
  `;

  // Massive Serpentine Coils wrapping through the ground plane
  out += `
    <!-- Lower Coiling Serpent Body -->
    <path d="M ${cx - 105} ${cy + 65}
             C ${cx - 135} ${cy + 85} ${cx - 75} ${cy + 115} ${cx} ${cy + 110}
             C ${cx + 75} ${cy + 105} ${cx + 135} ${cy + 80} ${cx + 105} ${cy + 60}
             C ${cx + 70} ${cy + 45} ${cx + 50} ${cy + 65} ${cx + 15} ${cy + 75}
             C ${cx - 25} ${cy + 85} ${cx - 75} ${cy + 50} ${cx - 105} ${cy + 65} Z"
          fill="${chassisShade}" stroke="${dark}" stroke-width="3.2" stroke-linejoin="round"/>

    <!-- Ventral Belly Scutes on Serpent Coil -->
    <line x1="${cx - 45}" y1="${cy + 92}" x2="${cx - 35}" y2="${cy + 96}" stroke="${dark}" stroke-width="1.8"/>
    <line x1="${cx}" y1="${cy + 98}" x2="${cx + 10}" y2="${cy + 100}" stroke="${dark}" stroke-width="1.8"/>
    <line x1="${cx + 45}" y1="${cy + 92}" x2="${cx + 55}" y2="${cy + 95}" stroke="${dark}" stroke-width="1.8"/>

    <!-- CRT Monitor / Oscilloscope Housing -->
    <rect x="${cx - 58}" y="${cy - 35}" width="116" height="85" rx="8" fill="${chassisBase}" stroke="${dark}" stroke-width="3.4"/>
    <rect x="${cx - 50}" y="${cy - 27}" width="78" height="68" rx="6" fill="#10151c" stroke="${dark}" stroke-width="2"/>

    <!-- CRT Curved Screen Border & Specular Highlight -->
    <path d="M ${cx - 45} ${cy - 22} C ${cx - 48} ${cy + 5} ${cx - 45} ${cy + 32} ${cx - 15} ${cy + 34}"
          fill="none" stroke="${specHighlight}" stroke-width="1.8" opacity="0.4"/>

    <!-- Glowing Phosphor Display (Waveform / Slit Ocular Stare) -->
    <path d="M ${cx - 45} ${cy + 8} Q ${cx - 30} ${cy - 12} ${cx - 18} ${cy + 8} T ${cx + 8} ${cy + 8} T ${cx + 20} ${cy + 8}"
          fill="none" stroke="${phosphorGlow}" stroke-width="2.4" stroke-linecap="round"/>

    <!-- Rotary Control Knobs on front panel -->
    <circle cx="${cx + 42}" cy="${cy - 12}" r="5" fill="${chassisShade}" stroke="${dark}" stroke-width="1.4"/>
    <circle cx="${cx + 42}" cy="${cy + 6}" r="5" fill="${chassisShade}" stroke="${dark}" stroke-width="1.4"/>
    <circle cx="${cx + 42}" cy="${cy + 24}" r="5" fill="${chassisShade}" stroke="${dark}" stroke-width="1.4"/>

    <!-- Serpentine Neck Column rising from housing -->
    <path d="M ${cx - 20} ${cy - 35} L ${cx - 14} ${cy - 65} L ${cx + 14} ${cy - 65} L ${cx + 20} ${cy - 35} Z"
          fill="${chassisBase}" stroke="${dark}" stroke-width="2.6"/>

    <!-- Hooded Viper Head rearing above chassis -->
    <path d="M ${cx - 24} ${cy - 65}
             C ${cx - 36} ${cy - 85} ${cx} ${cy - 105} ${cx + 24} ${cy - 65} Z"
          fill="${chassisLight}" stroke="${dark}" stroke-width="3"/>
    <ellipse cx="${cx}" cy="${cy - 85}" rx="12" ry="9" fill="${chassisShade}" stroke="${dark}" stroke-width="1.8"/>

    <!-- Glowing Serpent Eyes -->
    <circle cx="${cx - 8}" cy="${cy - 88}" r="2.8" fill="${phosphorGlow}"/>
    <circle cx="${cx + 8}" cy="${cy - 88}" r="2.8" fill="${phosphorGlow}"/>

    <!-- Forked Prehensile Tongue -->
    <path d="M ${cx} ${cy - 95} L ${cx} ${cy - 110} L ${cx - 5} ${cy - 118} M ${cx} ${cy - 110} L ${cx + 5} ${cy - 118}"
          fill="none" stroke="${dark}" stroke-width="1.8" stroke-linecap="round"/>
  `;

  return out;
}

// ============================================================================
// ARCHETYPE 7: THE RESONANT MONOLITH (Amphibian Bell / Bufo Gular Sac)
// Heavy cast-bronze dome/bell body whose rim forms the cranial cap and distended
// resonant vocal sac of a deep subterranean amphibian, with horizontal slit eyes
// and folded jumping limbs.
// ============================================================================
function renderAmphibianMonolith(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const bellBase = pal.base;
  const bellLight = pal.light;
  const bellShade = pal.shade;
  const gularSac = pal.organ;
  const eyeGold = pal.accent;
  const specHighlight = pal.highlight;

  // Ground Ambient Occlusion Shadow
  out += `
    <ellipse cx="${cx}" cy="${cy + 105}" rx="105" ry="14" fill="#05070a" opacity="0.95"/>
    <ellipse cx="${cx}" cy="${cy + 105}" rx="70" ry="7" fill="#020304" opacity="0.98"/>
  `;

  // Folded Muscular Hind Jumping Limbs on either side
  out += `
    <!-- Left Folded Thigh -->
    <path d="M ${cx - 35} ${cy + 40} C ${cx - 85} ${cy + 25} ${cx - 105} ${cy + 75} ${cx - 68} ${cy + 95} L ${cx - 50} ${cy + 85}"
          fill="none" stroke="${dark}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${cx - 35} ${cy + 40} C ${cx - 85} ${cy + 25} ${cx - 105} ${cy + 75} ${cx - 68} ${cy + 95} L ${cx - 50} ${cy + 85}"
          fill="none" stroke="${bellBase}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Right Folded Thigh -->
    <path d="M ${cx + 35} ${cy + 40} C ${cx + 85} ${cy + 25} ${cx + 105} ${cy + 75} ${cx + 68} ${cy + 95} L ${cx + 50} ${cy + 85}"
          fill="none" stroke="${dark}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${cx + 35} ${cy + 40} C ${cx + 85} ${cy + 25} ${cx + 105} ${cy + 75} ${cx + 68} ${cy + 95} L ${cx + 50} ${cy + 85}"
          fill="none" stroke="${bellBase}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  `;

  // Heavy Cast-Bronze Bell Body & Amphibian Cranial Dome
  out += `
    <!-- Main Bell & Cranial Dome Silhouette -->
    <path d="M ${cx - 52} ${cy + 45}
             C ${cx - 54} ${cy - 15} ${cx - 38} ${cy - 65} ${cx} ${cy - 68}
             C ${cx + 38} ${cy - 65} ${cx + 54} ${cy - 15} ${cx + 52} ${cy + 45}
             C ${cx + 35} ${cy + 52} ${cx - 35} ${cy + 52} ${cx - 52} ${cy + 45} Z"
          fill="${bellBase}" stroke="${dark}" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Bell Bottom Flare Rim -->
    <path d="M ${cx - 58} ${cy + 42}
             C ${cx - 58} ${cy + 54} ${cx + 58} ${cy + 54} ${cx + 58} ${cy + 42}
             C ${cx + 35} ${cy + 48} ${cx - 35} ${cy + 48} ${cx - 58} ${cy + 42} Z"
          fill="${bellShade}" stroke="${dark}" stroke-width="2.4"/>

    <!-- Specular Highlight Curve on Bell Shoulder -->
    <path d="M ${cx - 36} ${cy - 18} C ${cx - 34} ${cy - 48} ${cx - 15} ${cy - 60} ${cx} ${cy - 62}"
          fill="none" stroke="${specHighlight}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>

    <!-- Distended Semi-Translucent Gular Vocal Sac hanging beneath bell -->
    <ellipse cx="${cx}" cy="${cy + 65}" rx="36" ry="24" fill="${gularSac}" stroke="${dark}" stroke-width="2.6" opacity="0.88"/>
    <!-- Acoustic Striation Folds -->
    <path d="M ${cx - 24} ${cy + 65} C ${cx} ${cy + 75} ${cx + 24} ${cy + 65}" fill="none" stroke="${bellShade}" stroke-width="1.8"/>

    <!-- Protruding Optical Turrets & Horizontal Slit Pupils on Bell Crown -->
    <!-- Left Eye -->
    <ellipse cx="${cx - 26}" cy="${cy - 52}" rx="15" ry="13" fill="${bellLight}" stroke="${dark}" stroke-width="2.4"/>
    <circle cx="${cx - 26}" cy="${cy - 52}" r="10" fill="${eyeGold}" stroke="${dark}" stroke-width="1.4"/>
    <ellipse cx="${cx - 26}" cy="${cy - 52}" rx="2.5" ry="8" fill="${dark}"/>
    <circle cx="${cx - 28}" cy="${cy - 54}" r="1.5" fill="#ffffff"/>

    <!-- Right Eye -->
    <ellipse cx="${cx + 26}" cy="${cy - 52}" rx="15" ry="13" fill="${bellLight}" stroke="${dark}" stroke-width="2.4"/>
    <circle cx="${cx + 26}" cy="${cy - 52}" r="10" fill="${eyeGold}" stroke="${dark}" stroke-width="1.4"/>
    <ellipse cx="${cx + 26}" cy="${cy - 52}" rx="2.5" ry="8" fill="${dark}"/>
    <circle cx="${cx + 24}" cy="${cy - 54}" r="1.5" fill="#ffffff"/>
  `;

  return out;
}

// ============================================================================
// ARCHETYPE 8: THE VOID WYRMBLADE (Axial Weapon & Dragon Hybrid)
// Handles: Weapons (swords, daggers, spears, axes, bows), blades, wyrms, dragons.
// Continuous razor-edged damascus steel blade merging directly into a serpentine
// dragon torso with articulated scale ribs, clawed dragon guard quillons, and
// an ocular pommel containing a blazing draconic slit pupil.
// ============================================================================
function renderAxialDragonBlade(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const steelBase = pal.base;
  const steelLight = pal.light;
  const steelShade = pal.shade;
  const steelSpec = pal.highlight;
  const goldBrass = pal.brass || "#d69e42";
  const dragonEye = pal.accent;
  const organScale = pal.organ || "#9e4238";

  const bladeLen = 95 + r() * 15;
  const bladeW = 18 + r() * 4;
  const guardSpan = 55 + r() * 10;
  const pommelY = cy + 98;
  const guardY = cy + 35;
  const tipY = guardY - bladeLen;

  // Ground Ambient Occlusion
  out += `
    <ellipse cx="${cx}" cy="${pommelY + 12}" rx="70" ry="10" fill="#040608" opacity="0.95"/>
    <ellipse cx="${cx}" cy="${pommelY + 12}" rx="40" ry="5" fill="#010203" opacity="0.98"/>
  `;

  // Serpentine Dragon Tail wrapped around the grip
  out += `
    <!-- Serpentine Dragon Tail Wraps -->
    <path d="M ${cx - 16} ${guardY + 12}
             C ${cx - 38} ${guardY + 22} ${cx - 32} ${guardY + 45} ${cx} ${guardY + 48}
             C ${cx + 32} ${guardY + 52} ${cx + 28} ${guardY + 75} ${cx - 6} ${guardY + 82}
             C ${cx - 36} ${guardY + 90} ${cx - 42} ${pommelY + 5} ${cx - 18} ${pommelY + 8}"
          fill="none" stroke="${dark}" stroke-width="14" stroke-linecap="round"/>
    <path d="M ${cx - 16} ${guardY + 12}
             C ${cx - 38} ${guardY + 22} ${cx - 32} ${guardY + 45} ${cx} ${guardY + 48}
             C ${cx + 32} ${guardY + 52} ${cx + 28} ${guardY + 75} ${cx - 6} ${guardY + 82}
             C ${cx - 36} ${guardY + 90} ${cx - 42} ${pommelY + 5} ${cx - 18} ${pommelY + 8}"
          fill="none" stroke="${organScale}" stroke-width="9" stroke-linecap="round"/>
  `;

  // Grip core
  out += `
    <!-- Grip Core Column -->
    <rect x="${cx - 8}" y="${guardY}" width="16" height="${pommelY - guardY}" rx="4" fill="${steelShade}" stroke="${dark}" stroke-width="3"/>
  `;

  // Dragon Wing Quillons / Guard
  out += `
    <!-- Left Draconic Winged Quillon -->
    <path d="M ${cx} ${guardY}
             C ${cx - 24} ${guardY - 8} ${cx - guardSpan + 10} ${guardY - 24} ${cx - guardSpan} ${guardY - 14}
             C ${cx - guardSpan + 15} ${guardY + 2} ${cx - 25} ${guardY + 14} ${cx} ${guardY + 8} Z"
          fill="${goldBrass}" stroke="${dark}" stroke-width="3" stroke-linejoin="round"/>
    <!-- Left Wing Webbing Striations -->
    <line x1="${cx - 15}" y1="${guardY - 4}" x2="${cx - guardSpan + 8}" y2="${guardY - 12}" stroke="${dark}" stroke-width="1.6"/>
    <line x1="${cx - 22}" y1="${guardY + 2}" x2="${cx - guardSpan + 18}" y2="${guardY - 2}" stroke="${dark}" stroke-width="1.4"/>

    <!-- Right Draconic Winged Quillon -->
    <path d="M ${cx} ${guardY}
             C ${cx + 24} ${guardY - 8} ${cx + guardSpan - 10} ${guardY - 24} ${cx + guardSpan} ${guardY - 14}
             C ${cx + guardSpan - 15} ${guardY + 2} ${cx + 25} ${guardY + 14} ${cx} ${guardY + 8} Z"
          fill="${goldBrass}" stroke="${dark}" stroke-width="3" stroke-linejoin="round"/>
    <!-- Right Wing Webbing Striations -->
    <line x1="${cx + 15}" y1="${guardY - 4}" x2="${cx + guardSpan - 8}" y2="${guardY - 12}" stroke="${dark}" stroke-width="1.6"/>
    <line x1="${cx + 22}" y1="${guardY + 2}" x2="${cx + guardSpan - 18}" y2="${guardY - 2}" stroke="${dark}" stroke-width="1.4"/>
  `;

  // Master Damascus Steel Blade (flaring from dragon jaws at guard to needle tip)
  out += `
    <!-- Master Blade Silhouette -->
    <path d="M ${cx} ${tipY}
             C ${cx + bladeW * 0.4} ${tipY + bladeLen * 0.3} ${cx + bladeW} ${guardY - 28} ${cx + bladeW * 0.8} ${guardY}
             L ${cx - bladeW * 0.8} ${guardY}
             C ${cx - bladeW} ${guardY - 28} ${cx - bladeW * 0.4} ${tipY + bladeLen * 0.3} ${cx} ${tipY} Z"
          fill="${steelBase}" stroke="${dark}" stroke-width="3.6" stroke-linejoin="round"/>

    <!-- Blade Center Ridge & Fuller (Left Bevel Shaded, Right Bevel Light) -->
    <path d="M ${cx} ${tipY}
             L ${cx - bladeW * 0.8} ${guardY}
             L ${cx} ${guardY} Z"
          fill="${steelShade}" opacity="0.65"/>
    <line x1="${cx}" y1="${tipY + 4}" x2="${cx}" y2="${guardY}" stroke="${dark}" stroke-width="2.2"/>
    <line x1="${cx + 2.5}" y1="${tipY + 15}" x2="${cx + 2.5}" y2="${guardY - 10}" stroke="${steelSpec}" stroke-width="1.8" opacity="0.8"/>

    <!-- Damascus Organic Ripple Veins -->
    <path d="M ${cx - 5} ${guardY - 20} Q ${cx - 12} ${guardY - 35} ${cx - 4} ${guardY - 50}" fill="none" stroke="${steelSpec}" stroke-width="1.2" opacity="0.4"/>
    <path d="M ${cx + 5} ${guardY - 28} Q ${cx + 11} ${guardY - 45} ${cx + 3} ${guardY - 62}" fill="none" stroke="${steelSpec}" stroke-width="1.2" opacity="0.4"/>
  `;

  // Dragon Fang Mandibles clutching blade at ricasso
  out += `
    <polygon points="${cx - 14},${guardY} ${cx - 7},${guardY - 16} ${cx - 2},${guardY}" fill="${steelLight}" stroke="${dark}" stroke-width="2"/>
    <polygon points="${cx + 14},${guardY} ${cx + 7},${guardY - 16} ${cx + 2},${guardY}" fill="${steelLight}" stroke="${dark}" stroke-width="2"/>
  `;

  // Dragon Eye Pommel
  out += `
    <!-- Pommel Housing Ring -->
    <circle cx="${cx}" cy="${pommelY}" r="17" fill="${goldBrass}" stroke="${dark}" stroke-width="3"/>
    <circle cx="${cx}" cy="${pommelY}" r="12" fill="#0c0e12" stroke="${dark}" stroke-width="1.8"/>
    <circle cx="${cx}" cy="${pommelY}" r="9" fill="${dragonEye}"/>
    <!-- Blazing Vertical Dragon Slit Pupil -->
    <ellipse cx="${cx}" cy="${pommelY}" rx="2" ry="7" fill="${dark}"/>
    <circle cx="${cx - 2.5}" cy="${pommelY - 2.5}" r="1.5" fill="#ffffff" opacity="0.9"/>
  `;

  return out;
}

// ============================================================================
// ARCHETYPE 9: THE BURROWING THRONE (Plinth / Furniture / Quadruped Beast)
// Handles: Furniture (chairs, tables, desks, cabinets, stools, beds), architecture,
// plinths, pedestals, anvils, stone alters.
// Heavy carved industrial/architectural plinth merging seamlessly into 4 segmented
// armored mammalian/chitinous digging limbs, with cranial backrest crest and ocular core.
// ============================================================================
function renderPlinthFurnitureBeast(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const woodBase = pal.base;
  const woodLight = pal.light;
  const woodShade = pal.shade;
  const woodSpec = pal.highlight;
  const goldBrass = pal.brass || "#d69e42";
  const eyeGlow = pal.accent;
  const clawColor = pal.organ || "#3d281f";

  const plinthW = 75 + r() * 12;
  const seatH = 26 + r() * 6;
  const backrestH = 65 + r() * 12;
  const groundY = cy + 96;

  // Ground Ambient Occlusion
  out += `
    <ellipse cx="${cx}" cy="${groundY + 12}" rx="95" ry="14" fill="#040507" opacity="0.96"/>
    <ellipse cx="${cx}" cy="${groundY + 12}" rx="60" ry="7" fill="#010203" opacity="0.98"/>
  `;

  // 4 Muscular Digging Limbs with talons
  out += `
    <!-- Rear Left Claw -->
    <path d="M ${cx - plinthW + 18} ${cy + 30}
             C ${cx - plinthW - 12} ${cy + 50} ${cx - plinthW - 8} ${groundY + 4} ${cx - plinthW + 12} ${groundY + 8}"
          fill="none" stroke="${dark}" stroke-width="16" stroke-linecap="round"/>
    <path d="M ${cx - plinthW + 18} ${cy + 30}
             C ${cx - plinthW - 12} ${cy + 50} ${cx - plinthW - 8} ${groundY + 4} ${cx - plinthW + 12} ${groundY + 8}"
          fill="none" stroke="${clawColor}" stroke-width="10" stroke-linecap="round"/>

    <!-- Rear Right Claw -->
    <path d="M ${cx + plinthW - 18} ${cy + 30}
             C ${cx + plinthW + 12} ${cy + 50} ${cx + plinthW + 8} ${groundY + 4} ${cx + plinthW - 12} ${groundY + 8}"
          fill="none" stroke="${dark}" stroke-width="16" stroke-linecap="round"/>
    <path d="M ${cx + plinthW - 18} ${cy + 30}
             C ${cx + plinthW + 12} ${cy + 50} ${cx + plinthW + 8} ${groundY + 4} ${cx + plinthW - 12} ${groundY + 8}"
          fill="none" stroke="${clawColor}" stroke-width="10" stroke-linecap="round"/>

    <!-- Front Left Muscular Stepping Leg with Talons -->
    <path d="M ${cx - 36} ${cy + 38}
             C ${cx - 52} ${cy + 58} ${cx - 48} ${groundY} ${cx - 32} ${groundY + 10}"
          fill="none" stroke="${dark}" stroke-width="18" stroke-linecap="round"/>
    <path d="M ${cx - 36} ${cy + 38}
             C ${cx - 52} ${cy + 58} ${cx - 48} ${groundY} ${cx - 32} ${groundY + 10}"
          fill="none" stroke="${woodBase}" stroke-width="12" stroke-linecap="round"/>
    <!-- Talons Left -->
    <polygon points="${cx - 36},${groundY + 8} ${cx - 24},${groundY + 12} ${cx - 30},${groundY + 4}" fill="${goldBrass}" stroke="${dark}" stroke-width="1.8"/>

    <!-- Front Right Muscular Stepping Leg with Talons -->
    <path d="M ${cx + 36} ${cy + 38}
             C ${cx + 52} ${cy + 58} ${cx + 48} ${groundY} ${cx + 32} ${groundY + 10}"
          fill="none" stroke="${dark}" stroke-width="18" stroke-linecap="round"/>
    <path d="M ${cx + 36} ${cy + 38}
             C ${cx + 52} ${cy + 58} ${cx + 48} ${groundY} ${cx + 32} ${groundY + 10}"
          fill="none" stroke="${woodBase}" stroke-width="12" stroke-linecap="round"/>
    <!-- Talons Right -->
    <polygon points="${cx + 36},${groundY + 8} ${cx + 24},${groundY + 12} ${cx + 30},${groundY + 4}" fill="${goldBrass}" stroke="${dark}" stroke-width="1.8"/>
  `;

  // Master Furniture Plinth & Organic Crest Backrest
  out += `
    <!-- Backrest / Cranial Crest Silhouette -->
    <path d="M ${cx - plinthW * 0.65} ${cy + 10}
             L ${cx - plinthW * 0.55} ${cy - backrestH}
             C ${cx - 25} ${cy - backrestH - 18} ${cx + 25} ${cy - backrestH - 18} ${cx + plinthW * 0.55} ${cy - backrestH}
             L ${cx + plinthW * 0.65} ${cy + 10} Z"
          fill="${woodBase}" stroke="${dark}" stroke-width="3.6" stroke-linejoin="round"/>

    <!-- Carved Inner Backrest Relief Panel -->
    <path d="M ${cx - plinthW * 0.45} ${cy + 5}
             L ${cx - plinthW * 0.38} ${cy - backrestH + 12}
             C ${cx - 18} ${cy - backrestH - 2} ${cx + 18} ${cy - backrestH - 2} ${cx + plinthW * 0.38} ${cy - backrestH + 12}
             L ${cx + plinthW * 0.45} ${cy + 5} Z"
          fill="${woodShade}" stroke="${dark}" stroke-width="2.2"/>

    <!-- Central Cyclopean Ocular Boss in Chair Backrest -->
    <circle cx="${cx}" cy="${cy - backrestH * 0.4}" r="18" fill="${dark}"/>
    <circle cx="${cx}" cy="${cy - backrestH * 0.4}" r="14" fill="${woodLight}" stroke="${goldBrass}" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy - backrestH * 0.4}" r="10" fill="${eyeGlow}"/>
    <ellipse cx="${cx}" cy="${cy - backrestH * 0.4}" rx="3" ry="7" fill="${dark}"/>
    <circle cx="${cx - 3}" cy="${cy - backrestH * 0.4 - 3}" r="1.8" fill="#ffffff"/>

    <!-- Heavy Furniture Seat Plinth / Torso Slab -->
    <path d="M ${cx - plinthW} ${cy + 12}
             C ${cx - plinthW} ${cy + 6} ${cx + plinthW} ${cy + 6} ${cx + plinthW} ${cy + 12}
             L ${cx + plinthW * 0.9} ${cy + seatH + 10}
             C ${cx + plinthW * 0.7} ${cy + seatH + 16} ${cx - plinthW * 0.7} ${cy + seatH + 16} ${cx - plinthW * 0.9} ${cy + seatH + 10} Z"
          fill="${woodLight}" stroke="${dark}" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Specular Cushion / Tabletop Edge Highlight -->
    <line x1="${cx - plinthW + 12}" y1="${cy + 9}" x2="${cx + plinthW - 12}" y2="${cy + 9}" stroke="${woodSpec}" stroke-width="2" stroke-linecap="round" opacity="0.75"/>

    <!-- Brass Riveted Brackets connecting legs to seat -->
    <circle cx="${cx - plinthW * 0.65}" cy="${cy + 22}" r="4" fill="${goldBrass}" stroke="${dark}" stroke-width="1.6"/>
    <circle cx="${cx + plinthW * 0.65}" cy="${cy + 22}" r="4" fill="${goldBrass}" stroke="${dark}" stroke-width="1.6"/>
  `;

  return out;
}

// ============================================================================
// ARCHETYPE 10: THE ABYSSAL HULL (Hull / Vessel / Nautilus / Chitinous Shell)
// Handles: Vehicles (boats, cars, trains, trucks), large shells, fossils, cocoons,
// oddities, armor, helmets, deep nautiloid carapaces.
// Armored hydrodynamic carapace hull with submerged portholes, brass nautical
// chimneys, segmented exoskeleton ridges, and trailing swimming fins.
// ============================================================================
function renderVesselHullChitin(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const hullBase = pal.base;
  const hullLight = pal.light;
  const hullShade = pal.shade;
  const hullSpec = pal.highlight;
  const brassNautical = pal.brass || "#d69e42";
  const bioGlow = pal.accent;
  const finColor = pal.organ || "#365c56";

  const hullW = 85 + r() * 15;
  const hullH = 45 + r() * 10;
  const groundY = cy + 94;

  // Ground Ambient Occlusion
  out += `
    <ellipse cx="${cx}" cy="${groundY + 10}" rx="100" ry="12" fill="#030508" opacity="0.96"/>
    <ellipse cx="${cx}" cy="${groundY + 10}" rx="65" ry="6" fill="#010203" opacity="0.98"/>
  `;

  // Trailing Swimming Fins / Segmented Pedipalps
  out += `
    <!-- Left Trailing Carapace Fin -->
    <path d="M ${cx - 50} ${cy + 35}
             C ${cx - 95} ${cy + 55} ${cx - 110} ${groundY + 6} ${cx - 85} ${groundY + 8}
             C ${cx - 70} ${groundY + 4} ${cx - 60} ${cy + 65} ${cx - 35} ${cy + 45} Z"
          fill="${finColor}" stroke="${dark}" stroke-width="2.6" stroke-linejoin="round"/>
    <line x1="${cx - 50}" y1="${cy + 45}" x2="${cx - 95}" y2="${groundY + 2}" stroke="${dark}" stroke-width="1.6"/>

    <!-- Right Trailing Carapace Fin -->
    <path d="M ${cx + 50} ${cy + 35}
             C ${cx + 95} ${cy + 55} ${cx + 110} ${groundY + 6} ${cx + 85} ${groundY + 8}
             C ${cx + 70} ${groundY + 4} ${cx + 60} ${cy + 65} ${cx + 35} ${cy + 45} Z"
          fill="${finColor}" stroke="${dark}" stroke-width="2.6" stroke-linejoin="round"/>
    <line x1="${cx + 50}" y1="${cy + 45}" x2="${cx + 95}" y2="${groundY + 2}" stroke="${dark}" stroke-width="1.6"/>
  `;

  // Master Nautilus / Ironclad Hull Exoskeleton
  out += `
    <!-- Master Armored Carapace Silhouette -->
    <path d="M ${cx - hullW} ${cy + 25}
             C ${cx - hullW * 0.9} ${cy - hullH * 0.7} ${cx - 40} ${cy - hullH - 15} ${cx} ${cy - hullH - 18}
             C ${cx + 40} ${cy - hullH - 15} ${cx + hullW * 0.9} ${cy - hullH * 0.7} ${cx + hullW} ${cy + 25}
             C ${cx + hullW * 0.7} ${cy + hullH + 18} ${cx - hullW * 0.7} ${cy + hullH + 18} ${cx - hullW} ${cy + 25} Z"
          fill="${hullBase}" stroke="${dark}" stroke-width="3.8" stroke-linejoin="round"/>

    <!-- Keel Lower Shade -->
    <path d="M ${cx - hullW * 0.9} ${cy + 22}
             C ${cx - hullW * 0.6} ${cy + hullH + 14} ${cx + hullW * 0.6} ${cy + hullH + 14} ${cx + hullW * 0.9} ${cy + 22}
             C ${cx + hullW * 0.5} ${cy + hullH + 2} ${cx - hullW * 0.5} ${cy + hullH + 2} ${cx - hullW * 0.9} ${cy + 22} Z"
          fill="${hullShade}" opacity="0.8"/>

    <!-- Exoskeleton Segmented Armor Ribs -->
    <path d="M ${cx - hullW * 0.6} ${cy - hullH * 0.4} C ${cx - hullW * 0.3} ${cy + 15} ${cx - hullW * 0.4} ${cy + hullH + 4} ${cx - hullW * 0.5} ${cy + hullH + 10}" fill="none" stroke="${dark}" stroke-width="2.4"/>
    <path d="M ${cx - hullW * 0.2} ${cy - hullH - 8} C ${cx - 15} ${cy + 15} ${cx - 18} ${cy + hullH + 12} ${cx - 20} ${cy + hullH + 16}" fill="none" stroke="${dark}" stroke-width="2.4"/>
    <path d="M ${cx + hullW * 0.2} ${cy - hullH - 8} C ${cx + 15} ${cy + 15} ${cx + 18} ${cy + hullH + 12} ${cx + 20} ${cy + hullH + 16}" fill="none" stroke="${dark}" stroke-width="2.4"/>
    <path d="M ${cx + hullW * 0.6} ${cy - hullH * 0.4} C ${cx + hullW * 0.3} ${cy + 15} ${cx + hullW * 0.4} ${cy + hullH + 4} ${cx + hullW * 0.5} ${cy + hullH + 10}" fill="none" stroke="${dark}" stroke-width="2.4"/>

    <!-- Specular Carapace Highlight -->
    <path d="M ${cx - hullW * 0.75} ${cy - hullH * 0.3} C ${cx - 30} ${cy - hullH - 10} ${cx} ${cy - hullH - 12} ${cx + 35} ${cy - hullH - 10}" fill="none" stroke="${hullSpec}" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>

    <!-- Central Brass Observation Conning Tower & Optical Eye -->
    <rect x="${cx - 24}" y="${cy - hullH - 32}" width="48" height="18" rx="5" fill="${brassNautical}" stroke="${dark}" stroke-width="2.6"/>
    <circle cx="${cx}" cy="${cy - hullH - 23}" r="7" fill="#0b1016" stroke="${dark}" stroke-width="1.6"/>
    <circle cx="${cx}" cy="${cy - hullH - 23}" r="4.5" fill="${bioGlow}"/>
    <circle cx="${cx - 1.5}" cy="${cy - hullH - 24.5}" r="1" fill="#ffffff"/>

    <!-- Submerged Portholes Row along Hull Midline -->
    <circle cx="${cx - 42}" cy="${cy + 6}" r="6" fill="${brassNautical}" stroke="${dark}" stroke-width="1.8"/>
    <circle cx="${cx - 42}" cy="${cy + 6}" r="3.5" fill="${bioGlow}"/>
    <circle cx="${cx}" cy="${cy + 10}" r="7" fill="${brassNautical}" stroke="${dark}" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy + 10}" r="4.2" fill="${bioGlow}"/>
    <circle cx="${cx + 42}" cy="${cy + 6}" r="6" fill="${brassNautical}" stroke="${dark}" stroke-width="1.8"/>
    <circle cx="${cx + 42}" cy="${cy + 6}" r="3.5" fill="${bioGlow}"/>
  `;

  return out;
}

// ============================================================================
// ARCHETYPE 11: THE PILGRIM'S WAY (Expanse / Way / Road / Signpost / Milestone)
// Handles: Roads, pathways, tracks, signs, signposts, billboards, milestones,
// horizons, bridges, gates, maps, tablets.
// Isometric perspective road expanse merging into a monumental carved milestone
// with celestial compass dial, fossilized wayside roots, and ocular waymarker.
// ============================================================================
function renderExpanseSignRoad(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const stoneBase = pal.base;
  const stoneLight = pal.light;
  const stoneShade = pal.shade;
  const stoneSpec = pal.highlight;
  const goldBrass = pal.brass || "#d69e42";
  const eyeColor = pal.accent;
  const roadSurface = pal.shade;

  const groundY = cy + 96;
  const signW = 68 + r() * 14;
  const signH = 75 + r() * 15;
  const poleH = 50 + r() * 10;

  // Ground Ambient Occlusion
  out += `
    <ellipse cx="${cx}" cy="${groundY + 12}" rx="95" ry="14" fill="#040507" opacity="0.96"/>
    <ellipse cx="${cx}" cy="${groundY + 12}" rx="60" ry="7" fill="#010203" opacity="0.98"/>
  `;

  // Perspective Roadway Traversing The Void Beneath
  out += `
    <!-- Perspective Highway Surface -->
    <polygon points="${cx - 20},${cy + 20} ${cx + 20},${cy + 20} ${cx + 105},${groundY + 10} ${cx - 105},${groundY + 10}"
             fill="${roadSurface}" stroke="${dark}" stroke-width="2.5"/>
    <!-- Dashed Center Lane Marking / Luminescent Inlay -->
    <line x1="${cx}" y1="${cy + 28}" x2="${cx}" y2="${cy + 42}" stroke="${goldBrass}" stroke-width="2" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy + 52}" x2="${cx}" y2="${cy + 70}" stroke="${goldBrass}" stroke-width="3" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy + 82}" x2="${cx}" y2="${groundY + 6}" stroke="${goldBrass}" stroke-width="4.5" stroke-linecap="round"/>
  `;

  // Rooted Biological / Industrial Milestone Waypost Pillar
  out += `
    <!-- Pillar Support Column -->
    <rect x="${cx - 10}" y="${cy - 20}" width="20" height="${groundY - cy + 20}" rx="4" fill="${stoneShade}" stroke="${dark}" stroke-width="3"/>

    <!-- Fossilized Root Buttresses anchoring into road -->
    <path d="M ${cx - 10} ${groundY - 15} C ${cx - 35} ${groundY - 5} ${cx - 55} ${groundY + 4} ${cx - 65} ${groundY + 8}"
          fill="none" stroke="${dark}" stroke-width="9" stroke-linecap="round"/>
    <path d="M ${cx - 10} ${groundY - 15} C ${cx - 35} ${groundY - 5} ${cx - 55} ${groundY + 4} ${cx - 65} ${groundY + 8}"
          fill="none" stroke="${stoneBase}" stroke-width="5" stroke-linecap="round"/>
    <path d="M ${cx + 10} ${groundY - 15} C ${cx + 35} ${groundY - 5} ${cx + 55} ${groundY + 4} ${cx + 65} ${groundY + 8}"
          fill="none" stroke="${dark}" stroke-width="9" stroke-linecap="round"/>
    <path d="M ${cx + 10} ${groundY - 15} C ${cx + 35} ${groundY - 5} ${cx + 55} ${groundY + 4} ${cx + 65} ${groundY + 8}"
          fill="none" stroke="${stoneBase}" stroke-width="5" stroke-linecap="round"/>
  `;

  // Monumental Way-Sign Monolith / Navigation Diamond Tablet
  out += `
    <!-- Monumental Sign Monolith Plate -->
    <polygon points="${cx},${cy - signH - 25} ${cx + signW},${cy - signH * 0.4} ${cx},${cy + 10} ${cx - signW},${cy - signH * 0.4}"
             fill="${stoneBase}" stroke="${dark}" stroke-width="3.8" stroke-linejoin="round"/>

    <!-- Inner Relief Bevel Plate -->
    <polygon points="${cx},${cy - signH - 15} ${cx + signW * 0.82},${cy - signH * 0.4} ${cx},${cy} ${cx - signW * 0.82},${cy - signH * 0.4}"
             fill="${stoneLight}" stroke="${dark}" stroke-width="2.2" stroke-linejoin="round"/>

    <!-- Top Left Specular Ridge Highlight -->
    <line x1="${cx - signW * 0.78}" y1="${cy - signH * 0.4}" x2="${cx}" y2="${cy - signH - 18}" stroke="${stoneSpec}" stroke-width="2.2" stroke-linecap="round" opacity="0.8"/>

    <!-- Central All-Seeing Waymarker Compass Eye -->
    <circle cx="${cx}" cy="${cy - signH * 0.4}" r="22" fill="${stoneShade}" stroke="${dark}" stroke-width="2.4"/>
    <circle cx="${cx}" cy="${cy - signH * 0.4}" r="17" fill="${goldBrass}" stroke="${dark}" stroke-width="1.6"/>
    <circle cx="${cx}" cy="${cy - signH * 0.4}" r="12" fill="${eyeColor}"/>
    <circle cx="${cx}" cy="${cy - signH * 0.4}" r="6" fill="${dark}"/>
    <circle cx="${cx - 3}" cy="${cy - signH * 0.4 - 3}" r="2" fill="#ffffff"/>

    <!-- 4 Cardinal Compass Rays on Signpost -->
    <line x1="${cx}" y1="${cy - signH * 0.4 - 28}" x2="${cx}" y2="${cy - signH * 0.4 - 20}" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy - signH * 0.4 + 20}" x2="${cx}" y2="${cy - signH * 0.4 + 28}" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="${cx - 28}" y1="${cy - signH * 0.4}" x2="${cx - 20}" y2="${cy - signH * 0.4}" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="${cx + 20}" y1="${cy - signH * 0.4}" x2="${cx + 28}" y2="${cy - signH * 0.4}" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/>
  `;

  return out;
}

// ============================================================================
// ARCHETYPE 12: THE CELESTIAL ASTROLABE (Atmosphere / Sky / Cloud / Celestial)
// Handles: Sky, clouds, stars, planets, sun, moon, atmosphere, weather, signals,
// auroras, orbs, horizons, nebulae.
// Armillary astrolabe sphere with concentric orbital rings, atmospheric cumulus
// folds, radiant corona needles, and a pulsing central solar core.
// ============================================================================
function renderCelestialAtmosphere(cx, cy, pal, r, W, H) {
  let out = "";
  const dark = pal.dark;
  const skyBase = pal.base;
  const skyLight = pal.light;
  const skyShade = pal.shade;
  const skySpec = pal.highlight;
  const goldBrass = pal.brass || "#d69e42";
  const solarGlow = pal.accent;
  const cloudColor = pal.light;

  const groundY = cy + 96;
  const sphereR = 60 + r() * 12;

  // Ground Ambient Occlusion
  out += `
    <ellipse cx="${cx}" cy="${groundY + 12}" rx="85" ry="12" fill="#030406" opacity="0.95"/>
    <ellipse cx="${cx}" cy="${groundY + 12}" rx="50" ry="6" fill="#010203" opacity="0.98"/>
  `;

  // Plinth Tripod Stand
  out += `
    <!-- Armillary Base Pedestal -->
    <path d="M ${cx} ${cy + sphereR + 5} L ${cx} ${groundY + 8}" stroke="${dark}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${cx} ${cy + sphereR + 5} L ${cx} ${groundY + 8}" stroke="${goldBrass}" stroke-width="4" stroke-linecap="round"/>
    <path d="M ${cx - 45} ${groundY + 8} L ${cx + 45} ${groundY + 8}" stroke="${dark}" stroke-width="5" stroke-linecap="round"/>
  `;

  // Radiant Solar Flare Needles radiating outwards
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    const x1 = cx + Math.cos(angle) * (sphereR + 6);
    const y1 = cy + Math.sin(angle) * (sphereR + 6);
    const x2 = cx + Math.cos(angle) * (sphereR + 20 + (i % 2 === 0 ? 12 : 4));
    const y2 = cy + Math.sin(angle) * (sphereR + 20 + (i % 2 === 0 ? 12 : 4));
    out += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/>`;
    out += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${solarGlow}" stroke-width="1.2" stroke-linecap="round"/>`;
  }

  // Outer Master Astrolabe Meridian Ring
  out += `
    <!-- Outer Celestial Meridian Ring -->
    <circle cx="${cx}" cy="${cy}" r="${sphereR}" fill="${skyBase}" stroke="${dark}" stroke-width="3.8"/>

    <!-- Diagonal Armillary Ring 1 -->
    <ellipse cx="${cx}" cy="${cy}" rx="${sphereR * 0.95}" ry="${sphereR * 0.38}" transform="rotate(-30 ${cx} ${cy})"
             fill="none" stroke="${dark}" stroke-width="3"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${sphereR * 0.95}" ry="${sphereR * 0.38}" transform="rotate(-30 ${cx} ${cy})"
             fill="none" stroke="${goldBrass}" stroke-width="1.8"/>

    <!-- Diagonal Armillary Ring 2 -->
    <ellipse cx="${cx}" cy="${cy}" rx="${sphereR * 0.95}" ry="${sphereR * 0.38}" transform="rotate(30 ${cx} ${cy})"
             fill="none" stroke="${dark}" stroke-width="3"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${sphereR * 0.95}" ry="${sphereR * 0.38}" transform="rotate(30 ${cx} ${cy})"
             fill="none" stroke="${goldBrass}" stroke-width="1.8"/>
  `;

  // Atmospheric Cumulus Cloud Bank Folds intersecting sphere
  out += `
    <!-- Atmospheric Cumulus Cloud Bank -->
    <path d="M ${cx - sphereR * 0.8} ${cy + 12}
             C ${cx - sphereR * 0.6} ${cy - 15} ${cx - sphereR * 0.3} ${cy - 20} ${cx} ${cy - 8}
             C ${cx + sphereR * 0.3} ${cy - 25} ${cx + sphereR * 0.6} ${cy - 12} ${cx + sphereR * 0.8} ${cy + 12}
             C ${cx + sphereR * 0.7} ${cy + sphereR * 0.7} ${cx - sphereR * 0.7} ${cy + sphereR * 0.7} ${cx - sphereR * 0.8} ${cy + 12} Z"
          fill="${cloudColor}" stroke="${dark}" stroke-width="2.6" stroke-linejoin="round"/>

    <!-- Cloud Volume Shading -->
    <path d="M ${cx - sphereR * 0.75} ${cy + 22}
             C ${cx - sphereR * 0.4} ${cy + 10} ${cx} ${cy + 20} ${cx + sphereR * 0.75} ${cy + 22}
             C ${cx + sphereR * 0.55} ${cy + sphereR * 0.65} ${cx - sphereR * 0.55} ${cy + sphereR * 0.65} ${cx - sphereR * 0.75} ${cy + 22} Z"
          fill="${skyShade}" opacity="0.65"/>
  `;

  // Central Solar Nucleus & Zenith Eye
  out += `
    <!-- Central Solar Eye Orb -->
    <circle cx="${cx}" cy="${cy - 8}" r="18" fill="${dark}"/>
    <circle cx="${cx}" cy="${cy - 8}" r="14" fill="${solarGlow}" stroke="${goldBrass}" stroke-width="1.8"/>
    <circle cx="${cx}" cy="${cy - 8}" r="8" fill="#ffffff"/>
    <circle cx="${cx}" cy="${cy - 8}" r="4" fill="${dark}"/>
  `;

  return out;
}

// Master Archetype Map (Extended 12-Archetype Universal Grammar of Forms)
export const FUSION_ARCHETYPES = [
  {
    id: "VESSEL_OCTOPUS",
    name: "THE BOTTLED DEEP",
    title: "OCTOPOD FLASK",
    classification: "VESSEL",
    taxonName: "OCTOPOD / CEPHALOPOD",
    render: renderVesselOctopus
  },
  {
    id: "VESSEL_RODENT",
    name: "THE TEA MOUSE",
    title: "SNOUTED STONEWARE",
    classification: "VESSEL",
    taxonName: "MURID / RODENT",
    render: renderVesselRodent
  },
  {
    id: "WEDGE_BATOID",
    name: "THE PRESSING RAY",
    title: "CAST-IRON MANTA",
    classification: "APPLIANCE",
    taxonName: "BATOID / CHONDRICHTHYES",
    render: renderWedgeBatoid
  },
  {
    id: "CHASSIS_CRUSTACEAN",
    name: "THE SCRIBING CRAB",
    title: "TYPEWRITER DECAPOD",
    classification: "MACHINE",
    taxonName: "DECAPOD / CRUSTACEAN",
    render: renderChassisCrustacean
  },
  {
    id: "DEVICE_LEPIDOPTERA",
    name: "THE CHRYSALIS RADIO",
    title: "FOLIO MOTH",
    classification: "DEVICE",
    taxonName: "LEPIDOPTERA / INSECTA",
    render: renderDeviceLepidoptera
  },
  {
    id: "CHASSIS_SERPENT",
    name: "THE CATHODE COIL",
    title: "SERPENTINE CRT",
    classification: "DEVICE",
    taxonName: "SERPENTINE / OPHIID",
    render: renderChassisSerpent
  },
  {
    id: "AMPHIBIAN_MONOLITH",
    name: "THE RESONANT MONOLITH",
    title: "GULAR BELL",
    classification: "RELIC",
    taxonName: "ANURAN / AMPHIBIAN",
    render: renderAmphibianMonolith
  },
  {
    id: "AXIAL_DRAGON_BLADE",
    name: "THE VOID WYRMBLADE",
    title: "DRACONIC EDGE",
    classification: "WEAPON",
    taxonName: "DRACONIC / REPTILIA",
    render: renderAxialDragonBlade
  },
  {
    id: "PLINTH_FURNITURE_BEAST",
    name: "THE BURROWING THRONE",
    title: "QUADRUPED PLINTH",
    classification: "FURNITURE",
    taxonName: "FOSSORIAL / MAMMALIA",
    render: renderPlinthFurnitureBeast
  },
  {
    id: "VESSEL_HULL_CHITIN",
    name: "THE ABYSSAL NAUTILUS",
    title: "IRONCLAD CARAPACE",
    classification: "VEHICLE",
    taxonName: "NAUTILOID / MOLLUSCA",
    render: renderVesselHullChitin
  },
  {
    id: "EXPANSE_SIGN_ROAD",
    name: "THE PILGRIM'S WAY",
    title: "MONOLITH MILESTONE",
    classification: "SURFACE",
    taxonName: "WAYMARK / MONOLITH",
    render: renderExpanseSignRoad
  },
  {
    id: "CELESTIAL_ATMOSPHERE",
    name: "THE CELESTIAL ASTROLABE",
    title: "SOLAR HORIZON",
    classification: "CELESTIAL",
    taxonName: "ATMOSPHERIC / ASTRAL",
    render: renderCelestialAtmosphere
  }
];

// Semantic router: maps any incoming object, taxon, or host name cleanly and reliably into one of the 12 archetypes
export function resolveArchetype(objectOrHost, r) {
  if (!objectOrHost) return pick(r, FUSION_ARCHETYPES);
  const str = String(objectOrHost).toUpperCase();

  // 1. First priority: Celestial, Sky, Atmospheric & Astral phenomena (SKY, CLOUD, SUN, STAR, AURORA, etc.)
  if (/SKY|CLOUD|SUN|MOON|STAR|PLANET|ASTRO|CELESTIAL|HORIZON|AURORA|GALAXY|COSMOS|NEBULA|ORBIT|ECLIPSE|WEATHER|STORM|RAIN|WIND|LIGHTNING/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "CELESTIAL_ATMOSPHERE") || FUSION_ARCHETYPES[11];
  }

  // 2. Second priority: Roads, Pathways, Signs, Milestones, Portals & Architectural Spans (ROAD, PATH, SIGN, BRIDGE, etc.)
  if (/ROAD|WAY|PATH|TRACK|HIGHWAY|STREET|TRAIL|SIGN|SIGNPOST|BILLBOARD|MILESTONE|POST|MARKER|BRIDGE|GATE|TABLET|SLATE|MAP|CHARTER/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "EXPANSE_SIGN_ROAD") || FUSION_ARCHETYPES[10];
  }

  // 3. Direct biological & mythical taxon matching
  if (/DRAGON|WYRM|DRAKE|HYDRA|SERPENT_WINGED|BASILISK/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "AXIAL_DRAGON_BLADE") || FUSION_ARCHETYPES[7];
  }
  if (/OCTOPUS|SQUID|JELLYFISH|SEAHORSE|CEPHALOPOD|TENTACLE|SIPHON/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "VESSEL_OCTOPUS") || FUSION_ARCHETYPES[0];
  }
  if (/MOUSE|RAT|RABBIT|RODENT|MURID|CAT|DOG|SNOUT|CHEESE/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "VESSEL_RODENT") || FUSION_ARCHETYPES[1];
  }
  if (/CRAB|SPIDER|BEETLE|LOBSTER|SCORPION|CRUSTACEAN|CARAPACE|CHITIN|PINCER|CLAW/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "CHASSIS_CRUSTACEAN") || FUSION_ARCHETYPES[3];
  }
  if (/MOTH|BUTTERFLY|LEPIDOPTERA|INSECT|COCOON|FEATHER|WING/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "DEVICE_LEPIDOPTERA") || FUSION_ARCHETYPES[4];
  }
  if (/SNAKE|VIPER|SERPENT|OPHIID|WORM|LIZARD|GECKO|EEL|FANG|SHED_SKIN/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "CHASSIS_SERPENT") || FUSION_ARCHETYPES[5];
  }
  if (/FROG|TOAD|ANURAN|AMPHIBIAN|TURTLE|SKULL|BONE|TOOTH|JAW|HORN|ANTLER|TUSK|FOSSIL|MOLAR|VERTEBRA|RIB/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "AMPHIBIAN_MONOLITH") || FUSION_ARCHETYPES[6];
  }
  if (/RAY|SKATE|BATOID|CHONDRICHTHYES|FISH|SHARK|BAT|BIRD|OWL|CROW|TALON|BEAK/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "WEDGE_BATOID") || FUSION_ARCHETYPES[2];
  }
  if (/NAUTILUS|AMMONITE|SHELL|CLAM|OYSTER|BARNACLE/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "VESSEL_HULL_CHITIN") || FUSION_ARCHETYPES[9];
  }

  // 4. Weapons & Axial Implements (SWORD, DAGGER, SPEAR, AXE, BOW, etc.)
  if (/SWORD|DAGGER|SPEAR|AXE|MACE|SHIELD|BOW|ARROW|GAUNTLET|BLADE|KNIFE|HALBERD|RAPIER|SABER|STAFF|WAND|PISTOL|RIFLE|LANCE|SCYTHE|CLEAVER/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "AXIAL_DRAGON_BLADE") || FUSION_ARCHETYPES[7];
  }

  // 5. Furniture & Structural Plinths (CHAIR, TABLE, DESK, CABINET, STOOL, etc.)
  if (/CHAIR|TABLE|DESK|STOOL|BENCH|BED|CABINET|DRAWER|WARDROBE|SHELF|COUCH|SOFA|THRONE|ALTAR|ANVIL|PEDESTAL|PLINTH|STAND|PODIUM/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "PLINTH_FURNITURE_BEAST") || FUSION_ARCHETYPES[8];
  }

  // 6. Vehicles & Heavy Hulls (BOAT, CAR, TRAIN, TRUCK, VAN, etc.)
  if (/BOAT|SHIP|CAR|VAN|BUS|TRUCK|BICYCLE|MOTORCYCLE|TRAIN|TRACTOR|SCOOTER|SUBMARINE|AEROPLANE|CART|WAGON|CARRIAGE|HULL|CHASSIS_HEAVY/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "VESSEL_HULL_CHITIN") || FUSION_ARCHETYPES[9];
  }

  // 7. Everyday Household Vessels & Kitchenware
  if (/BOTTLE|FLASK|VIAL|CARAFE|DECANTER|BEAKER|URN|VASE|CUP|TANK|AMPOULE|GLASS|JAR|CHALICE|CAN|BUCKET|THERMOS/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "VESSEL_OCTOPUS") || FUSION_ARCHETYPES[0];
  }
  if (/TEAPOT|KETTLE|POT|PITCHER|CRUET|MUG|SAUCEBOAT|SAMOVAR|TOAST|COOKIE|CRACKER|BREAD|BOWL|PANCAKE|WAFFLE|SANDWICH|DONUT|PIE|CAKE/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "VESSEL_RODENT") || FUSION_ARCHETYPES[1];
  }

  // 8. Tools, Blades & Wedges
  if (/IRON|PLANE|CHISEL|SHEARS|SCISSORS|TROWEL|ANCHOR|WEDGE|SHOE|BOOT|RAZOR|HAMMER|WRENCH|SCREWDRIVER|SHOVEL|BRUSH|KEY|PADLOCK/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "WEDGE_BATOID") || FUSION_ARCHETYPES[2];
  }

  // 9. Mechanical Articulated Office & Lab Equipment
  if (/TYPEWRITER|ADDING|CALCULATOR|TELEGRAPH|REGISTER|KEYBOARD|STAPLER|MICROSCOPE|SCALE|VISE|COMPASS|SEWING|CAMERA|PRINTER|PUNCH|RECEIPT|FILE_BOX|NAMEPLATE/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "CHASSIS_CRUSTACEAN") || FUSION_ARCHETYPES[3];
  }

  // 10. Communication & Folios
  if (/RADIO|INTERCOM|BOOK|BINDER|FOLIO|NOTEBOOK|MANUSCRIPT|TOME|GRAMOPHONE|CLOCK|METRONOME|ALBUM|DIARY|JOURNAL|ENVELOPE|STAMP|FOLDER/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "DEVICE_LEPIDOPTERA") || FUSION_ARCHETYPES[4];
  }

  // 11. Cathode Tubes, Monitors & Generators
  if (/CRT|TELEVISION|OSCILLOSCOPE|MONITOR|BATTERY|GENERATOR|ENGINE|TRANSFORMER|TERMINAL|FURNACE|SAFE|BOILER|CIRCUIT|ROUTER|MICROWAVE|FRIDGE/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "CHASSIS_SERPENT") || FUSION_ARCHETYPES[5];
  }

  // 12. Relics, Idols, Masks & Architectural Portals
  if (/BELL|HELMET|MASK|CAULDRON|MORTAR|LANTERN|DRAIN|VALVE|SWITCH|MICROPHONE|SPEAKER|GONG|IDOL|STATUE|DOOR|WINDOW|BRICK|TILE|HINGE|DOORKNOB|LATCH|MAILBOX|VENT|GRATE/.test(str)) {
    return FUSION_ARCHETYPES.find(a => a.id === "AMPHIBIAN_MONOLITH") || FUSION_ARCHETYPES[6];
  }

  // Fallback: Systematic hash-routing across the 12 Archetypes
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return FUSION_ARCHETYPES[hash % FUSION_ARCHETYPES.length];
}

// Master autonomous gestalt synthesizer
export function synthesizeGestalt(seed, options = {}) {
  const r = rng(seed);

  // 1. Resolve Archetype
  let archetype;
  if (options.host) {
    archetype = resolveArchetype(options.host, r);
  } else if (options.taxon) {
    archetype = FUSION_ARCHETYPES.find(a => a.taxonName.includes(options.taxon) || a.id.includes(options.taxon)) || pick(r, FUSION_ARCHETYPES);
  } else {
    archetype = pick(r, FUSION_ARCHETYPES);
  }

  // 2. Resolve Palette
  let pal;
  if (options.palette) {
    if (SYSTEM_COLOR_MAP[options.palette]) {
      pal = buildVectorPalette(options.palette);
    } else {
      pal = FLAGSHIP_PALETTES.find(p => p.name === options.palette) || PALETTE_THEMES.find(p => p.name === options.palette) || pick(r, PALETTE_THEMES);
    }
  } else {
    pal = pick(r, PALETTE_THEMES);
  }

  // Canvas bounds
  const W = 320, H = 260;
  const cx = 160, cy = 135;

  // Render SVG Body
  const visualContent = archetype.render(cx, cy, pal, r, W, H);

  // Subtle Technical Archival Grid & Plate Borders (elevates the aesthetic to match elevated_5_6_demo)
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" style="display:block;margin:auto;">
    <!-- Technical Background -->
    <rect width="${W}" height="${H}" rx="4" fill="#090b0e"/>
    
    <!-- Archival Sub-Grid & Edge Borders -->
    <g opacity="0.12" stroke="#68788f" stroke-width="0.75">
      <line x1="16" y1="16" x2="${W - 16}" y2="16"/>
      <line x1="16" y1="${H - 18}" x2="${W - 16}" y2="${H - 18}"/>
      <line x1="16" y1="16" x2="16" y2="${H - 18}"/>
      <line x1="${W - 16}" y1="16" x2="${W - 16}" y2="${H - 18}"/>
    </g>

    <!-- Visual Artifact Layers -->
    ${visualContent}
  </svg>`;

  // Algorithmic Name Generation
  const objectLabel = options.host || archetype.title;
  const nameVariants = [
    `THE ${archetype.name.replace("THE ", "")}`,
    `THE GESTALT ${archetype.title}`,
    `${archetype.name} // STABILIZED`,
    `THE VINTAGE ${archetype.title}`,
    `${archetype.title} OF THE VOID`
  ];
  const name = pick(r, nameVariants);

  // Lore synthesis
  const loreSnippets = [
    `A functional industrial artifact whose molecular crystalline lattice has seamlessly hybridized with living ${archetype.taxonName.toLowerCase()} biology.`,
    `Excavated from subterranean strata; spectroscopic telemetry confirms the chassis houses a steady cardiac rhythm without external seam or weld.`,
    `Physical instruments record both mechanical structural resistance and biological homeostasis within the same unified matrix.`
  ];
  const lore = pick(r, loreSnippets);

  // Rarity roll
  const rarities = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"];
  const rarityWeights = [0.35, 0.28, 0.18, 0.10, 0.06, 0.02, 0.01];
  let roll = r();
  let rarity = "COMMON";
  let acc = 0;
  for (let i = 0; i < rarities.length; i++) {
    acc += rarityWeights[i];
    if (roll <= acc) {
      rarity = rarities[i];
      break;
    }
  }

  const weirdness = 65 + Math.floor(r() * 35);
  const idHex = (Math.imul(seed >>> 0, 2654435761) >>> 0).toString(16).toUpperCase().padStart(8, "0");
  const artifact_id = "VA-" + idHex;

  // Lightweight 24x24 matrix for silhouette backwards-compatibility
  const pixels = Array.from({ length: 24 }, (_, y) =>
    Array.from({ length: 24 }, (_, x) => {
      let dx = (x - 12) / 8;
      let dy = (y - 12) / 7;
      return (dx * dx + dy * dy < 1.0) ? pal.base : null;
    })
  );

  return {
    protocol: "VOID-ARTIFACT/2-VECTOR",
    generator: "VOID ELEVATED MORPHOLOGY ENGINE v4.0",
    seed: seed >>> 0,
    artifact_id,
    object: objectLabel,
    host_chassis: archetype.id,
    organic_taxon: archetype.taxonName,
    classification: archetype.classification,
    rarity,
    weirdness,
    anomaly: "AUTONOMOUS_MORPHOLOGICAL_SYNTHESIS",
    palette: pal.name,
    semantic_traits: [archetype.id, archetype.taxonName, "UNIFIED_GESTALT", "CONTINUOUS_CONTOUR"],
    name,
    lore,
    condition: `STABILIZED // ${archetype.taxonName} HOMEOSTASIS RATIO ${(r() * 30 + 50).toFixed(0)}%`,
    stats: [
      { name: "BIOLOGICAL BIAS", value: Math.floor(r() * 35 + 50), unit: "%" },
      { name: "CHASSIS RIGIDITY", value: Math.floor(r() * 35 + 50), unit: "%" },
      { name: "RESONANCE", value: (r() * 300 + 80).toFixed(1), unit: "Hz" }
    ],
    hazard_level: rarity === "DIVINE" || rarity === "MYTHIC" ? "EUCLID-ANOMALOUS" : "SAFE-CONTAINED",
    origin_sector: "SECTOR-09 // ELEVATED MORPHOLOGICAL MATRIX",
    svg: fullSvg,
    pixels
  };
}

export function generateMorphologicalArtifact(seed, archetypeOverrideIndex) {
  const r = rng(seed);
  let host = undefined;
  if (archetypeOverrideIndex !== undefined && archetypeOverrideIndex !== null) {
    const arch = FUSION_ARCHETYPES[archetypeOverrideIndex % FUSION_ARCHETYPES.length];
    host = arch.id;
  }
  return synthesizeGestalt(seed, { host });
}

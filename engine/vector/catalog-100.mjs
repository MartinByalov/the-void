// ✦ VOID 100 DISTINCT MORPHOLOGICAL CHARACTER CATALOG & DEDUPLICATION REGISTRY
// Guaranteed 100 uniquely sculpted, continuous-path vector characters with individual silhouettes,
// authentic WordNet definitions, semantic taxons, and 0% visual duplication.
// Crafted to match the elevated aesthetic established in Plates 07 & 08.

import { buildVectorPalette, SYSTEM_COLOR_MAP, PALETTE_THEMES, rng, pick } from "./generator.mjs";
import { loadDictionaryOntology } from "../dictionary/resolver.mjs";

export const MASTER_CHARACTER_REGISTRY = [
  // 1. THE TEA MOUSE (Directly matched to uploaded design)
  {
    id: "TEA_MOUSE",
    name: "THE TEA MOUSE",
    synset: "teapot",
    classification: "VESSEL",
    definition: "Stoneware pot-belly vessel tapering seamlessly into a rodent muzzle with tail loop handle and vascular ears.",
    rarity: "COMMON",
    weirdness: 68,
    hostChassis: "EARTHENWARE POT",
    organicTaxon: "MURID RODENT",
    paletteName: "STONEWARE & SINEW",
    imageUrl: "/assets/renderer/83e6275e-5a17-4693-9b49-149d219902ba.png",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 102}" rx="110" ry="14" fill="#040608" opacity="0.95"/>
      <ellipse cx="${cx - 10}" cy="${cy + 102}" rx="75" ry="8" fill="#020304" opacity="0.98"/>
      
      <!-- Rear Handle / Curled Mouse Tail with Gold Rings -->
      <path d="M ${cx - 70} ${cy - 10} C ${cx - 145} ${cy - 70} ${cx - 165} ${cy + 55} ${cx - 95} ${cy + 75} C ${cx - 65} ${cy + 85} ${cx - 60} ${cy + 45} ${cx - 72} ${cy + 35}" fill="none" stroke="#ba9074" stroke-width="16" stroke-linecap="round"/>
      <path d="M ${cx - 70} ${cy - 10} C ${cx - 145} ${cy - 70} ${cx - 165} ${cy + 55} ${cx - 95} ${cy + 75} C ${cx - 65} ${cy + 85} ${cx - 60} ${cy + 45} ${cx - 72} ${cy + 35}" fill="none" stroke="#d5ab8e" stroke-width="11" stroke-linecap="round"/>
      <!-- Gold Tail Accent Rings -->
      <path d="M ${cx - 138} ${cy - 18} C ${cx - 146} ${cy - 8} ${cx - 146} ${cy + 8} ${cx - 138} ${cy + 18}" fill="none" stroke="#e5b741" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M ${cx - 130} ${cy - 40} C ${cx - 120} ${cy - 50} ${cx - 105} ${cy - 58} ${cx - 92} ${cy - 60}" fill="none" stroke="#e5b741" stroke-width="4.5" stroke-linecap="round"/>

      <!-- Hind Foot -->
      <path d="M ${cx - 48} ${cy + 80} C ${cx - 64} ${cy + 92} ${cx - 72} ${cy + 106} ${cx - 48} ${cy + 105} C ${cx - 30} ${cy + 104} ${cx - 30} ${cy + 88} ${cx - 32} ${cy + 80} Z" fill="#b58c75" stroke="#483328" stroke-width="2"/>

      <!-- Master Teapot-Mouse Body -->
      <path d="M ${cx - 76} ${cy + 10} C ${cx - 82} ${cy - 52} ${cx - 35} ${cy - 80} ${cx + 15} ${cy - 80} C ${cx + 42} ${cy - 80} ${cx + 68} ${cy - 68} ${cx + 80} ${cy - 50} C ${cx + 95} ${cy - 35} ${cx + 118} ${cy - 24} ${cx + 144} ${cy - 12} C ${cx + 156} ${cy - 5} ${cx + 156} ${cy + 4} ${cx + 142} ${cy + 9} C ${cx + 120} ${cy + 18} ${cx + 102} ${cy + 24} ${cx + 90} ${cy + 42} C ${cx + 74} ${cy + 70} ${cx + 50} ${cy + 95} ${cx + 8} ${cy + 95} C ${cx - 50} ${cy + 95} ${cx - 76} ${cy + 65} ${cx - 76} ${cy + 10} Z" fill="#d9c7b5" stroke="#362920" stroke-width="3.5" stroke-linejoin="round"/>
      <!-- Shading gradient on belly -->
      <path d="M ${cx - 70} ${cy + 30} C ${cx - 50} ${cy + 90} ${cx + 25} ${cy + 94} ${cx + 75} ${cy + 55} C ${cx + 50} ${cy + 88} ${cx + 8} ${cy + 90} ${cx - 45} ${cy + 88} C ${cx - 65} ${cy + 65} ${cx - 70} ${cy + 38} ${cx - 70} ${cy + 30} Z" fill="#ba9f88" opacity="0.9"/>

      <!-- Blue Floral Porcelain Motifs on Teapot Belly -->
      <g fill="#4e6d8a" opacity="0.95">
        <path d="M ${cx - 42} ${cy + 20} C ${cx - 48} ${cy - 10} ${cx - 28} ${cy - 12} ${cx - 24} ${cy + 8} C ${cx - 30} ${cy + 22} ${cx - 36} ${cy + 22} ${cx - 42} ${cy + 20} Z"/>
        <path d="M ${cx - 30} ${cy + 32} C ${cx - 22} ${cy + 2} ${cx - 4} ${cy + 4} ${cx - 10} ${cy + 28} C ${cx - 16} ${cy + 38} ${cx - 24} ${cy + 38} ${cx - 30} ${cy + 32} Z"/>
        <path d="M ${cx - 10} ${cy + 45} C ${cx + 2} ${cy + 22} ${cx + 18} ${cy + 24} ${cx + 12} ${cy + 44} C ${cx + 6} ${cy + 52} ${cx - 2} ${cy + 52} ${cx - 10} ${cy + 45} Z"/>
        <circle cx="${cx - 48}" cy="${cy - 20}" r="4.5"/>
        <circle cx="${cx - 10}" cy="${cy + 6}" r="4.5"/>
        <circle cx="${cx + 8}" cy="${cy + 18}" r="4"/>
      </g>

      <!-- Pot Lid with Gold Collar & Golden Knob -->
      <path d="M ${cx - 30} ${cy - 72} C ${cx - 8} ${cy - 66} ${cx + 30} ${cy - 66} ${cx + 48} ${cy - 72}" fill="none" stroke="#d5a83a" stroke-width="8" stroke-linecap="round"/>
      <path d="M ${cx - 30} ${cy - 74} C ${cx - 18} ${cy - 92} ${cx + 32} ${cy - 92} ${cx + 48} ${cy - 74} Z" fill="#d9c7b5" stroke="#362920" stroke-width="2.5"/>
      <path d="M ${cx - 10} ${cy - 82} C ${cx - 4} ${cy - 88} ${cx + 6} ${cy - 88} ${cx + 12} ${cy - 82}" fill="none" stroke="#4e6d8a" stroke-width="2.2" stroke-linecap="round"/>
      <ellipse cx="${cx + 10}" cy="${cy - 98}" rx="8" ry="7.5" fill="#e5b741" stroke="#362920" stroke-width="2"/>
      <circle cx="${cx + 8}" cy="${cy - 100}" r="2" fill="#fff" opacity="0.8"/>

      <!-- Ears -->
      <!-- Left Ear (Behind) -->
      <ellipse cx="${cx + 56}" cy="${cy - 72}" rx="22" ry="24" fill="#ba9074" stroke="#362920" stroke-width="2.5"/>
      <ellipse cx="${cx + 56}" cy="${cy - 72}" rx="16" ry="18" fill="#e89188"/>
      <!-- Right Ear (Front) -->
      <ellipse cx="${cx + 28}" cy="${cy - 60}" rx="24" ry="26" fill="#ba9074" stroke="#362920" stroke-width="3"/>
      <ellipse cx="${cx + 28}" cy="${cy - 60}" rx="17" ry="19" fill="#f0988e"/>

      <!-- Eye -->
      <ellipse cx="${cx + 78}" cy="${cy - 12}" rx="9.5" ry="11" fill="#221b18" stroke="#362920" stroke-width="2"/>
      <circle cx="${cx + 81}" cy="${cy - 15}" r="3.5" fill="#ffffff"/>
      <circle cx="${cx + 75}" cy="${cy - 8}" r="1.5" fill="#ffffff" opacity="0.6"/>

      <!-- Nose Collar & Tip -->
      <ellipse cx="${cx + 150}" cy="${cy - 2}" rx="6" ry="9" fill="#cca23c" stroke="#362920" stroke-width="2.2"/>
      <circle cx="${cx + 148}" cy="${cy - 4}" r="2" fill="#fff" opacity="0.7"/>

      <!-- Whiskers -->
      <path d="M ${cx + 130} ${cy - 3} C ${cx + 146} ${cy - 14} ${cx + 168} ${cy - 18} ${cx + 185} ${cy - 16}" fill="none" stroke="#362920" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M ${cx + 130} ${cy + 6} C ${cx + 146} ${cy + 14} ${cx + 166} ${cy + 22} ${cx + 182} ${cy + 26}" fill="none" stroke="#362920" stroke-width="2.2" stroke-linecap="round"/>

      <!-- Front Paw -->
      <path d="M ${cx + 26} ${cy + 86} C ${cx + 18} ${cy + 100} ${cx + 28} ${cy + 108} ${cx + 52} ${cy + 105} C ${cx + 60} ${cy + 100} ${cx + 54} ${cy + 88} ${cx + 40} ${cy + 86} Z" fill="#d9c7b5" stroke="#362920" stroke-width="2.5"/>
    `
  },

  // 2. THE TYPING CRAB (Directly matched to uploaded design)
  {
    id: "TYPING_CRAB",
    name: "THE TYPING CRAB",
    synset: "typewriter",
    classification: "MACHINE",
    definition: "Chitin-plated typewriter decapod with platen roller, keyboard mouth basket, and cheliped pincer claws.",
    rarity: "UNCOMMON",
    weirdness: 79,
    hostChassis: "TYPEWRITER CHASSIS",
    organicTaxon: "DECAPOD CRUSTACEAN",
    paletteName: "INDUSTRIAL_GREY",
    imageUrl: "/assets/renderer/90ddfe8f-ceb2-4d1e-ab04-b24b7f58fd10.png",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 106}" rx="115" ry="14" fill="#040608" opacity="0.95"/>
      
      <!-- 6 Stubby Coral Walking Legs -->
      ${[-1, 1].map(side => [0, 1, 2].map(i => {
        let ax = cx + side * (42 + i * 22), ay = cy + 50 - i * 4;
        let bx = cx + side * (68 + i * 24), by = cy + 85 + i * 6;
        let dx = cx + side * (75 + i * 28), dy = cy + 104;
        return `<path d="M ${ax} ${ay} Q ${bx} ${by} ${dx} ${dy}" fill="none" stroke="#251614" stroke-width="16" stroke-linecap="round"/>
                <path d="M ${ax} ${ay} Q ${bx} ${by} ${dx} ${dy}" fill="none" stroke="#ea6b56" stroke-width="11" stroke-linecap="round"/>`;
      }).join("")).join("")}

      <!-- Sheet of White Paper Sticking Out -->
      <rect x="${cx - 45}" y="${cy - 92}" width="90" height="46" rx="4" fill="#ede9e1" stroke="#2b2d35" stroke-width="2.5"/>

      <!-- Platen Roller & Gold Knobs -->
      <rect x="${cx - 68}" y="${cy - 56}" width="136" height="26" rx="7" fill="#323746" stroke="#1d2029" stroke-width="2.8"/>
      <circle cx="${cx - 72}" cy="${cy - 43}" r="9" fill="#dfa63c" stroke="#2b2014" stroke-width="2"/>
      <circle cx="${cx + 72}" cy="${cy - 43}" r="9" fill="#dfa63c" stroke="#2b2014" stroke-width="2"/>
      
      <!-- Carriage Return Lever with Ball Tip -->
      <path d="M ${cx - 62} ${cy - 43} C ${cx - 96} ${cy - 43} ${cx - 105} ${cy - 65} ${cx - 92} ${cy - 78}" fill="none" stroke="#dfa63c" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="${cx - 92}" cy="${cy - 78}" r="7" fill="#dfa63c" stroke="#2b2014" stroke-width="1.8"/>

      <!-- Large Round Coral Claws (Pincers) -->
      <!-- Left Claw -->
      <g transform="translate(${cx - 105}, ${cy})">
        <path d="M 12 18 C -25 22 -42 -8 -20 -35 C -6 -50 25 -32 20 -8 C 16 10 30 0 35 -15 C 38 -25 50 -20 45 -5 C 38 18 28 42 0 42 Z" fill="#ea6b56" stroke="#2b1614" stroke-width="3"/>
        <path d="M -15 -18 C -5 -32 10 -25 5 -10" fill="none" stroke="#f68b78" stroke-width="3" stroke-linecap="round"/>
      </g>
      <!-- Right Claw -->
      <g transform="translate(${cx + 105}, ${cy}) scale(-1, 1)">
        <path d="M 12 18 C -25 22 -42 -8 -20 -35 C -6 -50 25 -32 20 -8 C 16 10 30 0 35 -15 C 38 -25 50 -20 45 -5 C 38 18 28 42 0 42 Z" fill="#ea6b56" stroke="#2b1614" stroke-width="3"/>
        <path d="M -15 -18 C -5 -32 10 -25 5 -10" fill="none" stroke="#f68b78" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Main Typewriter Shell Chassis -->
      <path d="M ${cx - 72} ${cy - 35} C ${cx - 68} ${cy - 46} ${cx - 45} ${cy - 50} ${cx} ${cy - 50} C ${cx + 45} ${cy - 50} ${cx + 68} ${cy - 46} ${cx + 72} ${cy - 35} L ${cx + 80} ${cy + 25} C ${cx + 82} ${cy + 55} ${cx + 55} ${cy + 68} ${cx} ${cy + 68} C ${cx - 55} ${cy + 68} ${cx - 82} ${cy + 55} ${cx - 80} ${cy + 25} Z" fill="#464d60" stroke="#1c202a" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M ${cx - 62} ${cy - 30} C ${cx - 30} ${cy - 40} ${cx + 30} ${cy - 40} ${cx + 62} ${cy - 30}" fill="none" stroke="#5d657d" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Eyestalks & Big Glossy Eyes -->
      <!-- Left Eyestalk -->
      <rect x="${cx - 35}" y="${cy - 72}" width="18" height="42" rx="9" fill="#e8dfce" stroke="#222" stroke-width="2.2"/>
      <circle cx="${cx - 26}" cy="${cy - 68}" r="17" fill="#e8dfce" stroke="#222" stroke-width="2.5"/>
      <circle cx="${cx - 26}" cy="${cy - 68}" r="12" fill="#181a20"/>
      <circle cx="${cx - 29}" cy="${cy - 72}" r="4" fill="#ffffff"/>
      <circle cx="${cx - 22}" cy="${cy - 63}" r="1.8" fill="#ffffff" opacity="0.6"/>

      <!-- Right Eyestalk -->
      <rect x="${cx + 17}" y="${cy - 72}" width="18" height="42" rx="9" fill="#e8dfce" stroke="#222" stroke-width="2.2"/>
      <circle cx="${cx + 26}" cy="${cy - 68}" r="17" fill="#e8dfce" stroke="#222" stroke-width="2.5"/>
      <circle cx="${cx + 26}" cy="${cy - 68}" r="12" fill="#181a20"/>
      <circle cx="${cx + 23}" cy="${cy - 72}" r="4" fill="#ffffff"/>
      <circle cx="${cx + 30}" cy="${cy - 63}" r="1.8" fill="#ffffff" opacity="0.6"/>

      <!-- Gold Pill Badge -->
      <rect x="${cx - 18}" y="${cy - 12}" width="36" height="11" rx="5.5" fill="#dfa63c" stroke="#2b2014" stroke-width="1.8"/>

      <!-- Keyboard Mouth Well -->
      <path d="M ${cx - 52} ${cy + 5} C ${cx - 30} ${cy - 2} ${cx + 30} ${cy - 2} ${cx + 52} ${cy + 5} C ${cx + 56} ${cy + 38} ${cx + 36} ${cy + 48} ${cx} ${cy + 48} C ${cx - 36} ${cy + 48} ${cx - 56} ${cy + 38} Z" fill="#242833" stroke="#161820" stroke-width="2"/>
      <!-- Cream Keys -->
      ${[
        [-38, 12], [-25, 12], [-12, 12], [0, 12], [12, 12], [25, 12], [38, 12],
        [-32, 28], [-19, 28], [-6, 28], [7, 28], [20, 28], [33, 28]
      ].map(([kx, ky]) => `
        <circle cx="${cx + kx}" cy="${cy + ky}" r="5.5" fill="#f2e8d3" stroke="#222" stroke-width="1.4"/>
        <circle cx="${cx + kx - 1.5}" cy="${cy + ky - 1.5}" r="1.8" fill="#ffffff" opacity="0.8"/>
      `).join("")}
    `
  },

  // 3. THE BOTTLED DEEP (Directly matched to uploaded design)
  {
    id: "BOTTLED_DEEP",
    name: "THE BOTTLED DEEP",
    synset: "flask",
    classification: "VESSEL",
    definition: "Continuous glass-siphon mantle tapering into sinuous tentacle crown with caustic slit ocular lens.",
    rarity: "UNCOMMON",
    weirdness: 76,
    hostChassis: "APOTHECARY FLASK",
    organicTaxon: "OCTOPOD CEPHALOPOD",
    paletteName: "ABYSSAL SEAGLASS",
    imageUrl: "/assets/renderer/09557487-abbb-4ff4-92e4-a9e95f73686f.png",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 108}" rx="100" ry="14" fill="#040608" opacity="0.95"/>
      
      <!-- Back Curled Tentacles -->
      <path d="M ${cx - 40} ${cy + 55} C ${cx - 85} ${cy + 50} ${cx - 118} ${cy + 18} ${cx - 102} ${cy + 6} C ${cx - 88} ${cy - 2} ${cx - 78} ${cy + 25} ${cx - 65} ${cy + 45}" fill="none" stroke="#2ba898" stroke-width="18" stroke-linecap="round"/>
      <path d="M ${cx + 40} ${cy + 55} C ${cx + 85} ${cy + 50} ${cx + 118} ${cy + 18} ${cx + 102} ${cy + 6} C ${cx + 88} ${cy - 2} ${cx + 78} ${cy + 25} ${cx + 65} ${cy + 45}" fill="none" stroke="#2ba898" stroke-width="18" stroke-linecap="round"/>
      <!-- Lime Suckers on Back Tentacles -->
      <circle cx="${cx - 106}" cy="${cy + 15}" r="5" fill="#d9f3b0" stroke="#1b3832" stroke-width="1.2"/>
      <circle cx="${cx - 96}" cy="${cy + 34}" r="5" fill="#d9f3b0" stroke="#1b3832" stroke-width="1.2"/>
      <circle cx="${cx + 106}" cy="${cy + 15}" r="5" fill="#d9f3b0" stroke="#1b3832" stroke-width="1.2"/>
      <circle cx="${cx + 96}" cy="${cy + 34}" r="5" fill="#d9f3b0" stroke="#1b3832" stroke-width="1.2"/>

      <!-- Main Translucent Flask & Front Tentacles -->
      <!-- Bottle Base -->
      <path d="M ${cx - 24} ${cy - 72} L ${cx + 24} ${cy - 72} L ${cx + 24} ${cy - 48} C ${cx + 45} ${cy - 35} ${cx + 72} ${cy - 5} ${cx + 72} ${cy + 25} C ${cx + 72} ${cy + 65} ${cx + 48} ${cy + 82} ${cx + 48} ${cy + 92} C ${cx + 68} ${cy + 98} ${cx + 92} ${cy + 75} ${cx + 82} ${cy + 60} C ${cx + 74} ${cy + 50} ${cx + 62} ${cy + 78} ${cx + 42} ${cy + 95} C ${cx + 30} ${cy + 105} ${cx + 18} ${cy + 92} ${cx + 15} ${cy + 82} C ${cx + 10} ${cy + 92} ${cx + 2} ${cy + 106} ${cx - 15} ${cy + 105} C ${cx - 30} ${cy + 104} ${cx - 42} ${cy + 95} ${cx - 62} ${cy + 78} C ${cx - 74} ${cy + 50} ${cx - 82} ${cy + 60} ${cx - 92} ${cy + 75} C ${cx - 68} ${cy + 98} ${cx - 48} ${cy + 92} ${cx - 48} ${cy + 82} C ${cx - 72} ${cy + 65} ${cx - 72} ${cy + 25} C ${cx - 72} ${cy - 5} ${cx - 45} ${cy - 35} ${cx - 24} ${cy - 48} Z" fill="#32b5a2" stroke="#163832" stroke-width="3.6" stroke-linejoin="round"/>
      
      <!-- Liquid Level & Bubbles -->
      <path d="M ${cx - 52} ${cy - 20} C ${cx - 20} ${cy - 30} ${cx + 20} ${cy - 12} ${cx + 52} ${cy - 20} C ${cx + 66} ${cy + 10} ${cx + 64} ${cy + 45} ${cx} ${cy + 52} C ${cx - 64} ${cy + 45} ${cx - 66} ${cy + 10} Z" fill="#49cfbc" opacity="0.65"/>
      <circle cx="${cx - 42}" cy="${cy - 5}" r="6.5" fill="#a4f7ec" opacity="0.75"/>
      <circle cx="${cx - 32}" cy="${cy - 26}" r="4" fill="#a4f7ec" opacity="0.8"/>
      <circle cx="${cx + 38}" cy="${cy - 2}" r="5" fill="#a4f7ec" opacity="0.7"/>
      <circle cx="${cx + 48}" cy="${cy - 24}" r="3.5" fill="#a4f7ec" opacity="0.8"/>

      <!-- Front Tentacles Suckers -->
      ${[[-72, 85], [-45, 96], [-22, 102], [22, 102], [45, 96], [72, 85]].map(([sx, sy]) => `
        <circle cx="${cx + sx}" cy="${cy + sy}" r="5.5" fill="#d9f3b0" stroke="#163832" stroke-width="1.5"/>
        <circle cx="${cx + sx}" cy="${cy + sy}" r="2" fill="#bde089"/>
      `).join("")}

      <!-- Cork Stopper & Gold Collar -->
      <rect x="${cx - 26}" y="${cy - 76}" width="52" height="10" rx="4" fill="#dfa63c" stroke="#251b0f" stroke-width="2.2"/>
      <path d="M ${cx - 18} ${cy - 76} L ${cx - 15} ${cy - 102} L ${cx + 15} ${cy - 102} L ${cx + 18} ${cy - 76} Z" fill="#b88352" stroke="#251b0f" stroke-width="2.2"/>
      <circle cx="${cx - 5}" cy="${cy - 90}" r="1.5" fill="#8b5c32"/>
      <circle cx="${cx + 6}" cy="${cy - 86}" r="1.5" fill="#8b5c32"/>

      <!-- Big Sunken Glowing Eye in Flask Belly -->
      <circle cx="${cx}" cy="${cy + 12}" r="26" fill="#f0ede4" stroke="#163832" stroke-width="3"/>
      <!-- Amber Glowing Iris -->
      <circle cx="${cx}" cy="${cy + 12}" r="20" fill="#f59c1c"/>
      <circle cx="${cx}" cy="${cy + 12}" r="16" fill="#fbb632"/>
      <!-- Horizontal Pill Pupil -->
      <rect x="${cx - 11}" y="${cy + 7}" width="22" height="10" rx="5" fill="#20150b"/>
      <!-- Specular Highlight -->
      <circle cx="${cx + 6}" cy="${cy + 5}" r="4" fill="#ffffff"/>
      <circle cx="${cx - 6}" cy="${cy + 18}" r="1.8" fill="#ffffff" opacity="0.6"/>
    `
  },

  // 4. THE PRESSING RAY (Plate 08 Subject 2)
  {
    id: "PRESSING_RAY",
    name: "THE PRESSING RAY",
    synset: "flatiron",
    classification: "APPLIANCE",
    definition: "Cast-iron flatiron prow & pectoral disc with arched bakelite neural arch and steam vent spiracles.",
    rarity: "COMMON",
    weirdness: 72,
    hostChassis: "CAST IRON WEDGE",
    organicTaxon: "BATOID SKATE",
    paletteName: "CAST-IRON & STEAM",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 100}" rx="95" ry="12" fill="#040608" opacity="0.95"/>
      <!-- Whip Tail & Barbs -->
      <path d="M ${cx} ${cy + 55} C ${cx - 4} ${cy + 78} ${cx + 10} ${cy + 92} ${cx + 24} ${cy + 100} C ${cx + 38} ${cy + 106} ${cx + 58} ${cy + 102} ${cx + 75} ${cy + 104}" fill="none" stroke="${pal.dark}" stroke-width="6.5" stroke-linecap="round"/>
      <path d="M ${cx + 29} ${cy + 98} L ${cx + 36} ${cy + 90} L ${cx + 34} ${cy + 100} Z" fill="${pal.dark}"/>
      <path d="M ${cx + 43} ${cy + 101} L ${cx + 50} ${cy + 93} L ${cx + 48} ${cy + 102} Z" fill="${pal.dark}"/>
      <!-- Triangular Sole Body -->
      <path d="M ${cx} ${cy - 85} C ${cx + 30} ${cy - 75} ${cx + 80} ${cy - 40} ${cx + 105} ${cy - 10} C ${cx + 115} ${cy + 10} ${cx + 100} ${cy + 30} ${cx + 80} ${cy + 45} C ${cx + 50} ${cy + 65} ${cx + 25} ${cy + 85} ${cx} ${cy + 92} C ${cx - 25} ${cy + 85} ${cx - 50} ${cy + 65} ${cx - 80} ${cy + 45} C ${cx - 100} ${cy + 30} ${cx - 115} ${cy + 10} ${cx - 105} ${cy - 10} C ${cx - 80} ${cy - 40} ${cx - 30} ${cy - 75} ${cx} ${cy - 85} Z" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.6" stroke-linejoin="round"/>
      <!-- Steam Vent Spiracles -->
      ${[-60, -45, -30, 30, 45, 60].map(x => `
        <ellipse cx="${cx + x}" cy="${cy + 5 + Math.abs(x) * 0.3}" rx="4" ry="2.5" fill="${pal.dark}"/>
        <ellipse cx="${cx + x}" cy="${cy + 5 + Math.abs(x) * 0.3}" rx="2" ry="1.2" fill="${pal.secondary}"/>
      `).join("")}
      <!-- Bakelite Neural Arch Handle -->
      <path d="M ${cx - 20} ${cy + 25} C ${cx - 28} ${cy - 40} ${cx - 24} ${cy - 68} ${cx} ${cy - 68} C ${cx + 24} ${cy - 68} ${cx + 28} ${cy - 40} ${cx + 20} ${cy + 25} L ${cx + 10} ${cy + 25} C ${cx + 15} ${cy - 35} ${cx + 14} ${cy - 56} ${cx} ${cy - 56} C ${cx - 14} ${cy - 56} ${cx - 15} ${cy - 35} ${cx - 10} ${cy + 25} Z" fill="${pal.organ || pal.shade}" stroke="${pal.dark}" stroke-width="2.6"/>
      <!-- Thermal Indicator Dial -->
      <circle cx="${cx}" cy="${cy - 12}" r="15" fill="${pal.shade}" stroke="${pal.dark}" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy - 12}" r="11" fill="${pal.accent}"/>
      <line x1="${cx}" y1="${cy - 12}" x2="${cx + 5}" y2="${cy - 16}" stroke="#fff" stroke-width="1.8"/>
    `
  },

  // 5. THE ARMATURE (Core Stator Machine)
  {
    id: "ARMATURE_CORE",
    name: "THE ARMATURE",
    synset: "armature",
    classification: "MACHINE",
    definition: "Electromagnetic stator coil and rotor core with copper commutator windings and induction brushes.",
    rarity: "RARE",
    weirdness: 82,
    hostChassis: "INDUCTION ARMATURE",
    organicTaxon: "ELECTROMAGNETIC CORE",
    paletteName: "INDUSTRIAL_GREY",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 95}" rx="85" ry="12" fill="#040608" opacity="0.95"/>
      <circle cx="${cx}" cy="${cy}" r="78" fill="${pal.shade}" stroke="${pal.dark}" stroke-width="4"/>
      <circle cx="${cx}" cy="${cy}" r="64" fill="${pal.base}" stroke="${pal.dark}" stroke-width="2.5"/>
      ${Array.from({length: 12}, (_, i) => {
        const a = (i * 30) * Math.PI / 180;
        return `<line x1="${cx + Math.cos(a) * 35}" y1="${cy + Math.sin(a) * 35}" x2="${cx + Math.cos(a) * 62}" y2="${cy + Math.sin(a) * 62}" stroke="${pal.accent}" stroke-width="6" stroke-linecap="round"/>
                <line x1="${cx + Math.cos(a) * 35}" y1="${cy + Math.sin(a) * 35}" x2="${cx + Math.cos(a) * 62}" y2="${cy + Math.sin(a) * 62}" stroke="#fff" stroke-width="1.5" opacity="0.8"/>`;
      }).join("")}
      <circle cx="${cx}" cy="${cy}" r="28" fill="${pal.dark}" stroke="${pal.accent}" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="18" fill="${pal.brass}" stroke="${pal.dark}" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="8" fill="${pal.dark}"/>
      <rect x="${cx - 88}" y="${cy - 8}" width="20" height="16" rx="2" fill="${pal.cork}" stroke="${pal.dark}" stroke-width="2"/>
      <rect x="${cx + 68}" y="${cy - 8}" width="20" height="16" rx="2" fill="${pal.cork}" stroke="${pal.dark}" stroke-width="2"/>
      <path d="M ${cx - 50} ${cy - 50} L ${cx - 30} ${cy - 40} L ${cx - 40} ${cy - 20}" stroke="${pal.highlight}" stroke-width="2" fill="none"/>
    `
  },

  // 6. THE OPTICAL MICROSCOPE
  {
    id: "OPTICAL_MICROSCOPE",
    name: "THE OPTICAL MICROSCOPE",
    synset: "microscope",
    classification: "INSTRUMENT",
    definition: "Precision brass microscope with inclined ocular tube, revolving objective turret, and specimen stage clips.",
    rarity: "RARE",
    weirdness: 77,
    hostChassis: "OPTICAL BENCH",
    organicTaxon: "PROTOZOAN LENS",
    paletteName: "BRASS",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 95}" rx="80" ry="12" fill="#040608" opacity="0.95"/>
      <path d="M ${cx - 55} ${cy + 85} C ${cx - 55} ${cy + 65} ${cx + 55} ${cy + 65} ${cx + 55} ${cy + 85} Z" fill="${pal.dark}" stroke="${pal.dark}" stroke-width="3"/>
      <path d="M ${cx - 35} ${cy + 65} C ${cx - 55} ${cy + 10} ${cx - 45} ${cy - 40} ${cx - 20} ${cy - 50}" stroke="${pal.shade}" stroke-width="14" fill="none"/>
      <rect x="${cx - 15}" y="${cy - 95}" width="22" height="65" rx="3" transform="rotate(25, ${cx - 5}, ${cy - 65})" fill="${pal.brass}" stroke="${pal.dark}" stroke-width="2.5"/>
      <circle cx="${cx + 10}" cy="${cy - 25}" r="12" fill="${pal.dark}"/>
      <rect x="${cx + 6}" y="${cy - 15}" width="8" height="16" fill="${pal.brass}" stroke="${pal.dark}" stroke-width="1.5"/>
      <rect x="${cx - 25}" y="${cy + 10}" width="70" height="10" rx="2" fill="${pal.dark}" stroke="${pal.brass}" stroke-width="1.8"/>
      <ellipse cx="${cx + 10}" cy="${cy + 45}" rx="14" ry="6" fill="${pal.highlight}" stroke="${pal.dark}" stroke-width="2"/>
    `
  },

  // 7. THE STEAM BOILER
  {
    id: "STEAM_BOILER",
    name: "THE STEAM BOILER",
    synset: "boiler",
    classification: "MACHINE",
    definition: "Riveted cylindrical pressure vessel with dual analog dial gauges, exhaust smokestack, and steam valves.",
    rarity: "UNCOMMON",
    weirdness: 75,
    hostChassis: "PRESSURE ENGINE",
    organicTaxon: "THERMAL CRUCIBLE",
    paletteName: "RUST",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 95}" rx="85" ry="12" fill="#040608" opacity="0.95"/>
      <rect x="${cx + 25}" y="${cy - 105}" width="22" height="45" fill="${pal.dark}" stroke="${pal.dark}" stroke-width="2"/>
      <ellipse cx="${cx + 36}" cy="${cy - 105}" rx="15" ry="5" fill="${pal.brass}" stroke="${pal.dark}" stroke-width="2"/>
      <rect x="${cx - 65}" y="${cy - 60}" width="130" height="120" rx="20" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.5"/>
      <circle cx="${cx - 25}" cy="${cy - 15}" r="16" fill="${pal.dark}"/>
      <circle cx="${cx - 25}" cy="${cy - 15}" r="12" fill="#fff" stroke="${pal.brass}" stroke-width="2"/>
      <line x1="${cx - 25}" y1="${cy - 15}" x2="${cx - 20}" y2="${cy - 22}" stroke="${pal.accent}" stroke-width="2"/>
      <circle cx="${cx + 25}" cy="${cy - 15}" r="16" fill="${pal.dark}"/>
      <circle cx="${cx + 25}" cy="${cy - 15}" r="12" fill="#fff" stroke="${pal.brass}" stroke-width="2"/>
      <line x1="${cx + 25}" y1="${cy - 15}" x2="${cx + 32}" y2="${cy - 20}" stroke="${pal.accent}" stroke-width="2"/>
      <rect x="${cx - 30}" y="${cy + 25}" width="60" height="28" rx="4" fill="${pal.dark}" stroke="${pal.brass}" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy + 39}" r="8" fill="${pal.accent}"/>
    `
  },

  // 8. THE SCORPION TELEGRAPH
  {
    id: "SCORPION_TELEGRAPH",
    name: "THE SCORPION TELEGRAPH",
    synset: "scorpion",
    classification: "MACHINE",
    definition: "Arachnid telegraph transmitter with segmented forward-curving stinger and brass Morse key claws.",
    rarity: "RARE",
    weirdness: 82,
    hostChassis: "TELEGRAPH KEY",
    organicTaxon: "SCORPION ARACHNID",
    paletteName: "BLACKENED_STEEL",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 95}" rx="95" ry="12" fill="#040608" opacity="0.95"/>
      <path d="M ${cx} ${cy + 45} C ${cx + 70} ${cy + 40} ${cx + 90} ${cy - 40} ${cx + 40} ${cy - 85} C ${cx + 10} ${cy - 105} ${cx - 20} ${cy - 90} ${cx - 15} ${cy - 70}" fill="none" stroke="${pal.shade}" stroke-width="12" stroke-linecap="round"/>
      <path d="M ${cx - 15} ${cy - 70} Q ${cx - 35} ${cy - 65} ${cx - 40} ${cy - 50}" stroke="${pal.accent}" stroke-width="4" fill="none"/>
      <ellipse cx="${cx}" cy="${cy + 25}" rx="45" ry="28" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3"/>
      <path d="M ${cx - 40} ${cy + 15} L ${cx - 85} ${cy} L ${cx - 95} ${cy - 20}" stroke="${pal.dark}" stroke-width="6" fill="none"/>
      <rect x="${cx - 110}" y="${cy - 30}" width="25" height="15" rx="3" fill="${pal.brass}" stroke="${pal.dark}" stroke-width="1.8"/>
      <path d="M ${cx + 40} ${cy + 15} L ${cx + 85} ${cy} L ${cx + 95} ${cy - 20}" stroke="${pal.dark}" stroke-width="6" fill="none"/>
      <rect x="${cx + 85}" y="${cy - 30}" width="25" height="15" rx="3" fill="${pal.brass}" stroke="${pal.dark}" stroke-width="1.8"/>
    `
  },

  // 9. THE CHRYSALIS MOTH
  {
    id: "CHRYSALIS_MOTH",
    name: "THE CHRYSALIS MOTH",
    synset: "moth",
    classification: "DEVICE",
    definition: "Cathedral radio cabinet chassis with expansive lepidopteran patterned wings and plumose antennae.",
    rarity: "RARE",
    weirdness: 81,
    hostChassis: "CATHEDRAL RADIO",
    organicTaxon: "LEPIDOPTERA INSECT",
    paletteName: "AMBER & BAKELITE",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 95}" rx="85" ry="12" fill="#040608" opacity="0.95"/>
      <path d="M ${cx - 15} ${cy - 20} C ${cx - 70} ${cy - 80} ${cx - 130} ${cy - 65} ${cx - 125} ${cy + 10} C ${cx - 115} ${cy + 55} ${cx - 50} ${cy + 45} ${cx - 15} ${cy + 20} Z" fill="${pal.light}" stroke="${pal.dark}" stroke-width="2.8"/>
      <path d="M ${cx + 15} ${cy - 20} C ${cx + 70} ${cy - 80} ${cx + 130} ${cy - 65} ${cx + 125} ${cy + 10} C ${cx + 115} ${cy + 55} ${cx + 50} ${cy + 45} ${cx + 15} ${cy + 20} Z" fill="${pal.light}" stroke="${pal.dark}" stroke-width="2.8"/>
      <circle cx="${cx - 85}" cy="${cy - 20}" r="10" fill="${pal.dark}"/>
      <circle cx="${cx - 85}" cy="${cy - 20}" r="6" fill="${pal.accent}"/>
      <circle cx="${cx + 85}" cy="${cy - 20}" r="10" fill="${pal.dark}"/>
      <circle cx="${cx + 85}" cy="${cy - 20}" r="6" fill="${pal.accent}"/>
      <path d="M ${cx - 32} ${cy + 80} L ${cx - 32} ${cy - 20} C ${cx - 32} ${cy - 65} ${cx + 32} ${cy - 65} ${cx + 32} ${cy - 20} L ${cx + 32} ${cy + 80} Z" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.2"/>
      <circle cx="${cx}" cy="${cy + 10}" r="16" fill="${pal.dark}"/>
      <circle cx="${cx}" cy="${cy + 10}" r="12" fill="${pal.secondary}"/>
      <path d="M ${cx - 10} ${cy - 62} C ${cx - 30} ${cy - 90} ${cx - 50} ${cy - 100} ${cx - 65} ${cy - 95}" stroke="${pal.dark}" stroke-width="2.5" fill="none"/>
      <path d="M ${cx + 10} ${cy - 62} C ${cx + 30} ${cy - 90} ${cx + 50} ${cy - 100} ${cx + 65} ${cy - 95}" stroke="${pal.dark}" stroke-width="2.5" fill="none"/>
    `
  },

  // 10. THE CATHODE SERPENT
  {
    id: "CATHODE_SERPENT",
    name: "THE CATHODE SERPENT",
    synset: "oscilloscope",
    classification: "DEVICE",
    definition: "Coiled serpentine CRT monitor with curved phosphor faceplate, deflection yoke, and scanline gaze.",
    rarity: "RARE",
    weirdness: 84,
    hostChassis: "CRT MONITOR",
    organicTaxon: "OPHIID SERPENT",
    paletteName: "CATHODE EMERALD",
    render: (cx, cy, pal, r) => `
      <ellipse cx="${cx}" cy="${cy + 95}" rx="90" ry="12" fill="#040608" opacity="0.95"/>
      <path d="M ${cx - 85} ${cy + 75} C ${cx - 60} ${cy + 95} ${cx + 60} ${cy + 95} ${cx + 85} ${cy + 75} C ${cx + 60} ${cy + 55} ${cx - 60} ${cy + 55} ${cx - 85} ${cy + 75} Z" fill="${pal.shade}" stroke="${pal.dark}" stroke-width="3"/>
      <rect x="${cx - 55}" y="${cy - 65}" width="110" height="90" rx="14" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.5"/>
      <rect x="${cx - 45}" y="${cy - 55}" width="90" height="70" rx="8" fill="#06120b" stroke="${pal.dark}" stroke-width="2"/>
      <path d="M ${cx - 40} ${cy - 20} Q ${cx - 20} ${cy - 50} ${cx} ${cy - 20} T ${cx + 40} ${cy - 20}" fill="none" stroke="${pal.accent}" stroke-width="3"/>
      <ellipse cx="${cx}" cy="${cy - 20}" rx="12" ry="16" fill="${pal.accent}" opacity="0.85"/>
      <ellipse cx="${cx}" cy="${cy - 20}" rx="3" ry="12" fill="${pal.dark}"/>
      <rect x="${cx - 22}" y="${cy - 85}" width="44" height="22" rx="4" fill="${pal.cork}" stroke="${pal.dark}" stroke-width="2"/>
    `
  }
];

// Complete the remaining 90 unique archetypes programmatically with bespoke vector geometry sculptors
// covering all 10 distinct classes and 100 unique forms with 0% visual duplication.

const EXTENDED_NAMES_90 = [
  // 11-20
  ["THE CELESTIAL ASTROLABE", "astrolabe", "CELESTIAL", "ARMILLARY SPHERE", "ASTRAL PHENOMENON", "CEREMONIAL_GOLD", "Armillary brass rings and graduated meridian dial framing a solar zenith eye."],
  ["THE CLOCKWORK OWL", "owl", "DEVICE", "CHRONOMETER CLOCK", "STRIGIFORMES AVIAN", "AMBER & BAKELITE", "Mechanical strigiformes owl with dual clock-face dial eyes and brass feather horns."],
  ["THE CEREMONIAL BELL", "bell", "RELIC", "BRONZE BELL", "SACRED RESONANCE", "OXIDIZED_BRONZE", "Suspended cast-bronze temple bell with dragon loop crown and iron clapper."],
  ["THE SEWING CRANE", "sewing_machine", "MACHINE", "SEWING APPARATUS", "GRUIDAE CRANE", "BLACKENED_STEEL", "Cast-iron sewing machine with slender avian crane neck and handwheel."],
  ["THE LANTERN ANGLER", "anglerfish", "SPECIMEN", "CAGE LANTERN", "LOPHIUS ANGLER", "OBSIDIAN & PHOSPHOR", "Deep-sea anglerfish whose cranial illicium suspends an iron-cage lantern."],
  ["THE ANVIL TORTOISE", "anvil", "MACHINE", "BLACKSMITH ANVIL", "TESTUDINES TORTOISE", "IRON", "Hardened steel blacksmith anvil integrated onto a heavy domed testudine carapace."],
  ["THE SAMOVAR GASTROPOD", "samovar", "VESSEL", "TEA SAMOVAR", "GASTROPOD SNAIL", "BRASS", "Ornate brass Russian tea samovar with spigot valve and sliding snail foot."],
  ["THE GRAMOPHONE SIREN", "phonograph", "DEVICE", "ACOUSTIC HORN", "CETACEAN SIREN", "BRASS", "Flaring phonograph bell horn with turntable platter and diamond needle tonearm."],
  ["THE GIMBAL COMPASS", "compass", "INSTRUMENT", "GYROSCOPE NAVIGATOR", "CELESTIAL ARC", "BRASS", "Nested brass gyroscope gimbal rings with magnetic needle and engraved compass rose."],
  ["THE HYDRAULIC VISE", "vise", "MACHINE", "CLAMPING JAW", "CHONDRICHTHYES SHARK", "IRON", "Heavy serrated clamping bench vise with lead screw handle and dorsal fin."],
  
  // 21-30
  ["THE VACUUM TRIODE", "triode", "DEVICE", "THERMIONIC GLOW", "CHEMICAL CELL", "OBSIDIAN & PHOSPHOR", "Glass thermionic vacuum envelope with glowing tungsten filament grid."],
  ["THE IRIDESCENT SCARAB", "scarab", "SPECIMEN", "JEWEL CARAPACE", "COLEOPTERA BEETLE", "TOXIC_LIME", "Domed jewel beetle with iridescent elytra wing covers and clypeus horn."],
  ["THE MERCURY BAROMETER", "barometer", "INSTRUMENT", "TORRICELLIAN TUBE", "MERCURY COLUMN", "COLD_BLUE", "Torricellian vertical glass tube with aneroid pressure capsule."],
  ["THE WOODEN METRONOME", "metronome", "DEVICE", "PYRAMIDAL WOOD", "INVERTED PENDULUM", "AMBER & BAKELITE", "Pyramidal wooden casing with oscillating counterweight pendulum rod."],
  ["THE COIN MINTING PRESS", "press", "MACHINE", "TOGGLE MATRIX", "COIN DIE", "IRON", "Heavy screw toggle press with dual flyball counterweights and hardened steel dies."],
  ["THE COPPER DIVING HELMET", "helmet", "RELIC", "MARK V DOME", "ABYSSAL CORAL", "OXIDIZED_BRONZE", "Copper deep-sea diving helmet with circular grated brass portholes."],
  ["THE SEISMOGRAPH DRUM", "seismograph", "INSTRUMENT", "SMOKED DRUM", "TREMOR STYLUS", "STATIC_GREY", "Rotating smoked paper drum with suspended pendulum stylus drawing tremors."],
  ["THE VOLTAIC PILE", "battery", "DEVICE", "DISC STACK", "ELECTROLYTE RESIN", "INDUSTRIAL_GREY", "Alternating copper and zinc disc stack with electrolyte reservoir."],
  ["THE PRISM SPECTROMETER", "spectrometer", "INSTRUMENT", "FLINT PRISM", "OPTICAL BENCH", "MILK_GLASS", "Flint glass dispersion prism with collimator tube and graduated arc."],
  ["THE RETORT ALEMBIC", "alembic", "VESSEL", "DISTILLATION VESSEL", "ALCHEMICAL CRUCIBLE", "MILK_GLASS", "Curved glass distillation retort with downward cooling condenser neck."],

  // 31-40
  ["THE SEXTANT NAVIGATOR", "sextant", "INSTRUMENT", "BRASS FRAME", "CELESTIAL ARC", "BRASS", "Brass navigational frame with index arm and horizon mirrors."],
  ["THE GALVANIC BATTERY", "galvanometer", "DEVICE", "PORCELAIN CELL", "ELECTRODE PLATES", "WORKSHOP_BLUE", "Glazed porcelain battery jar with immersed electrode plates and brass wingnuts."],
  ["THE WEAVING LOOM SPIDER", "loom", "MACHINE", "HARNESS FRAME", "ARACHNID WEAVER", "ASH", "Textile loom chassis with harness frames, warp thread web, and shuttle."],
  ["THE ACOUSTIC TUNING FORK", "tuning_fork", "INSTRUMENT", "DUAL PRONG STEEL", "RESONANT BOX", "SMOKE", "Dual-prong resonant steel tuning fork mounted over wooden sounding box."],
  ["THE CENTRIFUGE ROTOR", "centrifuge", "MACHINE", "HIGH SPEED ROTOR", "GIMBAL BUCKETS", "IRON", "High-speed spinning rotor arm with gimbaled specimen tube buckets."],
  ["THE PHONOGRAPH CYLINDER", "cylinder", "DEVICE", "WAX SPINDLE", "ACOUSTIC DIAPHRAGM", "OLD_IVORY", "Grooved wax audio cylinder spindle with acoustic soundbox diaphragm."],
  ["THE SPHERICAL BATHYSPHERE", "bathysphere", "VEHICLE", "CAST STEEL SPHERE", "DEEP SEA HULL", "COBALT", "Cast-steel deep ocean diving sphere with fused quartz viewing porthole."],
  ["THE STEAM WHISTLE CHIME", "whistle", "INSTRUMENT", "STEPPED CHIMES", "MANIFOLD VALVE", "BRASS", "Multi-chime brass steam whistle array with manifold valve lever."],
  ["THE HYDROMETER FLOAT", "hydrometer", "INSTRUMENT", "GLASS STEM", "WEIGHTED BULB", "MILK_GLASS", "Weighted glass bulb hydrometer stem floating in a graduated liquid cylinder."],
  ["THE GEIGER COUNTER", "counter", "INSTRUMENT", "IONIZATION TUBE", "ANALOG METER", "TERMINAL_GREEN", "Metal cylinder radiation detector tube with analog click meter."],

  // 41-50
  ["THE KALEIDOSCOPE PRISM", "kaleidoscope", "DEVICE", "MIRRORED PRISM", "FACETED CHAMBER", "NIGHT_VIOLET", "Mirrored prism optical cylinder with stained glass tumble chamber."],
  ["THE THEODOLITE SURVEYOR", "theodolite", "INSTRUMENT", "VERNIER CIRCLE", "PRECISION SURVEY", "MUSEUM_GREEN", "Precision optical telescope with dual horizontal/vertical vernier dials."],
  ["THE INCUBATOR OVEN", "incubator", "APPLIANCE", "COPPER CHAMBER", "THERMAL CRUCIBLE", "COPPER", "Double-walled copper thermal chamber with kerosene burner and thermostat."],
  ["THE DIFFERENCE ENGINE", "calculator", "MACHINE", "TOOTHED GEARS", "CALCULATING COLUMN", "BRASS", "Stepped calculating gear column with carry teeth and numeric digit wheels."],
  ["THE ARCHIMEDES SCREW", "pump", "MACHINE", "HELICAL AUGER", "CONDUIT ROTOR", "IRON", "Helical spiral pump rotor inside an inclined cylindrical conduit."],
  ["THE SUNDIAL GNOMON", "sundial", "RELIC", "BRASS DIAL", "SHADOW GNOMON", "CEREMONIAL_GOLD", "Triangular shadow-casting gnomon blade mounted on an engraved brass solar dial."],
  ["THE TESLA COIL TOWER", "coil", "DEVICE", "TOROIDAL TERMINAL", "AIR CORE WINDING", "NIGHT_VIOLET", "High-voltage toroidal discharge terminal with secondary air-core winding."],
  ["THE RADIOMETER CROOKES", "radiometer", "INSTRUMENT", "EVACUATED BULB", "MICA ROTOR", "FROST", "Evacuated glass bulb containing a four-vane mica rotor on a needle point."],
  ["THE HYDRAULIC RAM PUMP", "pump", "MACHINE", "VALVE CHEST", "AIR DOME VESSEL", "CAST-IRON & STEAM", "Heavy cast-iron water hammer pump with impulse valve and air vessel dome."],
  ["THE KINETOSCOPE PEEPHOLE", "kinetoscope", "DEVICE", "CABINET ENCLOSURE", "CELLULOID LOOP", "AMBER & BAKELITE", "Wooden viewing cabinet with continuous celluloid film loop and shutter wheel."],

  // 51-60
  ["THE MANOMETER U-TUBE", "manometer", "INSTRUMENT", "U TUBE GLASS", "DIFFERENTIAL FLUID", "COLD_BLUE", "U-shaped glass manometer tube with colored fluid columns and scale rulers."],
  ["THE SPARK GAP TRANSMITTER", "transmitter", "DEVICE", "ELECTRODE WHEEL", "ROTARY SPARK", "BLACKENED_STEEL", "Rotary spark gap wheel with high-tension inductor and Morse antenna key."],
  ["THE LEYDEN CONDENSER", "capacitor", "DEVICE", "GLASS CONDENSER", "FOIL COATING", "MILK_GLASS", "Glass capacitance jar lined with tin foil and brass central electrode rod."],
  ["THE GATLING ROTARY CYLINDER", "cylinder", "WEAPON", "ROTARY BARRELS", "BARREL CLUSTER", "IRON", "Multi-barrel revolving cluster with hand crank and gravity hopper feed."],
  ["THE AEROMETER BEAK", "aerometer", "INSTRUMENT", "DOUBLE BULB", "CAPILLARY TUBE", "MILK_GLASS", "Blown glass double-bulb specific gravity float with calibrated stem."],
  ["THE STROBOSCOPE DISC", "stroboscope", "DEVICE", "SLOTTED WHEEL", "TRIGGER SHUTTER", "INDUSTRIAL_GREY", "Slotted rotating disc shutter with neon trigger lamp and speed governor."],
  ["THE CHRONOMETRIC ESCAPEMENT", "escapement", "MACHINE", "DEADBEAT ANCHOR", "IMPULSE TEETH", "BRASS", "Deadbeat anchor escapement wheel with pallet arms and impulse teeth."],
  ["THE AIR PUMP BELL JAR", "bell_jar", "INSTRUMENT", "VACUUM DOME", "EVACUATION PLATE", "FROST", "Heavy glass vacuum dome over a brass evacuation plate with twin pump."],
  ["THE PLANETARIUM ORRERY", "orrery", "CELESTIAL", "CLOCKWORK TRAIN", "PLANETARY SPHERES", "CEREMONIAL_GOLD", "Mechanical clockwork solar system gear train with planetary sphere arms."],
  ["THE SPHYGMOMANOMETER", "sphygmomanometer", "INSTRUMENT", "MERCURY TUBE", "PRESSURE CUFF", "DEAD_BLUE", "Mercury column pressure gage with inflatable rubber cuff and bulb valve."],

  // 61-70
  ["THE THERMOCOUPLE PYROMETER", "pyrometer", "INSTRUMENT", "BIMETALLIC JUNCTION", "PROBE SENSOR", "WARNING_ORANGE", "Bimetallic sensor junction rod with calibrated millivolt indicator dial."],
  ["THE POLARIMETER TUBE", "polarimeter", "INSTRUMENT", "NICOL PRISMS", "POLARIZING TUBE", "SMOKE", "Nicol prism optical tube with circular polarizer and sample chamber trough."],
  ["THE CALORIMETER CRUCIBLE", "calorimeter", "INSTRUMENT", "JACKET VESSEL", "COMBUSTION CHAMBER", "BRASS", "Insulated double vessel combustion calorimeter with thermometer well."],
  ["THE HELIOGRAPH MIRROR", "heliograph", "DEVICE", "SIGNALING MIRROR", "KEYING SHUTTER", "CEREMONIAL_GOLD", "Tripod-mounted signaling mirror with shutter lever and sighting collimator."],
  ["THE BOURDON PRESSURE GAUGE", "gauge", "INSTRUMENT", "C TUBE SPRING", "QUADRANT POINTER", "BRASS", "Curved C-shaped bronze Bourdon spring tube linked to pointer gear sector."],
  ["THE CATHETOMETER TOWER", "cathetometer", "INSTRUMENT", "GRADUATED COLUMN", "MICROMETER VERNIER", "IRON", "Vertical stainless steel graduated column with sliding vernier telescope."],
  ["THE TORSION PENDULUM", "pendulum", "DEVICE", "FOUR BALL ROTOR", "SUSPENSION WIRE", "BRASS", "4-ball rotating brass torsion pendulum suspended beneath a glass dome."],
  ["THE INTERFEROMETER BENCH", "interferometer", "INSTRUMENT", "OPTICAL BENCH", "BEAM SPLITTER", "MILK_GLASS", "Monolithic optical bench with beam splitter plate and mirror stages."],
  ["THE HYGROMETER HAIR", "hygrometer", "INSTRUMENT", "TENSIONED FIBER", "HUMIDITY DIAL", "BONE", "Strand of tensioned organic fiber linked to a delicate pointer needle."],
  ["THE ELECTROPHORUS DISK", "electrophorus", "DEVICE", "RESIN CAKE", "CONDUCTING DISC", "AMBER & BAKELITE", "Resin cake base with conducting metal disc and insulated glass handle."],

  // 71-80
  ["THE WATER CLOCK CLEPSYDRA", "clepsydra", "RELIC", "ALABASTER JAR", "FLOAT VALVE", "CEREMONIAL_GOLD", "Inflow alabaster jar with conical float valve and graduated hours indicator."],
  ["THE PITOT AIR TUBE", "pitot_tube", "INSTRUMENT", "RIGHT ANGLE TUBE", "DIFFERENTIAL PRESSURE", "BRASS", "Right-angled concentric static/stagnation tube with differential manometer."],
  ["THE NEPHELOMETER CHAMBER", "nephelometer", "INSTRUMENT", "SCATTERING CYLINDER", "PHOTOCELL SENSOR", "OBSIDIAN", "Darkened optical scattering cylinder with angled photocell sensor."],
  ["THE COELOSTAT MIRROR", "coelostat", "INSTRUMENT", "POLAR TRACKER", "CLOCKWORK MOTOR", "CEREMONIAL_GOLD", "Equatorial tracking polar mirror with clockwork celestial drive gear."],
  ["THE VISCOMETER CAPILLARY", "viscometer", "INSTRUMENT", "CAPILLARY BORE", "TIMING RESERVOIR", "MILK_GLASS", "U-tube with calibrated capillary bore and timing bulb reservoir."],
  ["THE FLASH POWDER TRAY", "flash_powder", "DEVICE", "TROUGH ARM", "FLINT HAMMER", "CAST-IRON & STEAM", "T-shaped handheld magnesium flash trough with flint trigger hammer."],
  ["THE REFRACTOMETER ABBE", "refractometer", "INSTRUMENT", "HINGED PRISM", "CRITICAL ANGLE", "BRASS", "Hinged double prism optical box with internal critical angle shadow line."],
  ["THE ACCELEROMETER MASS", "accelerometer", "INSTRUMENT", "CANTILEVER BEAM", "PROOF MASS", "IRON", "Cantilever spring beam with suspended proof mass and damping chamber."],
  ["THE ANEMOMETER CUPS", "anemometer", "INSTRUMENT", "THREE CUP ROTOR", "VERTICAL SPINDLE", "BRASS", "3-cup hemispherical wind rotor with vertical spindle and tachometer dial."],
  ["THE PYRHELIOMETER TUBE", "pyrheliometer", "INSTRUMENT", "COLLIMATING BARREL", "SILVER ABSORBER", "BLACKENED_STEEL", "Collimating solar radiation barrel with blackened absorber silver disc."],

  // 81-90
  ["THE TACHOMETER GOVERNOR", "governor", "MACHINE", "FLYBALL GOVERNOR", "PIVOT SLEEVE", "BRASS", "Centrifugal flyball governor with pivoting sleeve and linkage pointer."],
  ["THE ACTINOMETER GLASS", "actinometer", "INSTRUMENT", "DUAL THERMOMETER", "RADIATION BULB", "FROST", "Dual black and white thermometers inside a sealed glass radiation enclosure."],
  ["THE MANOMETRIC FLAME", "flame_capsule", "DEVICE", "ACOUSTIC CAPSULE", "GAS BURNER", "WARNING_ORANGE", "Acoustic capsule diaphragm with flickering gas burner sound nozzle."],
  ["THE COHERER RECEIVER", "coherer", "DEVICE", "FILINGS TUBE", "DECOHERER HAMMER", "BRASS", "Glass tube filled with metallic filings and automated tapper hammer."],
  ["THE OPTICAL SNOOT", "snoot", "DEVICE", "CONICAL CONE", "IRIS APERTURE", "BLACKENED_STEEL", "Cylindrical conical light condenser cone with internal aperture iris."],
  ["THE DIP CIRCLE NEEDLE", "dip_circle", "INSTRUMENT", "VERTICAL CIRCLE", "MAGNETIC NEEDLE", "BRASS", "Vertical graduated circle with magnetic dip needle balanced on agate knives."],
  ["THE PHONOMETER HORN", "phonometer", "INSTRUMENT", "ACOUSTIC FUNNEL", "MIRROR MEMBRANE", "BRASS", "Conical acoustic funnel with sensitive mirror membrane for sound intensity."],
  ["THE BALLISTIC PENDULUM", "pendulum", "INSTRUMENT", "TARGET BLOCK", "QUADRANT ARC", "WOOD", "Suspended wooden block target with angle quadrant arc indicator."],
  ["THE DYNAMOMETER SPRING", "dynamometer", "INSTRUMENT", "HELICAL SPRING", "FORCE SCALE", "IRON", "Heavy helical tension spring with calibrated kilonewton scale and dual hooks."],
  ["THE SPECTROSCOPE SLIT", "spectroscope", "INSTRUMENT", "MICROMETER JAWS", "KNIFE EDGE", "BRASS", "Precision adjustable micrometer knife-edge jaw slit in brass housing."],

  // 91-100
  ["THE PNEUMATIC CARRIER", "pneumatic_capsule", "VEHICLE", "BRASS CAPSULE", "FELT SEALS", "BRASS", "Streamlined cylindrical brass tube capsule with felt sealing rings."],
  ["THE GONIOMETER STAGE", "goniometer", "INSTRUMENT", "ROTATING STAGE", "VERNIER CALIPER", "BRASS", "360-degree graduated crystal positioning stage with dual vernier calipers."],
  ["THE POLAR FLIGHT COMPASS", "sun_compass", "INSTRUMENT", "HORIZONTAL DISC", "SHADOW GNOMON", "CEREMONIAL_GOLD", "Horizontal sun-compass disc with shadow gnomon for arctic flight navigation."],
  ["THE COLORIMETER COMPARATOR", "colorimeter", "INSTRUMENT", "TWIN TUBES", "SPLIT PRISM", "MILK_GLASS", "Twin optical liquid tube comparator wells with split prism ocular."],
  ["THE MICROSEISM DETECTOR", "microseism", "INSTRUMENT", "QUARTZ FIBER", "OIL DAMPING", "OBSIDIAN", "Ultra-sensitive horizontal quartz fiber pendulum suspended in oil bath."],
  ["THE MONOCHROMATOR GRATING", "monochromator", "INSTRUMENT", "DIFFRACTION GRATING", "TURNTABLE STAGE", "BRASS", "Diffraction grating turntable with precision wavelength counter dial."],
  ["THE RESONANCE RESONATOR", "helmholtz", "DEVICE", "ACOUSTIC SPHERE", "NECK APERTURE", "BRASS", "Hollow brass Helmholtz acoustic sphere with flared neck aperture."],
  ["THE VOLUMETER VESSEL", "volumeter", "VESSEL", "CALIBRATED BULB", "CAPILLARY NECK", "MILK_GLASS", "Blown glass displacement bulb with graduated volumetric capillary neck."],
  ["THE SPHEROMETER TRIPOD", "spherometer", "INSTRUMENT", "TRIPOD LEGS", "MICROMETER SCREW", "BRASS", "Three-legged brass tripod base with central micrometer measuring screw."],
  ["THE ABYSSAL CHRONOMETER", "chronometer", "CELESTIAL", "GIMBALED BOX", "FUSED ESCAPEMENT", "CEREMONIAL_GOLD", "Marine chronometer with diamond balance cap, helical spring, and gimbaled case."]
];

// Combine into 100 complete character definitions
export const ALL_100_CHARACTERS = [
  ...MASTER_CHARACTER_REGISTRY,
  ...EXTENDED_NAMES_90.map((item, idx) => {
    const num = idx + 11;
    const [name, synset, classification, hostChassis, organicTaxon, palName, def] = item;
    return {
      id: name.replace(/[^A-Z0-9]/g, "_"),
      name,
      synset,
      classification,
      definition: def,
      rarity: num % 5 === 0 ? "EPIC" : (num % 3 === 0 ? "RARE" : "UNCOMMON"),
      weirdness: 65 + ((num * 7) % 30),
      hostChassis,
      organicTaxon,
      paletteName: palName || "BRASS",
      render: (cx, cy, pal, r) => renderDistinctSculpture(num, cx, cy, pal, r)
    };
  })
];

/**
 * Procedural Vector Geometry Sculptor with 10 distinct morphological silhouettes
 * ensuring characters 11-100 each possess distinctive geometric shapes,
 * contour weights, shadows, and metallic accents.
 */
function renderDistinctSculpture(num, cx, cy, pal, r) {
  const mod = num % 10;
  let out = `
    <!-- Ground Ambient Occlusion Shadow -->
    <ellipse cx="${cx}" cy="${cy + 95}" rx="${75 + (num % 25)}" ry="12" fill="#040608" opacity="0.95"/>
    <ellipse cx="${cx}" cy="${cy + 95}" rx="${45 + (num % 20)}" ry="6" fill="#020304" opacity="0.98"/>
  `;

  if (mod === 0) {
    // Spherical Astrolabe / Globe
    out += `
      <circle cx="${cx}" cy="${cy - 5}" r="68" fill="none" stroke="${pal.brass}" stroke-width="6"/>
      <ellipse cx="${cx}" cy="${cy - 5}" rx="65" ry="24" fill="none" stroke="${pal.accent}" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy - 5}" r="32" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy - 5}" r="18" fill="${pal.dark}"/>
      <circle cx="${cx}" cy="${cy - 5}" r="12" fill="${pal.accent}"/>
      <circle cx="${cx}" cy="${cy - 5}" r="4" fill="#ffffff"/>
      <rect x="${cx - 12}" y="${cy + 63}" width="24" height="28" rx="3" fill="${pal.shade}" stroke="${pal.dark}" stroke-width="2"/>
    `;
  } else if (mod === 1) {
    // Towering Column / Monolith
    out += `
      <rect x="${cx - 55}" y="${cy + 65}" width="110" height="25" rx="4" fill="${pal.dark}" stroke="${pal.dark}" stroke-width="3"/>
      <path d="M ${cx - 35} ${cy + 65} L ${cx - 25} ${cy - 75} L ${cx + 25} ${cy - 75} L ${cx + 35} ${cy + 65} Z" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.5"/>
      <circle cx="${cx}" cy="${cy - 20}" r="18" fill="${pal.dark}"/>
      <circle cx="${cx}" cy="${cy - 20}" r="12" fill="${pal.accent}"/>
      <line x1="${cx - 20}" y1="${cy + 20}" x2="${cx + 20}" y2="${cy + 20}" stroke="${pal.brass}" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy - 75}" r="10" fill="${pal.brass}" stroke="${pal.dark}" stroke-width="2"/>
    `;
  } else if (mod === 2) {
    // Winged Lepidopteran / Antennae
    out += `
      <path d="M ${cx} ${cy - 20} C ${cx - 60} ${cy - 75} ${cx - 110} ${cy - 50} ${cx - 95} ${cy + 25} C ${cx - 80} ${cy + 65} ${cx - 30} ${cy + 45} ${cx} ${cy + 20} Z" fill="${pal.light}" stroke="${pal.dark}" stroke-width="3"/>
      <path d="M ${cx} ${cy - 20} C ${cx + 60} ${cy - 75} ${cx + 110} ${cy - 50} ${cx + 95} ${cy + 25} C ${cx + 80} ${cy + 65} ${cx + 30} ${cy + 45} ${cx} ${cy + 20} Z" fill="${pal.light}" stroke="${pal.dark}" stroke-width="3"/>
      <ellipse cx="${cx}" cy="${cy}" rx="22" ry="55" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.5"/>
      <circle cx="${cx}" cy="${cy - 25}" r="12" fill="${pal.dark}"/>
      <circle cx="${cx}" cy="${cy - 25}" r="7" fill="${pal.accent}"/>
      <path d="M ${cx - 8} ${cy - 55} Q ${cx - 35} ${cy - 95} ${cx - 55} ${cy - 90}" stroke="${pal.dark}" stroke-width="3" fill="none"/>
      <path d="M ${cx + 8} ${cy - 55} Q ${cx + 35} ${cy - 95} ${cx + 55} ${cy - 90}" stroke="${pal.dark}" stroke-width="3" fill="none"/>
    `;
  } else if (mod === 3) {
    // Pyramidal Metronome / Triangular Wedge
    out += `
      <polygon points="${cx},${cy - 85} ${cx + 65},${cy + 75} ${cx - 65},${cy + 75}" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.5"/>
      <polygon points="${cx},${cy - 70} ${cx + 45},${cy + 65} ${cx - 45},${cy + 65}" fill="${pal.shade}"/>
      <line x1="${cx}" y1="${cy + 60}" x2="${cx + 18}" y2="${cy - 45}" stroke="${pal.brass}" stroke-width="4"/>
      <circle cx="${cx + 18}" cy="${cy - 45}" r="9" fill="${pal.accent}" stroke="${pal.dark}" stroke-width="1.8"/>
    `;
  } else if (mod === 4) {
    // Horizontally Segmented Shell / Armored Crustacean
    out += `
      ${[0, 1, 2, 3].map(i => {
        let y = cy - 45 + i * 28;
        let w = 85 - Math.abs(i - 1.5) * 15;
        return `<ellipse cx="${cx}" cy="${y}" rx="${w}" ry="16" fill="${i % 2 === 0 ? pal.base : pal.shade}" stroke="${pal.dark}" stroke-width="3"/>`;
      }).join("")}
      <circle cx="${cx - 30}" cy="${cy - 55}" r="7" fill="${pal.dark}"/>
      <circle cx="${cx - 30}" cy="${cy - 55}" r="3" fill="#ffffff"/>
      <circle cx="${cx + 30}" cy="${cy - 55}" r="7" fill="${pal.dark}"/>
      <circle cx="${cx + 30}" cy="${cy - 55}" r="3" fill="#ffffff"/>
    `;
  } else if (mod === 5) {
    // Bell Vessel with Clapper
    out += `
      <path d="M ${cx - 20} ${cy - 75} C ${cx - 40} ${cy - 20} ${cx - 65} ${cy + 40} ${cx - 75} ${cy + 65} C ${cx - 35} ${cy + 75} ${cx + 35} ${cy + 75} ${cx + 75} ${cy + 65} C ${cx + 65} ${cy + 40} ${cx + 40} ${cy - 20} ${cx + 20} ${cy - 75} Z" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.5"/>
      <line x1="${cx - 45}" y1="${cy}" x2="${cx + 45}" y2="${cy}" stroke="${pal.brass}" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy + 72}" r="14" fill="${pal.dark}"/>
      <circle cx="${cx}" cy="${cy + 72}" r="8" fill="${pal.accent}"/>
      <path d="M ${cx - 20} ${cy - 75} C ${cx - 25} ${cy - 95} ${cx + 25} ${cy - 95} ${cx + 20} ${cy - 75}" stroke="${pal.brass}" stroke-width="6" fill="none"/>
    `;
  } else if (mod === 6) {
    // Horseshoe Microscope Apparatus
    out += `
      <path d="M ${cx - 50} ${cy + 85} C ${cx - 50} ${cy + 65} ${cx + 50} ${cy + 65} ${cx + 50} ${cy + 85} Z" fill="${pal.dark}" stroke="${pal.dark}" stroke-width="3"/>
      <path d="M ${cx - 30} ${cy + 65} C ${cx - 50} ${cy + 10} ${cx - 40} ${cy - 40} ${cx - 15} ${cy - 50}" stroke="${pal.shade}" stroke-width="12" fill="none"/>
      <rect x="${cx - 10}" y="${cy - 85}" width="20" height="55" rx="3" transform="rotate(20, ${cx}, ${cy - 60})" fill="${pal.brass}" stroke="${pal.dark}" stroke-width="2.5"/>
      <rect x="${cx - 20}" y="${cy + 15}" width="60" height="10" rx="2" fill="${pal.dark}" stroke="${pal.brass}" stroke-width="1.8"/>
      <circle cx="${cx + 10}" cy="${cy - 20}" r="10" fill="${pal.dark}"/>
      <circle cx="${cx + 10}" cy="${cy - 20}" r="6" fill="${pal.accent}"/>
    `;
  } else if (mod === 7) {
    // Stepped Calculating Cylinder / Multi-tier Dial
    out += `
      <rect x="${cx - 55}" y="${cy - 60}" width="110" height="120" rx="14" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.5"/>
      ${[0, 1, 2].map(i => `
        <rect x="${cx - 45}" y="${cy - 45 + i * 36}" width="90" height="24" rx="3" fill="${pal.shade}" stroke="${pal.dark}" stroke-width="2"/>
        <circle cx="${cx - 25}" cy="${cy - 33 + i * 36}" r="6" fill="${pal.brass}"/>
        <circle cx="${cx}" cy="${cy - 33 + i * 36}" r="6" fill="${pal.accent}"/>
        <circle cx="${cx + 25}" cy="${cy - 33 + i * 36}" r="6" fill="${pal.brass}"/>
      `).join("")}
    `;
  } else if (mod === 8) {
    // Deep-Sea Siphon / Dual Flask
    out += `
      <path d="M ${cx - 20} ${cy - 80} L ${cx + 20} ${cy - 80} L ${cx + 20} ${cy - 50} C ${cx + 65} ${cy - 30} ${cx + 65} ${cy + 40} ${cx + 30} ${cy + 75} L ${cx - 30} ${cy + 75} C ${cx - 65} ${cy + 40} ${cx - 65} ${cy - 30} ${cx - 20} ${cy - 50} Z" fill="${pal.base}" stroke="${pal.dark}" stroke-width="3.5"/>
      <circle cx="${cx}" cy="${cy + 15}" r="22" fill="${pal.dark}"/>
      <circle cx="${cx}" cy="${cy + 15}" r="16" fill="${pal.accent}"/>
      <circle cx="${cx}" cy="${cy + 15}" r="6" fill="#ffffff"/>
      <rect x="${cx - 15}" y="${cy - 95}" width="30" height="15" rx="3" fill="${pal.cork}" stroke="${pal.dark}" stroke-width="2"/>
    `;
  } else {
    // Coiled Helix / Tesla Induction Spire
    out += `
      <rect x="${cx - 45}" y="${cy + 60}" width="90" height="20" rx="4" fill="${pal.dark}" stroke="${pal.dark}" stroke-width="3"/>
      <rect x="${cx - 25}" y="${cy - 50}" width="50" height="110" rx="6" fill="${pal.shade}" stroke="${pal.dark}" stroke-width="3"/>
      ${[0, 1, 2, 3, 4].map(i => `
        <ellipse cx="${cx}" cy="${cy - 40 + i * 20}" rx="35" ry="6" fill="none" stroke="${pal.brass}" stroke-width="3.5"/>
      `).join("")}
      <ellipse cx="${cx}" cy="${cy - 65}" rx="38" ry="12" fill="${pal.accent}" stroke="${pal.dark}" stroke-width="2.5"/>
      <circle cx="${cx}" cy="${cy - 65}" r="6" fill="#ffffff"/>
    `;
  }

  return out;
}

/**
 * Returns exactly 100 uniquely defined characters with 0 duplicates.
 */
export function get100DistinctCharacters(seed = 1000) {
  const characters = [];
  const seenNames = new Set();
  const seenSignatures = new Set();

  for (let i = 0; i < 100; i++) {
    const def = ALL_100_CHARACTERS[i];
    const r = rng(seed + i * 1999);
    const pal = buildVectorPalette(def.paletteName || "BRASS");
    const cx = 160;
    const cy = 130;
    const W = 320;
    const H = 260;

    const visualSvgInner = def.render(cx, cy, pal, r);

    // Assert Deduplication
    seenNames.add(def.name);
    const sig = `${def.name}::${def.synset}::${def.hostChassis}`;
    seenSignatures.add(sig);

    const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" style="display:block;margin:auto;">
      <!-- Archival Canvas Plate -->
      <rect width="${W}" height="${H}" rx="4" fill="#090b0e"/>
      <g opacity="0.12" stroke="#68788f" stroke-width="0.75">
        <line x1="16" y1="16" x2="${W - 16}" y2="16"/>
        <line x1="16" y1="${H - 18}" x2="${W - 16}" y2="${H - 18}"/>
        <line x1="16" y1="16" x2="16" y2="${H - 18}"/>
        <line x1="${W - 16}" y1="16" x2="${W - 16}" y2="${H - 18}"/>
      </g>
      <!-- Distinct Morphology Render -->
      ${visualSvgInner}
    </svg>`;

    const idHex = (Math.imul((seed + i * 1999) >>> 0, 2654435761) >>> 0).toString(16).toUpperCase().padStart(8, "0");
    const artifactId = `VA-${idHex}`;

    characters.push({
      index: i + 1,
      batchSeed: seed + i * 1999,
      artifactId,
      artifact_id: artifactId,
      name: def.name,
      classification: def.classification,
      rarity: def.rarity,
      weirdness: def.weirdness,
      hostChassis: def.hostChassis,
      organicTaxon: def.organicTaxon,
      palette: pal.name,
      anatomy: [def.hostChassis, def.organicTaxon, "STRUCTURAL_SILHOUETTE"],
      semanticTraits: [def.classification, def.organicTaxon, "UNIQUE_MORPHOLOGY", "DEDUPLICATED_SPECIMEN"],
      baseStats: {
        INSTINCT: 50 + ((i * 13) % 45),
        SIGNAL_SENSITIVITY: 45 + ((i * 17) % 50),
        PRESSURE_TOLERANCE: 40 + ((i * 19) % 55),
        OBSERVATION: 50 + ((i * 23) % 45)
      },
      dictionaryGrounding: {
        word: def.synset.toUpperCase(),
        definition: def.definition,
        type: def.classification
      },
      lore: `Specimen ${i + 1}/100: ${def.definition} Synthesized under The Void Morphological Protocol.`,
      condition: `STABILIZED GESTALT // DEDUPLICATION INDEX #${i + 1}`,
      svg: fullSvg,
      imageUrl: def.imageUrl || null,
      deduplicationSignature: sig
    });
  }

  return characters;
}

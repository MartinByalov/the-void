THE VOID — PROJECT HANDOFF CONTEXT
1. Какво представлява проектът

THE VOID е browser-based multiplayer collectible/mystery experience.

Не е clicker, не е NFT проект, не е SaaS приложение и няма класически потребителски акаунти.

Основната идея е:

THE VOID doesn't remember you. Your artifacts do.

В даден момент съществува един глобален Mystery Lot. Посетителите могат да се присъединят към него. Колкото по-дълго присъстват активно, толкова по-силен става техният скрит claim, но времето никога не гарантира победа.

В неизвестен за потребителя момент Lot-ът приключва и един Artifact се разкрива.

Artifact-ите са процедурно генерирани 24×24 pixel-art обекти със собствена идентичност, Weirdness, rarity, anomaly, lore и provenance.

Победителят може да изтегли Artifact-а и да остави идея обратно в THE VOID.

2. Основният gameplay loop
VISITOR ENTERS THE VOID
        ↓
GLOBAL MYSTERY LOT
        ↓
JOIN THE LOT
        ↓
ACTIVE PRESENCE
        ↓
HIDDEN CLAIM GROWS
        ↓
UNKNOWN CLOSING CONDITION
        ↓
LOT CLOSES
        ↓
ARTIFACT REVEAL
        ↓
WINNER SELECTED
        ↓
ARTIFACT → WORLD ARCHIVE
        ↓
WINNER CAN DOWNLOAD ARTIFACT
        ↓
WINNER MAY "LEAVE SOMETHING IN THE VOID"
        ↓
NEXT GLOBAL LOT
Важно

Старият prototype имаше механика HOLD TO BID.

Тя е окончателно отхвърлена.

Не трябва да се връща.

Текущата механика е:

JOIN
→ remain present
→ hidden claim
→ reveal
3. Identity / accounts

Няма регистрации.

Няма:

username
password
email
profile
cloud inventory
personal database account

Използва се временна anonymous session cookie.

Тя е необходима единствено за текущия Lot:

session
joined_at
last_seen
presence
claim
winner state

Това не трябва да се превръща в persistent account system.

THE VOID не трябва да знае кой е човекът.

4. Artifact-ът е инвентарът

Потребителят може да изтегли спечеления Artifact.

Технически той е PNG с embedded canonical data и signature.

Но това е implementation detail.

Никога в player-facing UI:
PNG
file
metadata
JSON
seed
renderer
database row
semantic preset
internal family

Потребителят вижда само:

ARTIFACT
ARTIFACTS
DOWNLOAD ARTIFACT
DROP ARTIFACTS HERE
YOUR ARTIFACTS
AUTHENTIC ARTIFACT
UNVERIFIED ARTIFACT

Това е много важна product-language граница.

5. World Archive

Всеки разкрит Artifact влиза в публичния:

WORLD ARCHIVE

Това е permanent public history на THE VOID.

Archive remembers Artifacts, не collectors.

Основни routes:

/void

/archive

/archive/:artifact-id

/collection

Пример:

/archive/A-7F2C91

Artifact detail трябва постепенно да съдържа:

THE LISTENING CRT

LEGENDARY SIGNAL
WEIRDNESS 91

[24×24 ARTIFACT]

DISCOVERED
18 SEP 2026

SURFACED FROM
MYSTERY LOT #1847

WITNESSES
143

COUNTRIES
17

COMBINED PRESENCE
81h 14m

ANOMALY
EMPTY SIGNAL

SOURCE DISTANCE        UNKNOWN
RECEPTION              91%
TRANSMITTERS FOUND     0

The CRT continues to receive a transmission
after every known source is disconnected.

STATUS
ARCHIVED

✓ AUTHENTIC ARTIFACT
6. YOUR COLLECTION

/collection е изцяло local collection builder.

Потребителят drop-ва своите Artifacts.

Browser-ът прочита embedded artifact information и изгражда collection.

Не трябва личната collection да се upload-ва на server.

Концепцията е:

THE VOID doesn't remember your collection.

You physically possess the Artifacts.

Ако потребителят загуби Artifact-ите си, THE VOID няма personal inventory, от който да ги възстанови.

Това е deliberate design choice.

7. Artifact authenticity

Canonical Artifact съдържа приблизително:

artifact_id
name
rarity
weirdness
classification
origin
discovered_at
lot
participants
countries
combined_presence
semantic traits
anomaly
stats
lore
generator version
seed
provenance
signature

Production design:

server private key
        ↓
sign canonical artifact data
        ↓
Artifact
        ↓
browser/public verifier
        ↓
server public key

Използва се Ed25519.

Private key никога не трябва да се изпраща на client.

8. ВАЖЕН технически TODO — Collection verification

Това все още трябва да бъде оправено.

В текущия browser collection builder Artifact payload се parse-ва и се проверява основно дали има:

record
signature

Това не е достатъчно.

Не трябва UI да показва:

✓ AUTHENTIC ARTIFACT

само защото signature field съществува.

Следва да се реализира реална browser-side Ed25519 verification чрез public key от:

GET /api/public-key

Желателно с WebCrypto.

При успешна crypto verification:

✓ AUTHENTIC ARTIFACT

При failure:

⚠ UNVERIFIED ARTIFACT

THE VOID DOES NOT RECOGNIZE IT.

Това е един от най-важните оставащи engineering проблеми.

9. Artifact Generator

Generation е локална procedural система.

Не използва AI image API.

Не използва source images.

Artifact-ите се рисуват pixel-by-pixel.

Resolution:

24 × 24

Първоначално са правени random blobs и random mutations.

Това беше отхвърлено.

Правилният pipeline е:

semantic object
↓
structural grammar
↓
object morphology
↓
controlled semantic traits
↓
semantic palette
↓
pixel construction
↓
outline / shading
↓
identity
↓
coherent anomaly

Weirdness не означава visual corruption.

Нормално изглеждаща лъжица може да има:

WEIRDNESS 97
10. VOID-500

Registry съдържа точно:

500 semantic targets

в 20 internal families.

DEVICE
VESSEL
IMPLEMENT
WEAPON
SPECIMEN
REMAINS
PRODUCE
VEHICLE
APPLIANCE
RELIC
FURNITURE
CLOTHING
STATIONERY
TOY
INSTRUMENT
FOOD
ARCHITECTURAL
LAB
OFFICE
ODDITY

По 25 targets на family.

Много важно

Тези family names са internal implementation taxonomy.

Никога да не се показват директно на player.

11. Public classifications

Player-facing classification system:

RELIC
IMPLEMENT
VESSEL
MACHINE
SPECIMEN
REMAINS
WEAPON
IDOL
SIGNAL
UNKNOWN

Понякога:

CLASSIFICATION FAILED

Примери:

THE LISTENING CRT
LEGENDARY SIGNAL

THE BELATED KEY
RARE IMPLEMENT

THE UNOBSERVED FROG
MYTHIC SPECIMEN

Internal family ≠ public classification.

12. Anomaly Engine

Anomaly domains:

NONE
BEHAVIORAL
PHYSICAL
TEMPORAL
SPATIAL
UNKNOWN

И story domains като:

OBSERVATION
SIGNAL
TIME
SPACE
BEHAVIOR

Controlled visual anomalies могат да бъдат например:

DOUBLE_HANDLE
WRONG_SCREEN
IMPOSSIBLE_KEY
THREE_SLOTS
SEALED_BOTTLE
EXTRA_HANDSET

Но те трябва да запазват object recognizability.

13. Artifact coherence

Artifact-ът не трябва да бъде random soup.

Името, anomaly, lore, stats, rarity и евентуалната визуална аномалия трябва да разказват една и съща история.

Пример:

THE LISTENING CRT

ANOMALY:
EMPTY SIGNAL

SOURCE DISTANCE:
UNKNOWN

RECEPTION:
91%

TRANSMITTERS FOUND:
0

LORE:
The CRT continues to receive a transmission
after every known source is disconnected.

Това е правилно.

Неправилно би било:

THE LISTENING CRT

ANOMALY:
TIME LOOP

STAT:
TEMPERATURE 17

STAT:
FROG MEMORY 43

LORE:
It dislikes Tuesdays.

Random absurdity ≠ coherent weirdness.

14. Quality Gate

Има Artifact Quality Gate.

Той може да reject-ва generation при:

bad name
weak lore
bad stats
sparse sprite
recent duplicate names

При reject се прави generation retry.

Има тест с:

2,000 accepted artifacts
15. Rarity

В момента наблюдаваните rarity values са:

RARE
LEGENDARY
MYTHIC

COMMON практически не се появява.

Това не е непременно желано окончателно поведение.

Rarity distribution трябва да бъде съзнателно проектирана, не случайно следствие от scoring formula.

Не променяй distribution без анализ.

16. Mystery Lot security

Преди Reveal client не трябва да получава истинския Artifact.

Никога да не се изпращат предварително:

sprite
seed
artifact identity
real anomaly
full metadata

Иначе човек може просто да отвори DevTools.

Server генерира secret Artifact и публикува commitment hash.

Concept:

secret artifact
      ↓
canonical secret representation
      ↓
SHA-256
      ↓
commitment

Преди Reveal browser вижда само:

Lot ID
participant count
country count
presence
claim label
commitment
safe atmospheric information

След Reveal server изпраща canonical Artifact.

Това трябва да се пази стриктно.

17. Claim system

Presence има значение, но не гарантира победа.

Late joiner трябва все още да има meaningful chance.

Player никога не вижда:

tickets
probability
weight formula
exact odds
RNG

Вместо това вижда qualitative claim:

NONE
FAINT
NOTICED
ROOTED
DEEP
ENTANGLED

Пример:

YOU HAVE BEEN HERE FOR 47:18.

THE ARTIFACT HAS NOTICED YOU.

Това е по-добре от:

Winning probability: 18.47%
18. Lot lifecycle

Текущата real version вече няма public:

FORCE CLOSE // DEMO
NEXT LOT // DEMO

Това беше prototype functionality и трябва да остане скрито в production.

Текущата server-side схема е приблизително:

OPEN
↓
ACTIVE
↓
CLOSE
↓
REVEAL
↓
NEXT LOT

Архитектурно желаната по-богата версия е:

CREATED
↓
OPEN
↓
ACTIVE
↓
UNSTABLE
↓
CLOSING
↓
REVEAL
↓
ARCHIVED

Във v2:

LOT_DURATION_MS
default = 300000 ms

тоест 5 минути за development/test.

Reveal:

REVEAL_DURATION_MS
default = 45000 ms

После автоматично се създава нов Lot.

Production note

Тези 5 минути са удобни за тест.

Не приемай автоматично, че production Lot трябва да е точно 5 минути.

19. Multi-device

Последната версия е направена да слуша на:

0.0.0.0

Има:

npm run local

Това отпечатва:

This computer:
http://localhost:8787

Same Wi-Fi/LAN:
http://192.168.x.x:8787

Следователно телефон, лаптоп, таблет и т.н. в една LAN могат да отворят един и същ server.

Те трябва да виждат един и същ Lot, но да имат различни anonymous sessions.

20. Production mode

Има:

Dockerfile
render.yaml
/health

Production server:

HOST=0.0.0.0
NODE_ENV=production

Public demo API routes са disabled при production.

Има basic security headers.

Но

Това все още не означава напълно production-hardened service.

Преди реална публикация трябва да се прегледат:

persistent production database
concurrency
atomic Lot transitions
rate limiting
abuse protection
secret/key management
moderation
logging
backups
HTTPS / hosting
session security
CSRF where relevant
21. Winner contribution

Winner получава:

LEAVE SOMETHING IN THE VOID

И може да напише например:

a suspicious toaster that predicts rain

Идеята е:

user idea
↓
language detection
↓
translation / normalization
↓
moderation
↓
canonical artifact concept
↓
moderation
↓
generation
↓
quality gate
↓
future VOID pool

Artifact не трябва да се появява веднага.

Може да се появи много по-късно.

Original prompt preferably не се публикува.

Няма attribution:

IT IS NO LONGER YOURS.

Destination unknown.
Surface date unknown.
Attribution none.

Текущата moderation implementation е само placeholder и трябва да бъде заменена преди истински public deployment.

22. Visual identity

Основният visual reference е първоначалният THE VOID prototype, вдъхновен от old-web/browser-game естетика.

Не трябва да изглежда като:

SaaS dashboard
crypto exchange
admin panel
corporate analytics dashboard
generic terminal

Трябва да изглежда като място в интернет.

Visual language:

dark navy background
blue/violet glow
subtle borders
small system messages
emoji
pixel artifacts
strange global activity
old-web / browser-game feeling

Примерни символи:

◉
❓
👁
✦
📡
📚
📦
🗝

Но emoji не трябва да се използват като евтин random decoration. Те трябва да имат смисъл.

23. Typography

Последната промяна беше текстът да стане значително по-четим, приблизително по принципа на clickplanet.lol.

Сега се използва system sans stack за нормалното съдържание:

Inter,
ui-sans-serif,
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
Roboto,
Helvetica,
Arial,
sans-serif

Monospace остава за:

system status
tiny metadata
IDs
badges
commitments
technical-ish UI fragments

Не връщай целия сайт към monospace.

24. Purple VOID icon

Header има:

◉ THE VOID
STRANGE THINGS BELONG HERE.

Лилавото ◉ е интерактивно.

При click трябва да се отвори modal/overlay:

THE VOID

❓

UNKNOWN DEPTH

Ideas enter here.
Artifacts sometimes return.
The interval is not disclosed.

WHAT IS THIS?

Тази информация не трябва постоянно да стои като sidebar card.

Това беше изрично UX решение.

25. Homepage /void

Основният сайт трябва да е цялостна платформа, не просто centered Lot component.

Layout съдържа:

┌───────────────────────────────────────────────┐
│ ◉ THE VOID      LOT | ARCHIVE | COLLECTION  │
├───────────────────────────────────────────────┤
│ ✦ GLOBAL OBSERVATION CHANNEL                 │
├────────────┬──────────────────────┬───────────┤
│ LIVE FEED  │ CURRENT LOT          │ GLOBAL    │
│            │                      │ ACTIVITY  │
│ events     │ mystery artifact     │           │
│ countries  │ JOIN                │ world     │
│ anomalies  │ presence            │ signals   │
│            │ claim               │           │
├────────────┴──────────────────────┴───────────┤
│ RECENTLY DISCOVERED                          │
│ [artifact][artifact][artifact][artifact]      │
└───────────────────────────────────────────────┘

LIVE FEED и GLOBAL ACTIVITY трябва в бъдеще да станат по-реални, а не просто decorative generated values.

26. Atmospheric events

Следва да има meaningful events като:

🇯🇵 Japan entered the current Lot.

👁 318 people are observing.

📡 An empty signal was detected.

❓ Something changed while nobody was looking.

✦ A MYTHIC artifact surfaced.

Но:

не използвай cheap random noise.

Събитията трябва да произлизат от реални или безопасно derived system states.

И никога не трябва да leak-ват secret Artifact information преди Reveal.

27. Country mechanics

Това още не е напълно реализирано.

В текущия prototype JOIN изпраща timezone като country.

Това е неправилно семантично.

Нужна е privacy-conscious country система.

Никога не трябва да се съхранява/показва precise user location.

Country може в бъдеще да захранва:

country participation
artifact discoveries
total Weirdness
country archive statistics
weirdest discovered Artifact
global rankings

Пример:

BULGARIA

ARTIFACTS DISCOVERED     31
TOTAL WEIRDNESS          2,194
MYTHIC                   3
WEIRDEST                 THE SILENT KETTLE
28. Secret Sets

Collection има концепция за hidden sets.

Примери:

📡 SIGNAL WITHOUT SOURCE
👁 HIGH STRANGENESS
🗝 RELICS OF USE
THE WRONG DRAWER

Sets трябва да се определят от semantic characteristics, а не от произволни Artifact IDs.

В бъдеще могат да използват:

classification
traits
anomaly
origin
palette
Weirdness
object relationships
29. Important frontend routes
/void
/archive
/archive/:artifact-id
/collection

API приблизително:

GET  /api/lot

POST /api/join

POST /api/heartbeat

GET  /api/archive

GET  /api/archive/:id

GET  /api/public-key

POST /api/contribute

GET  /api/artifact/:id/download

GET  /health

Development-only routes може да съществуват internally:

/api/demo/close
/api/demo/next

Но при:

NODE_ENV=production

трябва да са недостъпни.

30. Current code architecture
the-void/
├── server/
│   ├── lots/
│   ├── claims/
│   ├── artifacts/
│   ├── archive/
│   ├── contributions/
│   ├── quality/
│   ├── storage/
│   ├── crypto/
│   └── http/
│
├── engine/
│   ├── registry/
│   ├── grammars/
│   ├── palettes/
│   ├── anomalies/
│   ├── identity/
│   ├── coherence/
│   └── renderer/
│
├── web/
│   └── public/
│       ├── index.html
│       ├── void.css
│       └── app.js
│
├── shared/
│   └── artifact-protocol/
│
├── tests/
│
├── Dockerfile
├── render.yaml
└── package.json

Node.js 20+ / ESM.

Минимални външни dependencies.

31. Tests

Към последната версия тестовете минаваха:

✓ VOID-500 registry contains exactly 500 semantic targets

✓ 20 grammar families have renderers

✓ all 500 targets reached through deterministic generation

✓ 500 deterministic semantic artifacts rendered at 24×24

✓ 5,000 coherent artifact stories

✓ anomaly domains:
  SPACE
  SIGNAL
  TIME
  OBSERVATION
  BEHAVIOR

✓ public classes:
  IMPLEMENT
  SIGNAL
  RELIC
  IDOL
  WEAPON
  REMAINS
  MACHINE
  SPECIMEN
  VESSEL
  UNKNOWN

✓ 2,000 artifacts passed Quality Gate

✓ Ed25519 signing / tamper rejection

✓ readable typography

✓ purple-orb information modal

✓ public demo controls removed

✓ automatic shared Lot lifecycle enabled

✓ multi-device/deployment configuration present

HTTP smoke:

/void        200
/archive     200
/collection  200
/health      200
/api/lot     200

Production:

/api/demo/close → blocked
32. Най-важните оставащи engineering задачи

Coding agent не трябва да започва rewrite от нулата.

Продължава от текущия codebase.

Приоритетът е приблизително:

A. Real browser Artifact verification

Реален Ed25519 verification в /collection.

Това е най-същественият correctness bug.

B. Atomic multiplayer Lot lifecycle

В момента JSON persistence е достатъчна за prototype/LAN.

За реален concurrent internet traffic трябва да се предотвратят:

two simultaneous closes
two winners
duplicate archive writes
race between reveal and next Lot
lost heartbeat updates

Lot transition трябва да стане atomic.

C. Real persistence

Преминаване от JSON store към подходящ production persistence layer.

Да се запази interface abstraction, за да не се обвърже engine с database.

D. Real global activity

Да се заменят декоративните counts/rankings с реални aggregate values.

E. Country system

Privacy-safe coarse country.

F. Safe clue/anomaly event engine

Meaningful atmospheric events, които не leak-ват Artifact-а.

G. Archive provenance

Добавяне на:

discovered_at
Lot ID
witnesses
countries
combined presence
origin
commitment verification
H. Winner contribution hardening

Server-side:

one contribution per winner
moderation
rate limits
sanitization
future-pool lifecycle
I. Security
rate limiting
request size limits
secure session cookie in HTTPS
CSRF review
secret management
logging
error handling
abuse prevention
J. E2E tests

Нужни са browser tests за поне:

two clients join same Lot
presence differs per session
Artifact not leaked pre-reveal
automatic close
single winner
reveal identical for clients
archive persistence
download
signature verification
tampered Artifact rejection
next Lot
33. Product constraints, които НЕ трябва да се нарушават

Това е най-важната секция за coding agent.

DO NOT:

❌ add user accounts

❌ add registration/login

❌ add server-side personal inventories

❌ turn it into a clicker

❌ restore HOLD TO BID

❌ expose exact claim probabilities

❌ expose artifact seed before Reveal

❌ send hidden Artifact sprite before Reveal

❌ show internal taxonomy to users

❌ call Artifacts PNGs/files in the public UI

❌ turn the UI into a SaaS dashboard

❌ add random visual corruption just to increase Weirdness

❌ generate incoherent random lore/stats

❌ track ownership like NFT/blockchain

❌ claim exclusive ownership after download

❌ store precise location

❌ fill LIVE FEED with meaningless random spam
34. What the project SHOULD feel like

The experience should sit somewhere conceptually between:

old strange internet website
+
global browser event
+
collectible discovery
+
digital archaeology
+
mystery
+
small multiplayer ritual

Not:

game lobby
auction website
crypto marketplace
SaaS app
clicker
Discord bot
AI generator UI

The user should feel:

“I opened this strange place on the internet. Something is happening globally. I can stay and participate. Eventually something strange may surface.”

35. Recommended next implementation milestone

Do not spend the next iteration redesigning CSS again.

The visual direction is already sufficiently established.

The next meaningful milestone should be:

THE VOID v3 — REAL MULTIPLAYER CORE

with:

1. atomic persistent Lot state
2. real multi-client presence
3. server-authoritative lifecycle
4. real global activity
5. privacy-safe country aggregation
6. browser Ed25519 Artifact verification
7. complete Archive provenance
8. safe event/clue engine
9. contribution enforcement
10. E2E multiplayer tests

Only after this is stable should the agent spend substantial effort on further visual polish.

Кратък prompt за самия coding agent

Можеш да му дадеш целия контекст отгоре плюс този финален instruction:

Continue THE VOID from the supplied the-void-real-multidevice-v2 codebase. Do not rewrite the project from scratch and do not reinterpret established product decisions. Treat the existing visual design, procedural VOID-500 Artifact Engine, no-account model, JOIN → Presence → hidden Claim → Reveal loop, World Archive, local Collection, Artifact protocol, and player-facing language rules as established requirements. Your next milestone is a real multiplayer/internet-ready core: atomic server-authoritative Lot lifecycle, persistent shared state, real multi-client presence/global activity, privacy-safe country aggregation, cryptographic browser-side Artifact verification, complete Archive provenance, safe non-leaking atmospheric events, hardened winner contribution flow, and meaningful E2E multiplayer/security tests. Preserve the mystery: never send Artifact identity, sprite, seed, anomaly, or other secret canonical data before Reveal. Do not expose exact odds or internal taxonomy. Public UI must refer to downloadable objects only as ARTIFACTS. Do not add accounts, server-side personal collections, HOLD TO BID, NFT ownership, or generic SaaS UI. Run and extend the existing test suite continuously, and leave the codebase in a runnable state after each major change. The target is not another prototype; it is a coherent deployable THE VOID platform.
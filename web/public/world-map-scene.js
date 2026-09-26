import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

let activeCleanup = null;
window.addEventListener("void:route", () => activeCleanup?.());

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function makePlanetTexture(kind) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const random = seeded(kind === "terra" ? 31415 : 27182);
  const image = context.createImageData(canvas.width, canvas.height);
  const noise = (x, y) => Math.sin(x * 2.4 + Math.sin(y * 3.1)) * .32 + Math.sin(x * 5.2 - y * 2.8) * .18 + Math.cos(x * 1.25 + y * 4.1) * .2 + Math.sin(x * .72 - y * .63) * .3;
  for (let y = 0; y < canvas.height; y++) {
    const latitude = (y / canvas.height - .5) * Math.PI;
    for (let x = 0; x < canvas.width; x++) {
      const nx = x / canvas.width * Math.PI * 2;
      const ny = y / canvas.height * Math.PI;
      const i = (y * canvas.width + x) * 4;
      const n = noise(nx, ny);
      if (kind === "terra") {
        const polar = Math.abs(latitude) > 1.2;
        const land = n + Math.sin(nx * 1.7 + ny * 2.2) * .16 > .13;
        const green = n > .48;
        const color = polar ? [205, 229, 241] : land ? (green ? [91, 151, 65] : [193, 157, 91]) : [17, 119 + Math.max(0, n) * 50, 185 + Math.max(0, n) * 35];
        const detail = (random() - .5) * 20;
        image.data[i] = Math.max(0, color[0] + detail);
        image.data[i + 1] = Math.max(0, color[1] + detail);
        image.data[i + 2] = Math.max(0, color[2] + detail);
      } else {
        const craterNoise = noise(nx * 3.2, ny * 3.2);
        const shade = 192 + craterNoise * 26 + (random() - .5) * 12;
        const crater = Math.sin(nx * 11 + Math.sin(ny * 9) * 2) * Math.cos(ny * 14) > .89 ? 42 : 0;
        image.data[i] = Math.max(0, shade - crater);
        image.data[i + 1] = Math.max(0, shade - crater - 8);
        image.data[i + 2] = Math.max(0, shade - crater + 5);
      }
      image.data[i + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeOrbit(radius, rotation, opacity = .38) {
  const points = [];
  for (let i = 0; i <= 240; i++) {
    const angle = i / 240 * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * .34, 0));
  }
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0xf1ca8b, transparent: true, opacity }));
  line.rotation.z = rotation;
  line.rotation.x = -.15;
  return line;
}

function makeNebula() {
  const group = new THREE.Group();
  const colors = [0xa438ff, 0x6335ff, 0xff63d7, 0x4437ce];
  for (let i = 0; i < 8; i++) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(1.35 + i * .105, .055 + (i % 3) * .025, 8, 128), new THREE.MeshBasicMaterial({ color: colors[i % colors.length], transparent: true, opacity: .16 + (i % 3) * .035, blending: THREE.AdditiveBlending, depthWrite: false }));
    mesh.rotation.x = .22 + i * .025;
    mesh.rotation.y = i * .08;
    group.add(mesh);
  }
  const core = new THREE.Mesh(new THREE.CircleGeometry(1.28, 64), new THREE.MeshBasicMaterial({ color: 0x100b38, transparent: true, opacity: .92, side: THREE.DoubleSide }));
  group.add(core);
  for (let i = 0; i < 4; i++) {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(.17 + (i % 3) * .08, 0), new THREE.MeshStandardMaterial({ color: 0x342954, roughness: 1 }));
    const angle = i * 1.57 + .4;
    rock.position.set(Math.cos(angle) * (1.7 + i % 2 * .35), Math.sin(angle) * 1.05, .2);
    rock.rotation.set(i * .8, i * .5, i);
    group.add(rock);
  }
  group.position.set(7.25, 3.5, -2.8);
  group.scale.setScalar(1.2);
  return group;
}

export function mountWorldMap(container) {
  if (!container || !container.isConnected) return;
  activeCleanup?.();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101c51);
  scene.fog = new THREE.FogExp2(0x26366f, .009);
  const camera = new THREE.PerspectiveCamera(43, 1, .1, 100);
  camera.position.set(0, .15, 15.7);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.replaceChildren(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xb9d6ff, 0x49325f, 2.3));
  const sun = new THREE.DirectionalLight(0xffe0aa, 4.4);
  sun.position.set(-5, 7, 10);
  scene.add(sun);
  const fill = new THREE.PointLight(0x7259ff, 28, 25);
  fill.position.set(7, 3, -2);
  scene.add(fill);

  const sky = new THREE.Mesh(new THREE.SphereGeometry(55, 40, 28), new THREE.MeshBasicMaterial({ color: 0x283a83, side: THREE.BackSide }));
  scene.add(sky);
  const starRandom = seeded(778899);
  const starPositions = new Float32Array(2100 * 3);
  const starColors = new Float32Array(2100 * 3);
  for (let i = 0; i < 2100; i++) {
    starPositions[i * 3] = (starRandom() - .5) * 70;
    starPositions[i * 3 + 1] = (starRandom() - .5) * 40;
    starPositions[i * 3 + 2] = -12 - starRandom() * 34;
    const tint = starRandom();
    starColors[i * 3] = .72 + tint * .28;
    starColors[i * 3 + 1] = .73 + starRandom() * .25;
    starColors[i * 3 + 2] = .85 + starRandom() * .15;
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
  const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ size: .075, vertexColors: true, transparent: true, opacity: .95, sizeAttenuation: true }));
  scene.add(stars);

  const nebula = makeNebula();
  scene.add(nebula);
  const terra = new THREE.Group();
  const terraSurface = new THREE.Mesh(new THREE.SphereGeometry(3.55, 96, 72), new THREE.MeshStandardMaterial({ map: makePlanetTexture("terra"), roughness: .88, metalness: 0, emissive: 0x092c55, emissiveIntensity: .22 }));
  terra.add(terraSurface);
  const terraClouds = new THREE.Mesh(new THREE.SphereGeometry(3.61, 64, 48), new THREE.MeshBasicMaterial({ color: 0xeaf5ff, transparent: true, opacity: .13, wireframe: true }));
  terra.add(terraClouds);
  const terraGlow = new THREE.Mesh(new THREE.SphereGeometry(3.72, 64, 48), new THREE.MeshBasicMaterial({ color: 0x43beff, transparent: true, opacity: .13, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  terra.add(terraGlow);
  terra.position.set(-1.55, -.28, 0);
  terra.rotation.z = -.13;
  scene.add(terra);

  const elune = new THREE.Group();
  elune.add(new THREE.Mesh(new THREE.SphereGeometry(1.38, 64, 48), new THREE.MeshStandardMaterial({ map: makePlanetTexture("elune"), roughness: .97, emissive: 0x574875, emissiveIntensity: .2 })));
  elune.add(new THREE.Mesh(new THREE.SphereGeometry(1.47, 48, 32), new THREE.MeshBasicMaterial({ color: 0xe4c8ff, transparent: true, opacity: .12, side: THREE.BackSide, blending: THREE.AdditiveBlending })));
  elune.position.set(6.1, -.05, .2);
  scene.add(elune);

  const orbits = new THREE.Group();
  orbits.add(makeOrbit(5.1, -.24, .56), makeOrbit(8.25, .17, .5), makeOrbit(10.6, -.11, .3));
  scene.add(orbits);
  const rockRandom = seeded(44221);
  const rocks = new THREE.Group();
  for (let i = 0; i < 52; i++) {
    const size = .065 + rockRandom() * .23;
    const material = new THREE.MeshStandardMaterial({ color: rockRandom() > .78 ? 0x76517c : 0x494263, roughness: .94, flatShading: true });
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(size, 0), material);
    const angle = rockRandom() * Math.PI * 2;
    const radius = 4.25 + rockRandom() * 7.1;
    rock.position.set(Math.cos(angle) * radius, (rockRandom() - .5) * 6, -1.5 - rockRandom() * 4);
    rock.rotation.set(rockRandom() * 3, rockRandom() * 3, rockRandom() * 3);
    rock.userData.spin = (rockRandom() - .5) * .004;
    rocks.add(rock);
  }
  scene.add(rocks);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  let disposed = false;
  let pointerDown = null;
  const clock = new THREE.Clock();
  const resize = () => {
    if (!container.isConnected || disposed) return;
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    camera.aspect = width / height;
    camera.position.z = width < 560 ? 19 : width < 850 ? 17.5 : 15.7;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  const onPointerDown = event => { pointerDown = { x: event.clientX, y: event.clientY }; };
  const onPointerUp = event => {
    if (!pointerDown || !container.isConnected) return;
    const distance = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
    pointerDown = null;
    if (distance < 9) {
      const bounds = container.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      if (raycaster.intersectObject(terraSurface).length) location.href = "/map?planet=terra";
      else if (raycaster.intersectObjects(elune.children).length) location.href = "/map?planet=elune";
    }
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointerup", onPointerUp);
  resize();

  const animate = () => {
    if (disposed || !container.isConnected) return;
    frame = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    if (!reduceMotion) {
      terra.rotation.y = time * .035;
      terraClouds.rotation.y = -time * .016;
      elune.rotation.y = time * .075;
      rocks.children.forEach(rock => { rock.rotation.y += rock.userData.spin; rock.rotation.x += rock.userData.spin * .55; });
      nebula.rotation.z = Math.sin(time * .08) * .025;
      stars.rotation.y = Math.sin(time * .018) * .008;
    }
    renderer.render(scene, camera);
  };
  animate();

  activeCleanup = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointerup", onPointerUp);
    scene.traverse(object => {
      object.geometry?.dispose();
      if (object.material) for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        for (const value of Object.values(material)) if (value?.isTexture) value.dispose();
        material.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
    activeCleanup = null;
  };
  return activeCleanup;
}
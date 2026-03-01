// ===== Scene & Camera =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 10);

// ===== Renderer =====
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('three-canvas'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// ===== OrbitControls =====
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// ===== Lights =====
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// ===== Placeholder Cube =====
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1, 0);
scene.add(cube);

// ===== Load Main 3D Model (Car) =====
const loader = new THREE.GLTFLoader();
loader.load(
  'assets/car.glb', // replace with your own model
  function (gltf) {
    const car = gltf.scene;
    car.scale.set(0.5, 0.5, 0.5);
    car.position.set(0, 0, 0);
    scene.add(car);

    // Animate car rotation continuously
    gsap.to(car.rotation, { y: "+=6.28", duration: 20, repeat: -1, ease: "linear" });
  },
  undefined,
  function (error) { console.error(error); }
);

// ===== Small Floating Objects =====
for (let i = 0; i < 10; i++) {
  const sphereGeo = new THREE.SphereGeometry(0.1, 16, 16);
  const sphereMat = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.set(Math.random() * 6 - 3, Math.random() * 3 + 1, Math.random() * 6 - 3);
  scene.add(sphere);

  // Animate floating up/down
  gsap.to(sphere.position, { y: sphere.position.y + 1, duration: 2 + Math.random() * 2, yoyo: true, repeat: -1, ease: "sine.inOut" });
}

// ===== GSAP Cube Animation =====
gsap.to(cube.rotation, { y: "+=6.28", duration: 10, repeat: -1, ease: "linear" });
gsap.to(cube.position, { y: 1.5, duration: 1, yoyo: true, repeat: -1, ease: "power1.inOut" });

// ===== Animate Scene =====
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ===== Responsive =====
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

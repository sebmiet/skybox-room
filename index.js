import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

//							Scene
const scene = new THREE.Scene();

//              Camera
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 5;

//           Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//					ORBIT CONTROLS
let orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.addEventListener("change", renderer.domElement);

//						TEXTURES
let materials = [];

const posz = new THREE.TextureLoader().load("./textures/posz.jpg");
const negz = new THREE.TextureLoader().load("./textures/negz.jpg");
const posy = new THREE.TextureLoader().load("./textures/posy.jpg");
const negy = new THREE.TextureLoader().load("./textures/negy.jpg");
const posx = new THREE.TextureLoader().load("./textures/posx.jpg");
const negx = new THREE.TextureLoader().load("./textures/negx.jpg");
materials.push(new THREE.MeshBasicMaterial({ map: posx }));
materials.push(new THREE.MeshBasicMaterial({ map: negx }));

materials.push(new THREE.MeshBasicMaterial({ map: posy }));
materials.push(new THREE.MeshBasicMaterial({ map: negy }));
materials.push(new THREE.MeshBasicMaterial({ map: posz }));
materials.push(new THREE.MeshBasicMaterial({ map: negz }));

materials.map((material) => {
  material.side = THREE.BackSide;
});

//								BOX
const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
const skyBox = new THREE.Mesh(skyBoxGeometry, materials);
skyBox.scale.x = -1; //it's flipping view from mirror
skyBox.rotation.y = 9.5;
scene.add(skyBox);

//								Lights
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
const sunLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(sunLight);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

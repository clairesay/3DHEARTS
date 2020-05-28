

///////////////////////// SETTING UP THE SCENE /////////////////////////////  
// var labelRenderer; 
//establishing the scebe abd background color
var scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0, 0, 0)");
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

//Adding Lights to the Scene
var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

//rendering the window and everything in it
var renderer = new THREE.WebGLRenderer();
renderer.setSize((window.innerWidth / 1.5), (window.innerHeight / 1.5));

//Insert inside 'heart-model' div in interaction template
var container = document.getElementById('heart-model');
container.appendChild(renderer.domElement);

//Setting the position of the camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;

//Adding Orbit Controls
var controls = new THREE.OrbitControls(camera, container);
// controls.enableDamping = true;

// Declare variables to manipulate heart object rotation
var heartObj;
var xRotation, yRotation, zRotation;
///////////////////////// MODEL LOADER /////////////////////////////
// Loading STL model
var loader = new THREE.STLLoader()
loader.load('models/17040.stl', function (geometry) {

  //centering geometry
  geometry.center();

  //material of model
  var material = new THREE.MeshStandardMaterial({
    color: 0xfffeee,
    metalness: 0.1,
    roughness: 0.75,
    shadowSide: THREE.DoubleSide,
  });

  //combining loaded geometry with material
  var heart = new THREE.Mesh(geometry, material);
  heart.castShadow = true;
  heart.name = 'heart';

  //adding heart to the scene
  scene.add(heart);

  //positioning the heart for optimal scale and visibility
  heart.scale.set(0.1, 0.1, 0.1);
  heart.rotation.x = -1.5;
  heart.rotation.z = -3;

  // get heart object to rotate
  heartObj = scene.getObjectByName('heart', true);
})


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    renderer.render(scene, camera);
    // labelRenderer.render(scene, camera);
}

animate();

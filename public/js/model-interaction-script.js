///////////////////////// SETTING UP THE SCENE /////////////////////////////   
//establishing the scebe abd background color
var scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0, 0, 0)");
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

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


    // //////////////////
  var earthDiv = document.createElement( 'div' );
  earthDiv.className = 'label';
  earthDiv.textContent = 'Earth';
  earthDiv.style.marginTop = '-1em';
  var earthLabel = new CSS2DObject( earthDiv );
  earthLabel.position.set( 0, 100, 0 );
  heart.add( earthLabel );

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  document.body.appendChild( labelRenderer.domElement );
  // /////////////////
})



////////////////////// CHANGING VIEWS WITH BUTTONS /////////////////////

// document.getElementById('view1-17040').addEventListener('click', function orientView() {
//   camera.position.x = 7.96
//   camera.position.y = 5.83
//   camera.position.z = 17.4
//   camera.rotation.x = -0.32;
//   camera.rotation.y = 0.41;
//   camera.rotation.z = 0.13;
// })

// document.getElementById('view2-17040').addEventListener('click', function orientView() {
//   camera.position.x = 17.26
//   camera.position.y = 4.45
//   camera.position.z = 9.07
//   camera.rotation.x = -0.46
//   camera.rotation.y = 1.04
//   camera.rotation.z = 0.4
// })

// document.getElementById('view3-17040').addEventListener('click', function orientView() {
//   camera.position.x = 1.84
//   camera.position.y = -17.93
//   camera.position.z = -8.67
//   camera.rotation.x = 2.02
//   camera.rotation.y = 0.09
//   camera.rotation.z = -2.95
// })  

// document.getElementById('view4-17040').addEventListener('click', function orientView() {
//   camera.position.x = 0.7
//   camera.position.y = 5.24
//   camera.position.z = 19.29
//   camera.rotation.x = -0.27
//   camera.rotation.y = 0.04
//   camera.rotation.z = 0.01
// })  

// document.getElementById('view5-17040').addEventListener('click', function orientView() {
//   camera.position.x = -6.19
//   camera.position.y = -14
//   camera.position.z = 12.87
//   camera.rotation.x = 0.83
//   camera.rotation.y = -0.31
//   camera.rotation.z = 0.32
// })  

// document.getElementById('view6-17040').addEventListener('click', function orientView() {
//   camera.position.x = 17.21
//   camera.position.y = -10.12
//   camera.position.z = 1.24
//   camera.rotation.x = 1.45
//   camera.rotation.y = 1.04
//   camera.rotation.z = -1.43
// })  

// document.getElementById('view7-17040').addEventListener('click', function orientView() {
//   // camera.position.lerp(new THREE.Vector3(0.37, -11.82, -16.13), viewLerp)
//   camera.position.x = 0.37
//   camera.position.y = -11.82
//   camera.position.z = -16.13
//   camera.rotation.x = 2.51
//   camera.rotation.y = 0.02
//   camera.rotation.z = -3.13
// })  

// document.getElementById('view8-17040').addEventListener('click', function orientView() {
//   camera.position.x = -0.4
//   camera.position.y = -2.64
//   camera.position.z = -19.82
//   camera.rotation.x = 3.01
//   camera.rotation.y = -0.02
//   camera.rotation.z = 3.14
// })  

// document.getElementById('report').addEventListener('click', function orientView1() {
//   console.log(camera.position, camera.rotation);
// })
////////////////////// CHANGING VIEWS WITH BUTTONS /////////////////////




////////////////////// GUI /////////////////////

// var params = {
//   // rotateX: 0,
//   // rotateY: 0,
//   // rotateZ: 0,
//   showAxes: true
// }

// var gui = new dat.GUI();

// // gui.add(params, 'rotateX', -Math.PI/2, Math.PI/2).step(0.01).name('Rotate on X Axis').onChange(function(value) {
// //   heartObj.rotation.x = value;
// // })
// // gui.add(params, 'rotateY', -Math.PI / 2, Math.PI / 2).step(0.01).name('Rotate on Y Axis').onChange(function (value) {
// //   heartObj.rotation.y = value;
// // })
// // gui.add(params, 'rotateZ', -Math.PI/2, Math.PI/2).step(0.01).name('Rotate on Z Axis').onChange(function(value) {
// //   heartObj.rotation.z = value;
// // })

// gui.add(params, 'showAxes').name('Show Axes').onChange(function (value) {
//   axesHelper.visible = value;
//   gridXZ.visible = value;
// })




// //Grid for reference
// var gridXZ = new THREE.GridHelper(10, 10);
// gridXZ.visible = true;
// scene.add(gridXZ);

// //Axes for xyz reference
// var axesHelper = new THREE.AxesHelper(5);
// axesHelper.visible = true;
// scene.add(axesHelper);

//Adding Lights to the Scene
var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

//Animate and Render
var animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  // console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
  renderer.render(scene, camera);
  labelRenderer.render( scene, camera ); //added
};

// resize window on event onWindowResize
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize((window.innerWidth / 1.5), (window.innerHeight / 1.5));
}

animate();




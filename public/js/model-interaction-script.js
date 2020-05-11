
import * as THREE from '../js/three.module.js';
import { OBJLoader } from '../js/OBJLoader.js';
import { OrbitControls } from '../js/OrbitControls.js';
//Because the module doesn't work otherwise.
window.camera = camera;

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
var light = new THREE.PointLight( 0xfffdd0, 1.1, 100 );
light.position.set( camera.position.x, camera.position.y, camera.position.z );
scene.add( light );

//Adding Orbit Controls
var controls = new OrbitControls(camera, container);
// controls.enableDamping = true;

// Declare variables to manipulate heart object rotation
var heartObj;
var xRotation, yRotation, zRotation;

///////////////////////// MODEL LOADER /////////////////////////////

// Loading STL model
var loader = new OBJLoader()
loader.load('models/17040.obj', function ( heart ) {

  //centering geometry
  // geometry.center();
  heart.traverse( function ( child ) {

    if ( child instanceof THREE.Mesh ) {
       child.geometry.center();

    }
  })

  //material of model
  // var material = new THREE.MeshStandardMaterial({
  //   color: 0xfffeee,
  //   metalness: 0.1,
  //   roughness: 0.75,
  //   shadowSide: THREE.DoubleSide,
  // });

  //combining loaded geometry with material
  // var heart = new THREE.Mesh(geometry, material);
  // heart.castShadow = true;
  heart.name = 'heart';

  //adding heart to the scene
  scene.add(heart);

  //positioning the heart for optimal scale and visibility
  heart.scale.set(0.1, 0.1, 0.1);
  console.log(heart.rotation.x, heart.rotation.y, heart.rotation.z)
  heart.rotation.x = 0;
  heart.rotation.y = 3;
  heart.rotation.z = 0;

  // get heart object to rotate
  heartObj = scene.getObjectByName('heart', true);
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

// //Adding Lights to the Scene
// var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
// scene.add(light);

//Animate and Render
var animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  // console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
  renderer.render(scene, camera);
};

// resize window on event onWindowResize
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize((window.innerWidth / 1.5), (window.innerHeight / 1.5));
}

animate();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PREVIOUSLY THIS WAS THE MAIN INTERACTION JS FILE //

//Because the module doesn't work otherwise.
window.nextPoint = nextPoint;
window.nextModule = nextModule;
window.nextSlide = nextSlide;
window.nextStep = nextStep;
window.exitModule = exitModule;
window.jumpSection = jumpSection;
window.showReviewModal = showReviewModal;
window.changeView = changeView;
////////////////// TOP LEFT EXIT MODULE ////////////////////
//Warning to prevent user from accidentally leaving the module

function exitModule() {
  Swal.fire({
    title: 'Leave Module?',
    text: 'You will be taken back to the Modules Homepage.',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Leave',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      window.location.href = "index.html";
    }
  })
}

//////////////////////////////////////// NAVIGATION TAB  //////////////////////////////////////
//checking for the path name
var path = window.location.pathname;
var page = path.split("/").pop();

//highlighting the text to show the current page displayed
if (page.includes('oe')) {
  document.querySelectorAll('#navigation-tab a')[0].style.color = "black";
  document.querySelectorAll('#navigation-tab a')[0].style.fontWeight = "500";
  document.querySelectorAll('#navigation-tab a')[0].style.cursor = "default";
} else if (page.includes('interaction')) {
  document.querySelectorAll('#navigation-tab a')[1].style.color = "black";
  document.querySelectorAll('#navigation-tab a')[1].style.fontWeight = "500";
  document.querySelectorAll('#navigation-tab a')[1].style.cursor = "default";
} else if (page.includes('explanation')) {
  document.querySelectorAll('#navigation-tab a')[2].style.color = "black";
  document.querySelectorAll('#navigation-tab a')[2].style.fontWeight = "500";
  document.querySelectorAll('#navigation-tab a')[2].style.cursor = "default";
}

//If the user clicks on a different section to jump to, warn them before they jump to it
function jumpSection(destination, sectionName) {
  if (destination == page) {
  } else {
    Swal.fire({
      title: 'Start the ' + sectionName + ' section?',
      text: 'You will leave this module.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Start',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        window.location.href = destination;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }
}

///////////////////////////////// AT THE END OF A MODULE ///////////////////////////
//at the end of the module, automatically forward user to the next section
function nextModule() {
  window.location.href = "17040-explanation.html";
}

////////// USING LOCAL STORAGE TO OFFSET IF USER NAVIGATES TO PREVIOUS SLIDE FIXING/////////////
document.getElementById('previous').addEventListener('click', function pointViewCount() {
  localStorage.setItem('prevCurrentPoint', currentPoint);
})

/////////////////////////////////// PROGRESSION THROUGH SLIDES ///////////////////////////////
let pointIncrement = 0;
//function to show current slide
function showSlide(currentSlide) {
  //if the current slide is the first one, hide the previous button and show the next button only
  if (currentSlide == 0) {
    document.getElementById('previous').style.visibility = "hidden"
    document.getElementById('next').style.visibility = "visible"
  //if the current slide is the second last one, show the next-module button, hide the next button and show the previous button
  } else if (currentSlide == (document.querySelectorAll('.module-slide').length - 1)) {
    document.getElementById('previous').style.visibility = "visible"
    document.getElementById('next-module').style.visibility = "visible"
    document.getElementById('next').style.visibility = "hidden"
  //show both the previous and next buttons and hide the next-module button at all other times
  } else {
    document.getElementById('previous').style.visibility = "visible"
    document.getElementById('next').style.visibility = "visible"
    document.getElementById('next-module').style.visibility = "hidden"
  }

  //show this slide a.k.a current slide
  var thisSlide = document.getElementsByClassName('module-slide')[currentSlide];
  thisSlide.style.display = "flex";
  var caseContent = document.querySelectorAll('.case-content');
  //if this slide contains a class called 'case-content' a.k.a a point in a slide
  for (var i = 0; i < caseContent.length; i++) {
    if ((thisSlide.contains(caseContent[i])) && (true)) {
      //change the next button to show the next point
      document.getElementById('next').setAttribute("onclick", "nextPoint(1);")
    }
  }

  //instead if the current slide has steps i.e. the actual interaction stage
  var stepContent = document.querySelectorAll('.step');
  //check for steps
  for (var i = 0; i < stepContent.length; i++) {
    if ((thisSlide.contains(stepContent[i])) && (true)) {
      //change the next and previous buttons to move through steps
      document.getElementById('next').setAttribute("onclick", "nextStep(1);")
      document.getElementById('previous').setAttribute("onclick", "nextStep(-1);")
      //if the current step is the first step, display it (it doesn't work when this isn't there for some reason)
      if (currentStep == 0) {
        var firstStep = document.querySelectorAll('.step')[currentStep];
        firstStep.style.display = "flex"
      }
    }
  }
}

//Progression through slides
var currentSlide = 0;
function nextSlide(n) {
  //hide the previous slide
  var previousSlide = document.getElementsByClassName('module-slide')[currentSlide];
  previousSlide.style.display = "none";
  //add or minus 1 to current slide, depending on previous or next button click
  currentSlide += n;
  //display the slide
  showSlide(currentSlide);
}
showSlide(currentSlide);

/////////////////////////////////// PROGRESSION THROUGH POINT CONTENT /////////////////////////////

//This both a progression and display function for showing each point in the module
var currentPoint = 0;
function nextPoint(n) {
  //x is the number of elements with the class case-content within the current slide
  var x = document.getElementsByClassName('module-slide')[currentSlide].querySelectorAll('.case-content').length;
  //Add or minus 1 to the current point, depending on previous or next button click
  currentPoint += n;
  pointIncrement++;
  var thisPoint = document.getElementsByClassName('case-content')[currentPoint];

  //if the current point is less than the number existing in this slide
  if (currentPoint < x) {
    //show it
    thisPoint.style.visibility = "visible";
    //if the points on this slide have already been displayed, add on the number to the current point count so that the it skips to the next slide
  } else if (localStorage.hasOwnProperty('prevCurrentPoint') == true) {
    currentPoint == (parseInt(localStorage.getItem('prevCurrentPoint')));
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('next').click();
    localStorage.clear();
    currentPoint--;
    //if the current point is the maximum number of points in this slide, clear the class name, move on
  } else if (currentPoint == x) {
    for (let i = 0; i < currentPoint; i++) {
      document.getElementsByClassName('module-slide')[currentSlide].querySelectorAll('.case-content')[0].classList = "";
    }
    document.getElementById('next').click();
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('next').click();
  } else {
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('next').click();
    currentPoint = 0;
  }
}

////////////////////////////////// PROGRESSION THROUGH STEPS OF INTERACTION /////////////////////////////
//Progress through the Steps
var currentStep = 0;
function nextStep(m) {
  //Increment the steps by either -1 or 1 depending upon previous or next buttons clicked
  currentStep += m;
  //If the current step exists
  if (currentStep > 0) {
    //Hide the previous step
    var previousStep = document.querySelectorAll('.step')[currentStep - 1];
    previousStep.style.display = "none";
  }
  //Show the current step
  showStep();
}

//Display the Step
function showStep() {
  //Number of Steps
  var steps = document.querySelectorAll('.step').length;
  
  //If the first step hasn't been accessed yet, progress to changing slides
  if (currentStep < 0) {
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('previous').setAttribute("onclick", "nextSlide(-1);");
    document.getElementById('previous').click();
    currentStep = 0;

  //If the current step is less than the number of steps that exist but greater than 0
  } else if ((currentStep < steps) && (currentStep >= 0)) {
    var thisStep = document.querySelectorAll('.step')[currentStep];
    for (let l = 0; l < steps; l++) {
      //And if step[l] doesn't equal to the current step that is being displayed
      if (l != currentStep) {
        document.querySelectorAll('.step')[l].style.display = "none";
      }
    }
    //show this step
    thisStep.style.display = "flex";
    // Switch View in Three
    changeView(currentStep)
    
    //If the current step has reached the number of existing steps, progress to changing slides
  } else if (currentStep == (steps)) {
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('previous').setAttribute("onclick", "nextSlide(-1);");
    document.getElementById('next').click();
  }
}

////////////////////////////////////// CHANGING VIEWS IN THREE JS /////////////////////////////////////////////

function changeView(step) {
  switch (step) {
    case 1:
      camera.position.x = 7.96
      camera.position.y = 5.83
      camera.position.z = 17.4
      camera.rotation.x = -0.32;
      camera.rotation.y = 0.41;
      camera.rotation.z = 0.13;
      light.position.set( camera.position.x, camera.position.y, camera.position.z );
      break;
    case 2:
      camera.position.x = 17.26
      camera.position.y = 4.45
      camera.position.z = 9.07
      camera.rotation.x = -0.46
      camera.rotation.y = 1.04
      camera.rotation.z = 0.4
      light.position.set( camera.position.x, camera.position.y, camera.position.z );
      break;
    case 3:
      camera.position.x = 1.84
      camera.position.y = -17.93
      camera.position.z = -8.67
      camera.rotation.x = 2.02
      camera.rotation.y = 0.09
      camera.rotation.z = -2.95
      light.position.set( camera.position.x, camera.position.y, camera.position.z );
      break;
    case 4:
      camera.position.x = 0.7
      camera.position.y = 5.24
      camera.position.z = 19.29
      camera.rotation.x = -0.27
      camera.rotation.y = 0.04
      camera.rotation.z = 0.01
      light.position.set( camera.position.x, camera.position.y, camera.position.z );
      break;
    case 5:
      camera.position.x = -6.19
      camera.position.y = -14
      camera.position.z = 12.87
      camera.rotation.x = 0.83
      camera.rotation.y = -0.31
      camera.rotation.z = 0.32
      light.position.set( camera.position.x, camera.position.y, camera.position.z );
      break;
    case 6:
      camera.position.x = 17.21
      camera.position.y = -10.12
      camera.position.z = 1.24
      camera.rotation.x = 1.45
      camera.rotation.y = 1.04
      camera.rotation.z = -1.43
      light.position.set( camera.position.x, camera.position.y, camera.position.z );
      break;
    case 7:
      camera.position.x = 0.37
      camera.position.y = -11.82
      camera.position.z = -16.13
      camera.rotation.x = 2.51
      camera.rotation.y = 0.02
      camera.rotation.z = -3.13
      light.position.set( camera.position.x, camera.position.y, camera.position.z );
      break;
    case 8:
      camera.position.x = -0.4
      camera.position.y = -2.64
      camera.position.z = -19.82
      camera.rotation.x = 3.01
      camera.rotation.y = -0.02
      camera.rotation.z = 3.14
      light.position.set( camera.position.x, camera.position.y, camera.position.z );
      break;
    default:
      break;
  }

}

/////////////////////////////////////// MODAL REVIEW INFORMATION /////////////////////////////////////////////

//Toggling display of review information in modal
function showReviewModal() {
  //Modal Background
  var modalBlackout = document.getElementById('modal-blackout');
  modalBlackout.classList.toggle('show-modal');
  //Actual Modal
  var modal = document.getElementById('modal');
  modal.classList.toggle('show-modal');
}

//Selecting onexamination and chest xr review titles and content
var OEReviewHeading = document.getElementById('on-examination-review');
var chestXRReviewHeading = document.getElementById('chest-xr-review');
var OEReviewContent = document.getElementById('on-examination-review-content');
var chestXRReviewContent = document.getElementById('chest-xr-review-content');

//On Examination
//Check if OE heading is clicked to show OE review content
OEReviewHeading.addEventListener('click', function showOEReview() {
  OEReviewHeading.style.backgroundColor = "black";
  chestXRReviewHeading.style.backgroundColor = "gray";
  OEReviewContent.style.display = "flex";
  chestXRReviewContent.style.display = "none";
})

//Chest XR
//Check if Chest XR heading is clicked to show Chest XR review content
chestXRReviewHeading.addEventListener('click', function showChestXRReview() {
  chestXRReviewHeading.style.backgroundColor = "black";
  OEReviewHeading.style.backgroundColor = "gray";
  OEReviewContent.style.display = "none";
  chestXRReviewContent.style.display = "flex";
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////// TOP LEFT EXIT MODULE ////////////////////

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
      console.log('noway');
      window.location.href = "index.html";
    }
  })
}

////////////////// NAVIGATION TAB  ////////////////////
var path = window.location.pathname;
var page = path.split("/").pop();

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

function jumpSection(destination, sectionName) {
  console.log(destination);
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

//////////// BACK BUTTON FIXING //////////////

document.getElementById('previous').addEventListener('click', function pointViewCount() {
  localStorage.setItem('prevCurrentPoint', currentPoint);
  // console.log(localStorage.getItem('prevCurrentPoint'));
})


////////// AT THE END OF A MODULE /////////////
function nextModule() {
  window.location.href = "17040-EXPLANATION.html";
}

////////// PROGRESSION THROUGH CONTENT /////////////
let blarg = 0;


function showSlide(currentSlide) {
  if (currentSlide == 0) {
    document.getElementById('previous').style.visibility = "hidden"
    document.getElementById('next').style.visibility = "visible"
  } else if (currentSlide == (document.querySelectorAll('.module-slide').length - 1)) {
    document.getElementById('previous').style.visibility = "visible"
    document.getElementById('next-module').style.visibility = "visible"
    document.getElementById('next').style.visibility = "hidden"
  } else {
    document.getElementById('previous').style.visibility = "visible"
    document.getElementById('next').style.visibility = "visible"
    document.getElementById('next-module').style.visibility = "hidden"
  }

  var thisSlide = document.getElementsByClassName('module-slide')[currentSlide];
  thisSlide.style.display = "flex";
  var caseContent = document.querySelectorAll('.case-content');
  for (var i = 0; i < caseContent.length; i++) {
    if ((thisSlide.contains(caseContent[i])) && (true)) {
      document.getElementById('next').setAttribute("onclick", "nextPoint(1);")
    }
  }
  //This is for the interaction steps
  var stepContent = document.querySelectorAll('.step');
  for (var i = 0; i < stepContent.length; i++) {
    if ((thisSlide.contains(stepContent[i])) && (true)) {
      document.getElementById('next').setAttribute("onclick", "nextStep(1);")
      document.getElementById('previous').setAttribute("onclick", "nextStep(-1);")
      if (currentStep == 0) {
        console.log('nail')
        var firstStep = document.querySelectorAll('.step')[currentStep];
        firstStep.style.display = "flex"
      }
    }
  }

}


var currentSlide = 0;
function nextSlide(n) {
  var previousSlide = document.getElementsByClassName('module-slide')[currentSlide];
  previousSlide.style.display = "none";
  currentSlide += n;
  showSlide(currentSlide);
}

showSlide(currentSlide);

var currentPoint = 0;
function nextPoint(n) {
  var x = document.getElementsByClassName('module-slide')[currentSlide].querySelectorAll('.case-content').length;
  currentPoint += n;
  blarg++;

  var thisPoint = document.getElementsByClassName('case-content')[currentPoint];
  //count how many are already visible

  if (currentPoint < x) {
    thisPoint.style.visibility = "visible";

  } else if (localStorage.hasOwnProperty('prevCurrentPoint') == true) {
    currentPoint == (parseInt(localStorage.getItem('prevCurrentPoint')));
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('next').click();
    localStorage.clear();
    currentPoint--;
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

// document.querySelector('.step:first-of-type')[0].style.display = "flex";

var currentStep = 0;
function nextStep(m) {
  console.log(m);
  currentStep += m;
  if (currentStep <= 0) {
  } else {
    var previousStep = document.querySelectorAll('.step')[currentStep - 1];
    previousStep.style.display = "none";
  }
  console.log(currentStep)
  showStep();
}

function showStep() {
  var steps = document.querySelectorAll('.step').length;
  if (currentStep < 0) {
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('previous').setAttribute("onclick", "nextSlide(-1);");
    document.getElementById('previous').click();
    currentStep = 0;
  } else if ((currentStep < steps) && (currentStep >= 0)) {
    var thisStep = document.querySelectorAll('.step')[currentStep];
    for (let l = 0; l < steps; l++) {
      if (l != currentStep) {
        document.querySelectorAll('.step')[l].style.display = "none";
      }
    }
    thisStep.style.display = "flex";

    // Switch View in Three
    changeView(currentStep)

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
      break;
    case 2:
      camera.position.x = 17.26
      camera.position.y = 4.45
      camera.position.z = 9.07
      camera.rotation.x = -0.46
      camera.rotation.y = 1.04
      camera.rotation.z = 0.4
      break;
    case 3:
      camera.position.x = 1.84
      camera.position.y = -17.93
      camera.position.z = -8.67
      camera.rotation.x = 2.02
      camera.rotation.y = 0.09
      camera.rotation.z = -2.95
      break;
    case 4:
      camera.position.x = 0.7
      camera.position.y = 5.24
      camera.position.z = 19.29
      camera.rotation.x = -0.27
      camera.rotation.y = 0.04
      camera.rotation.z = 0.01
      break;
    case 5:
      camera.position.x = -6.19
      camera.position.y = -14
      camera.position.z = 12.87
      camera.rotation.x = 0.83
      camera.rotation.y = -0.31
      camera.rotation.z = 0.32
      break;
    case 6:
      camera.position.x = 17.21
      camera.position.y = -10.12
      camera.position.z = 1.24
      camera.rotation.x = 1.45
      camera.rotation.y = 1.04
      camera.rotation.z = -1.43
      break;
    case 7:
      camera.position.x = 0.37
      camera.position.y = -11.82
      camera.position.z = -16.13
      camera.rotation.x = 2.51
      camera.rotation.y = 0.02
      camera.rotation.z = -3.13
      break;
    case 8:
      camera.position.x = -0.4
      camera.position.y = -2.64
      camera.position.z = -19.82
      camera.rotation.x = 3.01
      camera.rotation.y = -0.02
      camera.rotation.z = 3.14
      break;
    default:
      break;
  }
}



////////////////////////////////////// REVIEW INFORMATION /////////////////////////////////////////////


function showReviewModal() {
  var modalBlackout = document.getElementById('modalBlackout');
  modalBlackout.classList.toggle('showModal');
  var modal = document.getElementById('modal');
  modal.classList.toggle('showModal');
  console.log('working')
}

// var modalBlackout = document.getElementById('modalBlackout');
// var modal = document.getElementById('modal');


//   document.addEventListener('click', function(evt) {
//     if (document.getElementById('modal').classList.contains("showModal")) {
//     document.addEventListener('click', function(event) {
//       var isClickInside = modal.contains(event.target);
//     if ((isClickInside == false) && (document.getElementById('modal').classList.contains("showModal"))) {
//       console.log('heha');
//       modalBlackout.classList.toggle('showModal');
//       modal.classList.toggle('showModal');
//       }
//     }
//   )}
// });




//toggling between Review Information in Modal
var OEReviewHeading = document.getElementById('on-examination-review');
var chestXRReviewHeading = document.getElementById('chest-xr-review');
var OEReviewContent = document.getElementById('on-examination-review-content');
var chestXRReviewContent = document.getElementById('chest-xr-review-content');
//On Examination
OEReviewHeading.addEventListener('click', function showOEReview() {
  OEReviewHeading.style.backgroundColor = "black";
  chestXRReviewHeading.style.backgroundColor = "gray";
  OEReviewContent.style.display = "flex";
  chestXRReviewContent.style.display = "none";
})

//Chest XR
chestXRReviewHeading.addEventListener('click', function showChestXRReview() {
  chestXRReviewHeading.style.backgroundColor = "black";
  OEReviewHeading.style.backgroundColor = "gray";
  OEReviewContent.style.display = "none";
  chestXRReviewContent.style.display = "flex";
})


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
      }).then((result)=> {
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
      }).then((result)=> {
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
  console.log(localStorage.getItem('prevCurrentPoint'));
})

////////// AT THE END OF A MODULE /////////////
function nextModule() {
  window.location.href="17040-INTERACTION.html";
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
  for (var i = 0; i < caseContent.length; i ++) {
    if ((thisSlide.contains(caseContent[i])) && (true)) {
      document.getElementById('next').setAttribute("onclick", "nextPoint(1);")
    }
  }
}


var currentSlide = 0;
function nextSlide(n) {
  var previousSlide = document.getElementsByClassName('module-slide')[currentSlide];
  previousSlide.style.display = "none";
  currentSlide +=n;
  showSlide(currentSlide);
}

showSlide(currentSlide);

var currentPoint = 0;
function nextPoint(n) {

  var x = document.getElementsByClassName('module-slide')[currentSlide].querySelectorAll('.case-content').length;
  currentPoint+=n;
  blarg ++;

  var thisPoint = document.getElementsByClassName('case-content')[currentPoint];
  //count how many are already visible

  if (currentPoint < x) {
    thisPoint.style.visibility ="visible";
    
    console.log('this is new')
    console.log(currentPoint);
    console.log(blarg);
    console.log(x);
  } else if (localStorage.hasOwnProperty('prevCurrentPoint') == true) {
    console.log('conspicuous');
    currentPoint == (parseInt(localStorage.getItem('prevCurrentPoint')));
    console.log(currentPoint);
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('next').click();
    localStorage.clear();
    currentPoint --;
  } else if (currentPoint == x) {
    for (let i = 0; i < currentPoint; i ++) {
      console.log(i);
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

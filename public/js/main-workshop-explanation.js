//This is for the explanation section of the module

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
      }).then((result)=> {
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
      }).then((result)=> {
        if (result.value) {
          window.location.href = destination;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    })
  }
}

///////////////////////////////// AT THE END OF A MODULE ///////////////////////////
//at the end of the module, automatically forward user to the next section - in this case the module home
function nextModule() {
  window.location.href="index.html";
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
  for (var i = 0; i < caseContent.length; i ++) {
    if ((thisSlide.contains(caseContent[i])) && (true)) {
      //change the next button to show the next point
      document.getElementById('next').setAttribute("onclick", "nextPoint(1);")
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

////////////////////////////////// PROGRESSION THROUGH POINT CONTENT /////////////////////////////

//This both a progression and display function for showing each point in the module
var currentPoint = 0;
function nextPoint(n) {
  //x is the number of elements with the class case-content within the current slide
  var x = document.getElementsByClassName('module-slide')[currentSlide].querySelectorAll('.case-content').length;
  //Add or minus 1 to the current point, depending on previous or next button click
  currentPoint+=n;
  pointIncrement ++;
  var thisPoint = document.getElementsByClassName('case-content')[currentPoint];
  
  //if the current point is less than the number existing in this slide
  if (currentPoint < x) {
    //show it
    thisPoint.style.visibility ="visible";
     //if the points on this slide have already been displayed, add on the number to the current point count so that the it skips to the next slide
  } else if (localStorage.hasOwnProperty('prevCurrentPoint') == true) {
    currentPoint == (parseInt(localStorage.getItem('prevCurrentPoint')));
    document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
    document.getElementById('next').click();
    localStorage.clear();
    currentPoint --;
    //if the current point is the maximum number of points in this slide, clear the class name, move on
  } else if (currentPoint == x) {
    for (let i = 0; i < currentPoint; i ++) {
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

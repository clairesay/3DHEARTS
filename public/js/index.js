//This is for the main menu where users can choose main modules, pre-workshop modules or post-workshop modules.
var indexMenu = document.getElementById('index-menu');
var returnToMenuButton = document.getElementById('returnToMenu');
var returnToMenuButtonImg = document.querySelector('#returnToMenu > img')
var headings = document.querySelector('#menu-title-div>div');
var startModule = document.getElementById('start-module');

//thank you modal button
var modalButton = document.getElementById('thank-you-modal-button')
// displays the main workshop module menu
function mainWorkshop() {
    modalButton.style.display = "flex";
    startModule.style.display = 'none';
    returnToMenuButton.setAttribute('onclick', 'returnToMenu()');
    returnToMenuButtonImg.setAttribute('src', 'images/buttons/menu-heart-grey.svg')
    indexMenu.style.display = 'grid';
    headings.style.visibility = 'visible';
    document.getElementById('case-doctor').style.visibility = "visible";
}

var caseImage = document.querySelector('#start-module img');
var caseName = document.querySelector('#start-module h4')
var caseLink = document.querySelector('#start-module a')
var caseDescription = document.querySelector('span.weak');

function moduleStart(name, upperCaseName) {
    modalButton.style.display = "none";
    startModule.style.display = "flex"
    indexMenu.style.display = 'none';
    document.getElementById('case-doctor').style.visibility = "hidden";
    returnToMenuButton.setAttribute('onclick', 'mainWorkshop()');
    returnToMenuButtonImg.setAttribute('src', 'images/buttons/' + name + '-menu-home.svg')
    caseImage.setAttribute('src', 'images/photos/' + name + '-recrop.png');
    caseImage.setAttribute('alt', upperCaseName)
    headings.style.visibility = 'hidden';
    caseName.innerHTML = upperCaseName;
    caseName.setAttribute('id', name)

    switch (name) {
        case 'ben':
            caseDescription.innerHTML = "a 3-month old boy with difficulty breathing"
            caseLink.setAttribute('href', '17040-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #9b51e0, #bb6bd9)";
            // caseName.style.borderImage = "linear-gradient(to right, #9b51e0, #bb6bd9 )"
            break;
        case 'ayanthi':
            caseDescription.innerHTML = "a 1-month old girl with cyanotic episodes"
            caseLink.setAttribute('href', '19401-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #f2994a, #eb5757 )";
            break;
        case 'amin':
            caseDescription.innerHTML = "a 6-month old boy at the refugee clinic"
            caseLink.setAttribute('href', '16751-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #2f80ed, #56ccf2 )";
            break;
        case 'lucy':
            caseDescription.innerHTML = "a 7-day old unwell neonate"
            caseLink.setAttribute('href', '19863-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #6fcf97, #27ae60 )";
            break;
    }
}

//if the user wants to return to menu
function returnToMenu() {
    indexMenu.style.display = 'grid';
    startModule.style.display = 'none';
    document.getElementById('case-doctor').style.visibility = "visible";
}

/////////////////////////////// thank you modal ///////////////////////////////////
var modal = document.getElementById('thank-you-modal');
var modalBlackout = document.getElementById('modal-blackout');
var modalTicker = false;

function tyModal() {
    //Modal Background
    modalBlackout.classList.toggle('show-modal');
    //Actual Modal
    modal.classList.toggle('show-modal');

    if (modal.classList.contains('show-modal')) {
        modalTicker = true;
    } else {
        modalTicker = false;
    }
}

document.addEventListener('click', function(event) {
  var isClickInside = modal.contains(event.target);
  var isClickButtonInside = modalButton.contains(event.target)
  if ((!isClickInside) && (!isClickButtonInside) && (modalTicker == true)) {
    tyModal();
    modalTicker = false;
  }
});
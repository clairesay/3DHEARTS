//This is for the main menu where users can choose main modules, pre-workshop modules or post-workshop modules.
var indexMenu = document.getElementById('index-menu');
// var heading = document.getElementsByTagName('h1')[0];
var returnToMenuButton = document.getElementById('returnToMenu');

var preWorkshopMenu = document.getElementById('pre-workshop-menu');
var mainWorkshopMenu = document.getElementById('main-workshop-menu');
var postWorkshopMenu = document.getElementById('post-workshop-menu');
var headings = document.querySelector('#menu-title-div>div');
var startModule = document.getElementById('start-module');

// Displays the pre-workshop module menu
function preWorkshop() {
    //returnToMenuButton.className= 'flex';
    // heading.innerHTML = 'Pre-Workshop Module';
    //preWorkshopMenu.className = 'menu grid';
    //indexMenu.style.display = 'none';
}

// displays the main workshop module menu
function mainWorkshop() {
    //returnToMenuButton.className= 'flex';
    startModule.style.display = 'none';
    returnToMenuButton.setAttribute('onclick', 'returnToMenu()');
    // heading.innerHTML = '';
    mainWorkshopMenu.style.display = 'grid';
    indexMenu.style.display = 'none';
    headings.style.visibility = 'visible';
}

function moduleStart(name) {
    startModule.style.display = "flex"
    mainWorkshopMenu.style.display = 'none';
    var caseImage = document.querySelector('#start-module img');
    var caseName = document.querySelector('#start-module h4')
    var caseLink = document.querySelector('#start-module a')
    document.getElementById('case-doctor').style.visibility = "hidden";
    returnToMenuButton.setAttribute('onclick', 'mainWorkshop()');

    headings.style.visibility = 'hidden';
    switch (name) {
        case 'ben':
            caseImage.setAttribute('src', 'images/photos/ben-recrop.png');
            caseImage.setAttribute('alt', 'Ben')
            caseName.innerHTML = "Ben's Story"
            caseName.setAttribute('id', 'ben')
            caseLink.setAttribute('href', '17040-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #9b51e0, #bb6bd9)";
            // caseName.style.borderImage = "linear-gradient(to right, #9b51e0, #bb6bd9 )"
            break;
        case 'ayanthi':
            caseImage.setAttribute('src', 'images/photos/ayanthi-recrop.png');
            caseImage.setAttribute('alt', 'Ayanthi')
            caseName.innerHTML = "Ayanthi's Story"
            caseName.setAttribute('id', 'ayanthi')
            caseLink.setAttribute('href', '19401-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #f2994a, #eb5757 )";
            // caseName.style.borderImage = "linear-gradient(to right, #f2994a, #eb5757 )"
            break;
        case 'amin':
            caseImage.setAttribute('src', 'images/photos/amin-recrop.png');
            caseImage.setAttribute('alt', 'Amin')
            caseName.innerHTML = "Amin's Story"
            caseName.setAttribute('id', 'amin')
            caseLink.setAttribute('href', '16751-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #2f80ed, #56ccf2 )";
            // caseName.style.borderImage = "linear-gradient(to right, #2f80ed, #56ccf2 )"
            break;
        case 'richardson':
            caseImage.setAttribute('src', 'images/photos/richardson-recrop.png');
            caseImage.setAttribute('alt', 'Richardson')
            caseName.innerHTML = "Richardson's Story"
            caseName.setAttribute('id', 'richardson')
            caseLink.setAttribute('href', '19863-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #6fcf97, #27ae60 )";
            // caseName.style.borderImage = "linear-gradient(to right, #6fcf97, #27ae60 )"
            break;
    }
}

// displays the post-workshop module menu
function postWorkshop() {
    //returnToMenuButton.className = 'flex';
    // heading.innerHTML = 'Post-Workshop Module';
    //postWorkshopMenu.className = 'menu grid';
    //indexMenu.style.display = 'none';
}

//if the user wants to return to menu
function returnToMenu() {
    // returnToMenuButton.setAttribute('', '');
    //returnToMenuButton.className = 'none back';
    // heading.innerHTML = '3D Hearts Workshop';
    indexMenu.style.display = 'grid';

    // preWorkshopMenu.className = 'menu none';
    mainWorkshopMenu.style.display = 'none'
    startModule.style.display = 'none';
    // postWorkshopMenu.className = 'menu none';
}
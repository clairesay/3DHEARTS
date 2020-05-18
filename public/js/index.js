//This is for the main menu where users can choose main modules, pre-workshop modules or post-workshop modules.
var indexMenu = document.getElementById('index-menu');
// var heading = document.getElementsByTagName('h1')[0];
var returnToMenuButton = document.getElementById('returnToMenu');

var preWorkshopMenu = document.getElementById('pre-workshop-menu');
var mainWorkshopMenu = document.getElementById('main-workshop-menu');
var postWorkshopMenu = document.getElementById('post-workshop-menu');

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
    // heading.innerHTML = '';
    mainWorkshopMenu.className = 'menu grid';
    indexMenu.style.display = 'none';
}

function moduleStart(name) {
    startModule.className = 'menu grid';
    mainWorkshopMenu.style.display = 'none';
    var caseImage = document.querySelector('#start-module img');
    var caseName = document.querySelector('#start-module h4')
    var caseLink = document.querySelector('#start-module a')
    switch (name) {
        case 'ben':
            caseImage.setAttribute('src', 'images/photos/ben-crop.svg');
            caseImage.setAttribute('alt', 'Ben')
            caseName.innerHTML = "Ben's Story"
            caseName.setAttribute('id', 'ben')
            caseLink.setAttribute('href', '17040-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #9b51e0, #bb6bd9)";
            // caseName.style.borderImage = "linear-gradient(to right, #9b51e0, #bb6bd9 )"
            break;
        case 'ayanthi':
            caseImage.setAttribute('src', 'images/photos/ayanthi-crop.svg');
            caseImage.setAttribute('alt', 'Ayanthi')
            caseName.innerHTML = "Ayanthi's Story"
            caseName.setAttribute('id', 'ayanthi')
            caseLink.setAttribute('href', '19401-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #f2994a, #eb5757 )";
            // caseName.style.borderImage = "linear-gradient(to right, #f2994a, #eb5757 )"
            break;
        case 'amin':
            caseImage.setAttribute('src', 'images/photos/amin-crop.svg');
            caseImage.setAttribute('alt', 'Amin')
            caseName.innerHTML = "Amin's Story"
            caseName.setAttribute('id', 'amin')
            caseLink.setAttribute('href', '16751-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #2f80ed, #56ccf2 )";
            // caseName.style.borderImage = "linear-gradient(to right, #2f80ed, #56ccf2 )"
            break;
        case 'richardson':
            caseImage.setAttribute('src', 'images/photos/richardson-crop.svg');
            caseImage.setAttribute('alt', 'Richardson')
            caseName.innerHTML = "Richardson's Story"
            caseName.setAttribute('id', 'richardson')
            caseLink.setAttribute('href', '17863-oe.html');
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
    //returnToMenuButton.className = 'none back';
    // heading.innerHTML = '3D Hearts Workshop';
    // indexMenu.style.display = 'grid';
    // preWorkshopMenu.className = 'menu none';
    // mainWorkshopMenu.className = 'menu none';
    // postWorkshopMenu.className = 'menu none';
}
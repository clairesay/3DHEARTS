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
    var caseName = document.querySelector('#start-module h1')
    var caseLink = document.querySelector('#start-module a')
    switch (name) {
        case 'ben':
            caseImage.setAttribute('src', '../public/images/photos/Ben.jpg');
            caseImage.setAttribute('alt', 'Ben')
            caseName.innerHTML = "Ben's Story"
            caseLink.setAttribute('href', '17040-oe.html');
            break;
        case 'ayanthi':
            caseImage.setAttribute('src', '../public/images/photos/Ayanthi.jpg');
            caseImage.setAttribute('alt', 'Ayanthi')
            caseName.innerHTML = "Ayanthi's Story"
            caseLink.setAttribute('href', '19401-oe.html');
            break;
        case 'amin':
            caseImage.setAttribute('src', '../public/images/photos/Amin.jpg');
            caseImage.setAttribute('alt', 'Amin')
            caseName.innerHTML = "Amin's Story"
            caseLink.setAttribute('href', '16751-oe.html');
            break;
        case 'richardson':
            caseImage.setAttribute('src', '../public/images/photos/Richardson.jpg');
            caseImage.setAttribute('alt', 'Richardson')
            caseName.innerHTML = "Richardson's Story"
            caseLink.setAttribute('href', '17863-oe.html');
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
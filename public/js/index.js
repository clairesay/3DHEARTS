//This is for the main menu where users can choose main modules, pre-workshop modules or post-workshop modules.
var indexMenu = document.getElementById('index-menu');
var returnToMenuButton = document.getElementById('returnToMenu');
var headings = document.querySelector('#menu-title-div>div');
var startModule = document.getElementById('start-module');
// displays the main workshop module menu
function mainWorkshop() {
    startModule.style.display = 'none';
    returnToMenuButton.setAttribute('onclick', 'returnToMenu()');
    indexMenu.style.display = 'grid';
    headings.style.visibility = 'visible';
    document.getElementById('case-doctor').style.visibility = "visible";
}

function moduleStart(name) {
    startModule.style.display = "flex"
    indexMenu.style.display = 'none';
    var caseImage = document.querySelector('#start-module img');
    var caseName = document.querySelector('#start-module h4')
    var caseLink = document.querySelector('#start-module a')
    var caseDescription = document.querySelector('span.weak');
    document.getElementById('case-doctor').style.visibility = "hidden";
    returnToMenuButton.setAttribute('onclick', 'mainWorkshop()');
    
    headings.style.visibility = 'hidden';
    switch (name) {
        case 'ben':
            caseImage.setAttribute('src', 'images/photos/ben-recrop.png');
            caseImage.setAttribute('alt', 'Ben')
            caseName.innerHTML = "Ben"
            caseDescription.innerHTML = "a 3-month old boy with difficulty breathing"
            caseName.setAttribute('id', 'ben')
            caseLink.setAttribute('href', '17040-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #9b51e0, #bb6bd9)";
            // caseName.style.borderImage = "linear-gradient(to right, #9b51e0, #bb6bd9 )"
            break;
        case 'ayanthi':
            caseImage.setAttribute('src', 'images/photos/ayanthi-recrop.png');
            caseImage.setAttribute('alt', 'Ayanthi')
            caseName.innerHTML = "Ayanthi"
            caseDescription.innerHTML = "a 1-month old girl with cyanotic episodes"
            caseName.setAttribute('id', 'ayanthi')
            caseLink.setAttribute('href', '19401-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #f2994a, #eb5757 )";
            // caseName.style.borderImage = "linear-gradient(to right, #f2994a, #eb5757 )"
            break;
        case 'amin':
            caseImage.setAttribute('src', 'images/photos/amin-recrop.png');
            caseImage.setAttribute('alt', 'Amin')
            caseName.innerHTML = "Amin"
            caseDescription.innerHTML = "a 6-month old boy at the refugee clinic"
            caseName.setAttribute('id', 'amin')
            caseLink.setAttribute('href', '16751-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #2f80ed, #56ccf2 )";
            // caseName.style.borderImage = "linear-gradient(to right, #2f80ed, #56ccf2 )"
            break;
        case 'richardson':
            caseImage.setAttribute('src', 'images/photos/richardson-recrop.png');
            caseImage.setAttribute('alt', 'Richardson')
            caseName.innerHTML = "Lucy"
            caseDescription.innerHTML = "a 7-day old unwell neonate"
            caseName.setAttribute('id', 'richardson')
            caseLink.setAttribute('href', '19863-oe.html');
            caseLink.style.backgroundImage = "linear-gradient(to right, #6fcf97, #27ae60 )";
            // caseName.style.borderImage = "linear-gradient(to right, #6fcf97, #27ae60 )"
            break;
    }
}

//if the user wants to return to menu
function returnToMenu() {
    indexMenu.style.display = 'grid';
    startModule.style.display = 'none';
    document.getElementById('case-doctor').style.visibility = "visible";
}
var indexMenu = document.getElementById('index-menu');
var heading = document.getElementsByTagName('h1')[0];
var returnToMenuButton = document.getElementById('returnToMenu');

var preWorkshopMenu = document.getElementById('pre-workshop-menu');
var mainWorkshopMenu = document.getElementById('main-workshop-menu');
var postWorkshopMenu = document.getElementById('post-workshop-menu');

function preWorkshop() {
    returnToMenuButton.className= 'flex';
    heading.innerHTML = 'Pre-Workshop Module';
    preWorkshopMenu.className = 'menu grid';
    // indexMenu.parentNode.replaceChild(preWorkshopMenu, indexMenu);
    indexMenu.style.display = 'none';
}

function mainWorkshop() {
    returnToMenuButton.className= 'flex';
    heading.innerHTML = 'Main Workshop Module';
    mainWorkshopMenu.className = 'menu grid';
    // indexMenu.parentNode.replaceChild(mainWorkshopMenu, indexMenu);
    indexMenu.style.display = 'none';
}

function postWorkshop() {
    returnToMenuButton.className = 'flex';
    heading.innerHTML = 'Post-Workshop Module';
    postWorkshopMenu.className = 'menu grid';
    // indexMenu.parentNode.replaceChild(postWorkshopMenu, indexMenu);
    indexMenu.style.display = 'none';
}

function returnToMenu() {
    returnToMenuButton.className = 'none back';
    heading.innerHTML = '3D Hearts Workshop';
    indexMenu.style.display = 'grid';
    preWorkshopMenu.className = 'menu none';
    mainWorkshopMenu.className = 'menu none';
    postWorkshopMenu.className = 'menu none';
}
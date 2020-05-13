//This is for the main menu where users can choose main modules, pre-workshop modules or post-workshop modules.
var indexMenu = document.getElementById('index-menu');
var heading = document.getElementsByTagName('h1')[0];
var returnToMenuButton = document.getElementById('returnToMenu');

var preWorkshopMenu = document.getElementById('pre-workshop-menu');
var mainWorkshopMenu = document.getElementById('main-workshop-menu');
var postWorkshopMenu = document.getElementById('post-workshop-menu');

// Displays the pre-workshop module menu
function preWorkshop() {
    returnToMenuButton.className= 'flex';
    heading.innerHTML = 'Pre-Workshop Module';
    preWorkshopMenu.className = 'menu grid';
    indexMenu.style.display = 'none';
}

// displays the main workshop module menu
function mainWorkshop() {
    returnToMenuButton.className= 'flex';
    heading.innerHTML = 'Main Workshop Module';
    mainWorkshopMenu.className = 'menu grid';
    indexMenu.style.display = 'none';
}

// displays the post-workshop module menu
function postWorkshop() {
    returnToMenuButton.className = 'flex';
    heading.innerHTML = 'Post-Workshop Module';
    postWorkshopMenu.className = 'menu grid';
    indexMenu.style.display = 'none';
}

//if the user wants to return to menu
function returnToMenu() {
    returnToMenuButton.className = 'none back';
    heading.innerHTML = '3D Hearts Workshop';
    indexMenu.style.display = 'grid';
    preWorkshopMenu.className = 'menu none';
    mainWorkshopMenu.className = 'menu none';
    postWorkshopMenu.className = 'menu none';
}
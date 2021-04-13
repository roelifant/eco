// global vars that are used by the game.
// setup of larger globals are moved to seperate files in /content

//this is the Game variable. It's the name of the game.
let Game;

//speed of the game
let globalSpeed =  80;

//width of game world
let maxX = world.offsetWidth;

//height of game world
let maxY = world.offsetHeight;

//is the game paused?
let globalStop = false;

//gene object
let AllGenes = {};

//population array
let pop = [];
//plant population array
let plantpop = [];

//adaptations object
let adaptations = [];

//current player options for adaptations
let adaptOptions = [];

//is killing disabled?
let truce = false;

//player's evolution points
let evolutionPoints = 5;

//what level is the player
let playerLevel = 1;
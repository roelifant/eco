// global vars that are used by the game.
// setup of larger globals are moved to seperate files in /content

//this is the Game variable. It's the name of the realtime game engine that can be started, stopped and altered.
let Game;

//this is the Player variable. Represents the user that uses the browser and everything they own, have achieved and can do
let Player;

//width of game world
let maxX = world.offsetWidth;

//height of game world
let maxY = world.offsetHeight;

//gene object
let AllGenes = {};

//population array
let pop = [];
//plant population array
let plantpop = [];

let enemies;
let speciesColors;
let activeSpecies = [];

//adaptations object
let adaptations = [];

//is killing disabled?
let truce = false;
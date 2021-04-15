//first load all JS

//globals
//=include game/var/elements.js
//=include game/var/globals.js

//classes
//=include class/**/*.js

//content
//=include content/**/*.js

//game logic
//=include game/logic/functions.js
//=include game/logic/interaction.js
//=include game/logic/realtime.js

//main loop
//=include main.js


//Then start the game up
for(let i = 0; i < 150; i++){
    seed(3+Math.floor(Math.random()*5));
}
Player = new player();
renderAdaptations();
updatePointsEl();
Game.start();
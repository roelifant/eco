# ECO

Just a silly js game experiment by Roel & Caroline


## Setup

    $ npm install
    $ npm install --global gulp-cli
    $ gulp


## development cycle

1) use the __gulp watch__ command
2) make changes to the javascript and sass files in ./src/
2) save your files, whereupon gulp will automaticly compile your changes
3) open index.html in your browser to run the project

### Other options:

    $ gulp watch:dev

This will build the files without compression, making it easier to debug in the browser dev tools


## Structure

The overall project structure looks like this:

    | src
        | js
            | class
            | content
            | game
                | logic
                | var
            main.js
            startup.js
        | sass
            | components
            | var
            index.scss
    index.html

### js

- __/class__ => game objects
- __/content__ => the content of big globals that may be edited or added to, like levels, items, upgrades,...
- __/game/logic__ => game mechanics; global functions that can be used anywhere. this also contains DOM eventlisteners and the realtime logic
- __/game/var__ => this includes all global variables
- __main.js__ => this file holds the main execution of the game, such as what happens in a single game loop
- __startup.js__ => is used to load in all other .js files and then start the game.

### sass

- __/components__ => big pieces of css
- __/var__ => reusable sass variables
- __index.scss__ => used to load in all other .scss files.
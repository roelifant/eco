# ECO

Just a silly js game experiment by Roel & Caroline


## Setup

    $ npm install
    $ npm install --global gulp-cli
    $ gulp


## development cycle

1) use the "gulp watch" command
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

- /class => game objects
- /content => the content of big globals that may be edited or added to, like levels, items, upgrades,...
- /game/logic => game mechanics; global functions that can be used anywhere. this also contains DOM eventlisteners and the realtime logic
- /game/var => this includes all global variables
- main.js => this file holds the main execution of the game, such as what happens in a single game loop
- startup.js => is used to load in all other .js files and then start the game.

### sass

- /components -> big pieces of css
- /var -> reusable sass variables

index.scss is used to load in all other .scss files.
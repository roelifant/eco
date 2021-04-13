//event listeners that handle player actions

DOM.ui.pause.addEventListener("click", ()=>{
    if(Game.stopped){
        DOM.ui.pause.innerText = "pause"
        Game.start();
    } else {
        DOM.ui.pause.innerText = "unpause"
        Game.stop();

        console.log(ticks);
        console.log(pop);
        console.log(plantpop);
    }
});
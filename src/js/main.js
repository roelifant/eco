Game = new RT(100,(tick)=>{
    //this happens every tick
    if(plantpop.length < 250 && Math.random()<0.9){
        seed();
    }
    for(let i = 0; i< pop.length; i++){
        pop[i].action();
    }

    //clean up deaths
    for(let i = pop.length-1; i > -1 ; i--){
        if(pop[i].state == "dead"){
            let blip = pop[i];
            pop.splice(pop.indexOf(blip), 1);
            blip.element.remove();
        }
    }

    //grow the oldest plants
    for(let i = 0; i < 75; i++){
        if(plantpop.length > i){
            if(plantpop.food < 25){
                if(plantpop[i].food>10){
                    if(Math.random()<0.005){
                        plantpop[i].food++;
                        plantpop[i].render();
                    }
                } else if(plantpop[i].food>5){
                    if(Math.random()<0.01){
                        plantpop[i].food++;
                        plantpop[i].render();
                    }
                } else if(Math.random()<0.02){
                    plantpop[i].food++;
                    plantpop[i].render();
                }
            }
        }
    }

    //clean up dead plants
    for(let i = plantpop.length-1; i > -1 ; i--){
        if(plantpop[i].eaten == true){
            let plant = plantpop[i];
            plantpop.splice(plantpop.indexOf(plant), 1);
            plant.element.remove();
        }
    }

    checkExtinctions();
    //spawn a new species!
    spawnNewSpecies(tick);
});

function spawnNewSpecies(time){
    // species 1
    if(time % 600 == 0){
        console.log("spawning");
        spawnEnemy();
    }
}

function checkExtinctions(){
    activeSpecies.forEach((s)=>{
        //is it still alive
        let found = false;
        for(let i = 0; i < pop.length; i++){
            let blip = pop[i];
            if(blip.species == s){
                found = true;
                break;
            }
        }
        //handle extinction
        if(!found){
            if(s == "player"){
                alert("You lost the game!");
            } else {
                activeSpecies.splice(activeSpecies.indexOf(s), 1);
                speciesColors.push(s);
                delete AllGenes[s];
                messager("The "+s+" species has gone extinct!");
            }
        }
    });
}
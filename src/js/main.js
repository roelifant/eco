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

    //spawn a new species!
    spawnNewSpecies(tick);
});

function spawnNewSpecies(time){
    // species 1
    if(time == 500){
        messager("A new species will emerge soon...");
    }
    if(time == 650){
        pop.push(new Blip("bot1", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot1", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot1", Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }
    if(time == 700){
        truce = false;
    }

    //species 2
    if(time == 1500){
        messager("A new species will emerge soon...");
    }
    if(time == 1650){
        pop.push(new Blip("bot3", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot3", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot3", Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }

    //species 3
    if(time == 2200){
        messager("A new species will emerge soon...");
    }
    if(time == 2350){
        pop.push(new Blip("bot5", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot5", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot5", Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }

    //species 4
    if(time == 3000){
        messager("A new species will emerge soon...");
    }
    if(time == 3150){
        pop.push(new Blip("bot2", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot2", Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }

    //species 5
    if(time == 4000){
        messager("A new species will emerge soon...");
    }
    if(time == 4150){
        pop.push(new Blip("bot4", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot4", Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot4", Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }
}
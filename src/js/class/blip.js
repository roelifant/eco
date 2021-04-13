class Blip {
    constructor(species, DNA, x, y){
        this.species = species;
        this.x = x;
        this.y = y;
        this.size = DNA.size;
        this.element = this.buildElement(this.size);
        this.direction = Math.random()*360;
        this.speed = DNA.speed;
        this.intelligence = DNA.intelligence;
        this.state = "wander";

        this.hunger = Math.floor(DNA.hunger*0.66);
        this.maxHunger = DNA.hunger;

        this.sight = DNA.sight;

        this.energy = DNA.energy;
        this.maxEnergy = DNA.energy;

        this.rest = DNA.rest;
        this.maxRest = DNA.rest;
        this.life = DNA.life;

        this.breeding = 0;
        this.maxBreeding = DNA.breeding;

        this.gestation = DNA.gestation;
        this.maxGestation = DNA.gestation;

        this.offspring = DNA.offspring;

        this.digestion = DNA.digestion;

        this.hp = DNA.hp;
        this.defence = DNA.defence;
        this.attack = DNA.attack;

        this.foodchain = DNA.foodchain;
        this.food = this.hp + this.size + 2;
    }

    buildElement(size){
        let el = document.createElement("div");
        el.classList.add("blip");
        el.classList.add(this.species);
        el.style.left = this.x+"px";
        el.style.top = this.y+"px";
        el.style.width = size+"px";
        el.style.height = size+"px";
        DOM.world.appendChild(el);
        return el;
    }

    render(){
        this.element.style.left = this.x - (this.size/2)+"px";
        this.element.style.top = this.y - (this.size/2)+"px";
    }

    adjustDir(){
        let change = (Math.random()*20) - 10;
        this.direction = this.direction + change;
    }

    action(){
        if(this.hunger < 0){
            //console.log("a blip has starved");
            this.state = "dead";
            return;
        }
        if(this.life < 0){
            /*if(this.species == "player"){
                messager("A blip died of old age", "playerInfo");
            }*/
            this.state = "dead";
            return;
        }

        if(this.breeding > this.maxBreeding){
            //it's preggers

            this.gestation--;
            if(this.gestation < 0){

                //player gets one evolution point
                if(this.species == "player"){
                    evolutionPoints++;
                    updatePointsEl();
                }

                this.breeding = 0;
                this.gestation = this.maxGestation;

                //console.log("A new "+this.species+" blip is born!");
                for(let i = 0; i < this.offspring; i++){
                    pop.push(new Blip(this.species, AllGenes[this.species], this.x,this.y));
                }
            }
        }

        if(this.look(this.size+this.speed).length>0){
            let food = this.look(this.size+this.speed)[0];
            if(food.species != null){
                // eat/fight a blip
                let hit = food.defence - this.attack;
                if(hit <=0){
                    hit = 1;
                }
                food.hp -= hit;
                if(food.hp <= 0){
                    if(this.species != "player" && food.species == "player"){
                        messager(this.species+" is hunting your blips!", this.species);
                    }
                    console.log("a blip was eaten!");
                    // eat
                    food.state = "dead";

                    this.hunger += Math.ceil(food.food * Math.floor(this.digestion*1.5));
                    this.breeding += Math.ceil(food.food * 20);
                    if(this.hunger > this.maxHunger){ this.hunger = this.maxHunger}

                } else {
                    //predator gets attacked back
                    let hit = this.defence - food.attack;
                    if(hit <=0){
                        hit = 1;
                    }
                    this.hp -= hit;
                    if(this.hp <= 0){
                        console.log("a blip was killed!");
                        this.state = "dead";
                        return;
                    } else {
                        //run away
                        this.state == "wander";
                    }
                }

            } else {
                //eat a plant
                if(!food.eaten){
                    this.hunger += Math.ceil(food.food * this.digestion);
                    this.breeding += Math.ceil(food.food * 15);
                    this.energy += Math.ceil(food.food*5);
                    if(this.hunger > this.maxHunger){ this.hunger = this.maxHunger}
                    food.eaten = true;
                }
                plantpop.pop(food);
                food.element.remove();
            }
            
            this.state = "wander";
        }

        if(Math.random()<0.9){
            this.life--;
        }

        if(this.state !="resting"){
            if(Math.random()<0.9){
                this.hunger--;
            }
        } else {
            if(Math.random()<0.6){
                this.hunger--;
            }
        }
        if(Math.random()<0.7){
            this.energy--;
        }

        if(this.energy < 0){
            this.state = "rest";
        }else if(Math.random()*10 < this.intelligence ){
            this.think();
        }

        if(this.state == "rest"){
            this.rest--;
            if(this.rest < 0){
                this.rest = this.maxRest;
                this.energy = this.maxEnergy;
                this.think();
            }
        }

        let x = 0;
        let y = 0;

        if(this.state == "search"){
            let targets = this.look(this.sight);
            if(targets.length >= 1){
                let preffered = targets[0];
                targets.forEach((t)=>{
                    if(t.species != null){
                        if(t.food*2 > preffered.food){
                            preffered = t;
                        }
                    } else {
                        if(t.food > preffered.food){
                            preffered = t;
                        }
                    }
                });

                //go there
                let dx = preffered.x - this.x;
                let dy = preffered.y - this.y;
                let angle = Math.atan(dy, dx);
                x = this.speed * Math.cos(angle);
                y = this.speed * Math.sin(angle);
            } else {
                this.state = "wander";
            }
        }

        if(this.state == "wander"){
            let coor = this.wander();
            x = coor[0];
            y = coor[1];
        }

        this.reposition(x, y);
        this.render();
    }

    reposition(x, y){
        let wrapped = wrapCoor(this.x + x, this.y + y);
        this.x = wrapped[0];
        this.y = wrapped[1];
    }

    wander(){
        if(Math.random() <0.05){
            this.adjustDir();
        }
        let angle = 90 - this.direction;
        let x = this.speed * Math.cos(angle);
        let y = this.speed * Math.sin(angle);
        return [x, y];
    }

    //returns list of nearby things
    look(sight){
        let seen = [];
        for(let i = 0; i < plantpop.length; i++){
            if(distanceBetween(plantpop[i], this) < sight){
                //now looking at object
                seen.push(plantpop[i]);
            }
        }
        if(!truce){
            for(let i = 0; i < pop.length; i++){
                if(distanceBetween(pop[i], this) < sight){
                    //now looking at object
                    if(pop[i].species != this.species && pop[i].foodchain <= this.foodchain){
                        seen.push(pop[i]);
                    }
                }
            }
        }
        return seen;
    }

    think(){
        if(this.hunger < Math.ceil(this.maxHunger*0.66)){
            this.state = "search";
        } else {
            this.state = "wander";
        }
    }
}
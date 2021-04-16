class Blip {
    constructor(species, x, y){
        this.DNA = AllGenes[species];

        this.species = species;
        this.x = x;
        this.y = y;
        this.size = this.DNA.size;
        this.element = this.buildElement(this.size);
        this.direction = Math.random()*360;
        this.speed = this.DNA.speed;
        this.intelligence = this.DNA.intelligence;
        this.state = "wander";

        this.hunger = Math.floor(this.DNA.hunger*0.66);
        this.maxHunger = this.DNA.hunger;

        this.sight = this.DNA.sight;

        this.energy = this.DNA.energy;
        this.maxEnergy = this.DNA.energy;

        this.rest = this.DNA.rest;
        this.maxRest = this.DNA.rest;
        this.life = this.DNA.life;

        this.breeding = 0;
        this.maxBreeding = this.DNA.breeding;

        this.gestation = this.DNA.gestation;
        this.maxGestation = this.DNA.gestation;

        this.offspring = this.DNA.offspring;

        this.digestion = this.DNA.digestion;

        this.hp = this.DNA.hp;
        this.defence = this.DNA.defence;
        this.attack = this.DNA.attack;

        this.foodchain = this.DNA.foodchain;
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
            if(this.species == "player"){
                Player.stats["deaths"]++;
                Player.stats["starved"]++;
            }
            this.state = "dead";
            return;
        }
        if(this.life < 0){
            if(this.species == "player"){
                Player.stats["deaths"]++;
                Player.stats["old_age"]++;
            }
            this.state = "dead";
            return;
        }

        if(this.breeding > this.maxBreeding){
            //it's preggers

            this.gestation--;
            if(this.gestation < 0){

                //player gets one evolution point
                if(this.species == "player"){
                    Player.evolutionPoints++;
                    updatePointsEl();
                    Player.stats["bred"]++;
                }

                this.breeding = 0;
                this.gestation = this.maxGestation;

                this.breed();
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
                    // eat
                    food.state = "dead";
                    let addition = Math.ceil(food.food * Math.floor(this.digestion*1.5));
                    this.hunger += addition
                    this.breeding += Math.ceil(food.food * 20);
                    if(this.hunger > this.maxHunger){this.hunger = this.maxHunger;}
                    if(this.species != "player" && food.species == "player"){
                        messager(this.species+" is hunting your blips!", this.species);
                        Player.stats["eaten"]++;
                        Player.stats["deaths"]++;
                    }
                    if(this.species == "player"){
                        Player.stats["hunted"]++;
                        Player.stats["food"]+=food.food;
                    }

                } else {
                    //predator gets attacked back
                    let hit = this.defence - food.attack;
                    if(hit <=0){
                        hit = 1;
                    }
                    this.hp -= hit;
                    if(this.hp <= 0){
                        console.log("a blip was killed!");
                        if(this.species == "player"){
                            Player.stats["killed"]++;
                            Player.stats["deaths"]++;
                        }
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
                    let addition = Math.ceil(food.food * this.digestion);
                    this.hunger += addition;
                    this.breeding += Math.ceil(food.food * 15);
                    this.energy += Math.ceil(food.food*5);
                    if(this.hunger > this.maxHunger){ this.hunger = this.maxHunger}
                    food.eaten = true;

                    if(this.species == "player"){
                        Player.stats["food"]+=food.food;
                        Player.stats["digested"]+=addition;
                    }
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

    breed(){
        for(let i = 0; i < this.offspring; i++){
            pop.push(new Blip(this.species,this.x,this.y));
            Player.stats["offspring"]++;
        }
    }

    evolve(){
        this.DNA = AllGenes[this.species];
        this.size = this.DNA.size;

        this.element.style.left = this.x - (this.size/2)+"px";
        this.element.style.top = this.y - (this.size/2)+"px";
        this.element.style.width = this.size+"px";
        this.element.style.height = this.size+"px";

        this.direction = Math.random()*360;
        this.speed = this.DNA.speed;
        this.intelligence = this.DNA.intelligence;
        this.maxHunger = this.DNA.hunger;

        this.sight = this.DNA.sight;
        this.maxEnergy = this.DNA.energy;

        this.rest = this.DNA.rest;
        this.maxRest = this.DNA.rest;
        this.life = this.DNA.life;

        this.maxBreeding = this.DNA.breeding;
        this.maxGestation = this.DNA.gestation;

        this.offspring = this.DNA.offspring;
        this.digestion = this.DNA.digestion;

        this.hp = this.DNA.hp;
        this.defence = this.DNA.defence;
        this.attack = this.DNA.attack;

        this.foodchain = this.DNA.foodchain;
        this.food = this.hp + this.size + 2;

        console.log(this);
    }
}
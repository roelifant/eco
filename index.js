const world = document.getElementById("world");
const adaptationsEl = document.getElementById("adaptations");
const pointsEl = document.getElementById("points");
const messageContainer = document.getElementById("message-container");
const message = document.getElementById("message");
let pauseBtn = document.getElementById("pause");
let globalSpeed =  80;
let maxX = world.offsetWidth;
let maxY = world.offsetHeight;
let globalStop = false;

//create an array of blips
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
        world.appendChild(el);
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

AllGenes = {
    "player": {
        "rest": 15, //how long must they rest to regain energy
        "hunger": 200, //how long untill they die without food
        "sight":80, //how far can they see?
        "speed": 4, //how fast do they move?
        "size": 8, //how big do they look?
        "hp": 1, //how much hits can they take before they die?
        "defence": 0, //how much enemy attacks can they negate?
        "attack": 1, //how much attack power do they have?
        "gestation": 100, //time from having enough exp to actually breeding
        "breeding": 120, //how much exp do they need to breed
        "offspring": 1, //how much offspring does one member have?
        "intelligence": 7, //how likely is it to reflect on its situation
        "energy": 35, //how much energy does it have before it runs out
        "life": 500, //life expectancy
        "digestion":20, //how much does it gain from food
        "foodchain": 2
    },
    "bot1": {
        "rest": 15,
        "hunger": 200,
        "sight":100,
        "speed": 4,
        "size": 7, 
        "hp": 1,
        "defence": 0, 
        "attack": 1, 
        "gestation": 70, 
        "breeding": 120, 
        "offspring": 1,
        "intelligence": 8, 
        "energy": 40,
        "life": 500,
        "digestion":20,
        "foodchain": 2
    },
    "bot2": {
        "rest": 30,
        "hunger": 150,
        "sight":70,
        "speed": 7,
        "size": 6, 
        "hp": 1,
        "defence": 0, 
        "attack": 1, 
        "gestation": 20, 
        "breeding": 80, 
        "offspring": 1,
        "intelligence": 6, 
        "energy": 60,
        "life": 350,
        "digestion":15,
        "foodchain": 1
    },
    "bot3": {
        "rest": 30,
        "hunger": 400,
        "sight":150,
        "speed": 2,
        "size": 10, 
        "hp": 3,
        "defence": 2, 
        "attack": 2, 
        "gestation": 120, 
        "breeding": 180, 
        "offspring": 3,
        "intelligence": 6, 
        "energy": 100,
        "life": 2000,
        "digestion":30,
        "foodchain": 4
    },
    "bot4": {
        "rest": 30,
        "hunger": 200,
        "sight":300,
        "speed": 6,
        "size": 10, 
        "hp": 2,
        "defence": 2, 
        "attack": 4, 
        "gestation": 80, 
        "breeding": 120, 
        "offspring": 1,
        "intelligence": 8, 
        "energy": 200,
        "life": 2000,
        "digestion":20,
        "foodchain": 5
    },
    "bot5": {
        "rest": 20,
        "hunger": 300,
        "sight":100,
        "speed": 4,
        "size": 7, 
        "hp": 2,
        "defence": 1, 
        "attack": 1, 
        "gestation": 150, 
        "breeding": 100, 
        "offspring": 2,
        "intelligence": 7, 
        "energy": 40,
        "life": 800,
        "digestion":25,
        "foodchain": 2
    }
}
let pop = [
    new Blip("player", AllGenes["player"], Math.floor(maxX/2), Math.floor(maxY/2)),
    new Blip("player", AllGenes["player"], Math.floor(maxX/2), Math.floor(maxY/2)),
    new Blip("player", AllGenes["player"], Math.floor(maxX/2), Math.floor(maxY/2))
];
let adaptations = [

    {
        "name": "vision 1",
        "description": "develop light sensitive sensors",
        "category": "nerves",
        "level": 1,
        "cost": 2,
        "adapt":{
            "sight": 20
        },
        "dump":1
    },
    {
        "name": "predation 1",
        "description": "become better at hunting",
        "category": "behavior",
        "level": 3,
        "cost": 3,
        "adapt":{
            "sight": 10,
            "foodchain":2,
            "attack":2
        },
        "dump":1
    },
    {
        "name": "predation 2",
        "description": "become better at hunting",
        "category": "behavior",
        "level": 5,
        "cost": 5,
        "adapt":{
            "sight": 20,
            "foodchain":2,
            "attack":2
        },
        "dump":1
    },
    {
        "name": "spikes 1",
        "description": "grow spikes useful for both defence and predation",
        "category": "defence",
        "level": 1,
        "cost": 3,
        "adapt":{
            "speed": -1,
            "foodchain":1,
            "attack":1,
            "defence":1
        },
        "dump":1
    },
    {
        "name": "soft shell 1",
        "description": "be more protected from attacks",
        "category": "defence",
        "level": 1,
        "cost": 3,
        "adapt":{
            "speed": -1,
            "defence":2,
            "hp":1
        },
        "dump":1
    },
    {
        "name": "speed 1",
        "description": "become faster",
        "category": "speed",
        "level": 1,
        "cost": 2,
        "adapt":{
            "speed": 1,
            "rest":10,
            "energy":-10
        },
        "dump":1
    },
    {
        "name": "speed 2",
        "description": "move faster",
        "category": "speed",
        "level": 5,
        "cost": 5,
        "adapt":{
            "speed": 2,
            "rest":15,
            "energy":-15
        },
        "dump":3
    },
    {
        "name": "speed 3",
        "description": "move faster",
        "category": "speed",
        "level": 10,
        "cost": 10,
        "adapt":{
            "speed": 3,
            "rest":20,
            "energy":-20,
            "hp":-1,
            "size":-1
        },
        "dump":3
    },
    {
        "name": "speed 4",
        "description": "move faster",
        "category": "speed",
        "level": 15,
        "cost": 15,
        "adapt":{
            "speed": 3,
            "rest":30,
            "size":-1
        },
        "dump":3
    },
    {
        "name": "health 1",
        "description": "become stronger",
        "category": "health",
        "level": 1,
        "cost": 3,
        "adapt":{
            "energy":10,
            "hp":1
        },
        "dump":1
    },
    {
        "name": "health 2",
        "description": "become stronger",
        "category": "health",
        "level": 5,
        "cost": 5,
        "adapt":{
            "energy":15,
            "hunger":5,
            "life":20,
            "hp":1
        },
        "dump":2
    },
    {
        "name": "health 3",
        "description": "become stronger",
        "category": "health",
        "level": 10,
        "cost": 10,
        "adapt":{
            "energy":20,
            "hunger":10,
            "life":50,
            "hp":2
        },
        "dump":3
    },
    {
        "name": "digestion 1",
        "description": "get more out of food",
        "category": "food",
        "level": 1,
        "cost": 3,
        "adapt":{
            "digestion": 3,
            "hunger": 10,
            "rest":15,
            "energy":-15
        },
        "dump":1
    },
    {
        "name": "digestion 2",
        "description": "get more out of food",
        "category": "food",
        "level": 5,
        "cost": 5,
        "adapt":{
            "digestion": 5,
            "hunger": 10,
            "rest":15,
            "energy":-15
        },
        "dump":2
    },
    {
        "name": "digestion 3",
        "description": "get more out of food",
        "category": "food",
        "level": 10,
        "cost": 10,
        "adapt":{
            "digestion": 10,
            "hunger": 10,
            "rest":15,
            "energy":-15
        },
        "dump":2
    },
    {
        "name": "endurance 1",
        "description": "become less tired",
        "category": "speed",
        "level": 1,
        "cost": 3,
        "adapt":{
            "rest":20,
            "energy":30,
            "hunger": 5
        },
        "dump":1
    },
    {
        "name": "endurance 2",
        "description": "become less tired",
        "category": "speed",
        "level": 5,
        "cost": 5,
        "adapt":{
            "rest":30,
            "energy":50,
            "hunger": 10
        },
        "dump":2
    },
    {
        "name": "endurance 3",
        "description": "become less tired",
        "category": "speed",
        "level": 10,
        "cost": 8,
        "adapt":{
            "rest":20,
            "energy":70,
            "hunger": 15
        },
        "dump":3
    },
    {
        "name": "endurance 4",
        "description": "become less tired",
        "category": "speed",
        "level": 15,
        "cost": 15,
        "adapt":{
            "rest":10,
            "energy":100,
            "hunger": 15
        },
        "dump":4
    },
    {
        "name": "vision 2",
        "description": "see over greater distances",
        "category": "nerves",
        "level": 2,
        "cost": 5,
        "adapt":{
            "sight": 30
        },
        "dump":1
    },
    {
        "name": "nervous system 1",
        "description": "develop nerves",
        "category": "nerves",
        "level": 5,
        "cost": 10,
        "need":{
            "nerves": 1
        },
        "adapt":{
            "sight": 30,
            "intelligence": 1
        },
        "dump":3
    },
    {
        "name": "breeding 1",
        "description": "breed faster",
        "category": "breeding",
        "level": 2,
        "cost": 5,
        "adapt":{
            "breeding": -20,
            "gestation": -10
        },
        "dump":2
    },
    {
        "name": "breeding 2",
        "description": "breed faster",
        "category": "breeding",
        "level": 5,
        "cost": 10,
        "adapt":{
            "breeding": -30,
            "gestation": -15,
            "intelligence": -1
        },
        "dump":3
    },
    {
        "name": "breeding 3",
        "description": "breed faster",
        "category": "breeding",
        "level": 10,
        "cost": 20,
        "adapt":{
            "breeding": -40,
            "gestation": -20,
            "intelligence": -1
        },
        "dump":5
    },
    {
        "name": "gigantism 1",
        "description": "become bigger",
        "category": "speed",
        "level": 10,
        "cost": 15,
        "adapt":{
            "size": 2,
            "speed":-2,
            "energy":-10,
            "rest":20,
            "hunger":5,
            "digestion":3,
            "hp":2,
            "defence":1,
            "breeding":50,
            "gestation":100
        },
        "dump":5
    },
    {
        "name": "gigantism 2",
        "description": "become bigger",
        "category": "speed",
        "level": 15,
        "cost": 30,
        "adapt":{
            "size": 2,
            "speed":-2,
            "energy":-10,
            "rest":25,
            "hunger":20,
            "digestion":3,
            "hp":3,
            "defence":3,
            "attack":1,
            "breeding":100,
            "gestation":150
        },
        "dump":8
    },
    {
        "name": "foraging 1",
        "description": "less likely to go hungry",
        "category": "food",
        "level": 1,
        "cost": 2,
        "adapt":{
            "hunger": 20
        },
        "dump":1
    },
    {
        "name": "foraging 2",
        "description": "less likely to go hungry",
        "category": "food",
        "level": 2,
        "cost": 3,
        "adapt":{
            "hunger": 30,
            "energy": 5
        },
        "dump":1
    },
    {
        "name": "foraging 3",
        "description": "less likely to go hungry",
        "category": "food",
        "level": 4,
        "cost": 4,
        "adapt":{
            "hunger": 50,
            "energy": 5
        },
        "dump":2
    },
    {
        "name": "foraging 4",
        "description": "less likely to go hungry",
        "category": "food",
        "level": 6,
        "cost": 5,
        "adapt":{
            "hunger": 100,
            "speed":-1,
            "energy": 10
        },
        "dump":3
    },
    {
        "name": "foraging 5",
        "description": "less likely to go hungry",
        "category": "food",
        "level": 10,
        "cost": 8,
        "adapt":{
            "hunger": 150,
            "speed":-1,
            "energy": 15
        },
        "dump":3
    },
    {
        "name": "foraging 6",
        "description": "less likely to go hungry",
        "category": "food",
        "level": 15,
        "cost": 15,
        "adapt":{
            "hunger": 150,
            "energy": 15
        },
        "dump":4
    },
    {
        "name": "life expectancy 1",
        "description": "your cells can live longer",
        "category": "life",
        "level": 10,
        "cost": 10,
        "adapt":{
            "intelligence":1,
            "life": 200,
            "energy":10,
            "hunger":10
        },
        "dump":3
    },
    {
        "name": "life expectancy 2",
        "description": "your cells can live longer",
        "category": "life",
        "level": 15,
        "cost": 20,
        "adapt":{
            "intelligence":1,
            "life": 300,
            "energy":10,
            "hunger":10
        },
        "dump":5
    },
    {
        "name": "life expectancy 3",
        "description": "your cells can live longer",
        "category": "life",
        "level": 20,
        "cost": 30,
        "adapt":{
            "intelligence":1,
            "life": 500,
            "energy":10,
            "hunger":10,
            "speed":-1
        },
        "dump":6
    },
    {
        "name": "litter 1",
        "description": "produce more offspring",
        "category": "breeding",
        "level": 15,
        "cost": 20,
        "adapt":{
            "intelligence":-1,
            "life": -200,
            "offspring":1,
            "gestation":100,
            "breeding":20
        },
        "dump":8
    },
    {
        "name": "litter 2",
        "description": "produce more offspring",
        "category": "breeding",
        "level": 20,
        "cost": 30,
        "adapt":{
            "life": -200,
            "offspring":1,
            "gestation":100,
            "breeding":30
        },
        "dump":12
    }
    
];
let adaptOptions = [];

let plantpop = [];
let truce = false;

let evolutionPoints = 5;
let playerLevel = 1;

function wrapCoor(x, y){
    if(x < 0){
        x = x + maxX;
    }
    if(x > maxX){
        x = x - maxX;
    }
    if(y < 0){
        y = y + maxY;
    }
    if(y > maxY){
        y = y - maxY;
    }
    return [x,y];
}
class plant{
    constructor(x, y, food){
        this.x = x;
        this.y = y;
        this.food = food;
        this.element = this.buildElement();
        this.render();
        this.eaten = false;
    }

    buildElement(){
        let el = document.createElement("div");
        el.classList.add("plant");
        el.style.left = Math.floor(this.x)+"px";
        el.style.top = Math.floor(this.y)+"px";
        world.appendChild(el);
        return el;
    }

    render(){
        this.element.style.width = this.food+"px";
        this.element.style.height = this.food+"px";
        this.element.style.left = Math.floor(this.x-(this.food/2))+"px";
        this.element.style.top = Math.floor(this.y-(this.food/2))+"px";
    }

    remove(){
        this.element.remove();
    }
}
function seed(food){
    let x = Math.random() * maxX;
    let y = Math.random() *maxY;
    if(food == null){
        food = 1 + Math.floor(Math.random()*3);
    }
    plantpop.push(new plant(x,y,food));
}
function distanceBetween(obj1, obj2) {
    return Math.sqrt(((obj1.x - obj2.x) * (obj1.x - obj2.x)) + ((obj1.y - obj2.y) * (obj1.y - obj2.y)));
}

function renderAdaptations(){
    adaptationsEl.innerHTML = "";

    let trials = 20;
    for(let i = 0; i < (6 - adaptOptions.length); i++){
        let adap = adaptations[Math.floor(Math.random()*adaptations.length)];
        if(adap.level <= playerLevel){
            if(adaptOptions.includes(adap)){
                trials--;
                if(trials > 0){
                    i--;
                    continue;
                }
            } else {
                adaptOptions.push(adap);
            }
        } else {
            trials--;
            if(trials > 0){
                i--;
                continue;
            }
        }
    }
    
    adaptOptions.forEach((adap)=>{
        let el = document.createElement("div");
        el.classList.add("adaptation");
        
        let name = document.createElement("p");
        name.innerText = adap.name;
        name.classList.add("title");

        let desc = document.createElement("p");
        desc.innerText = adap.description;

        let btn1 = document.createElement("button");
        btn1.innerText = "Buy for "+adap.cost;
        btn1.addEventListener("click", ()=>{
            if(adap.cost <= evolutionPoints){
                buy(adap);
            }
        });

        let btn2 = document.createElement("button");
        btn2.classList.add("dump");
        btn2.innerText = "Dump for "+adap.dump;
        btn2.addEventListener("click", ()=>{
                dump(adap);
        });

        el.appendChild(name);
        el.appendChild(desc);
        el.appendChild(btn1);
        el.appendChild(btn2);

        adaptationsEl.appendChild(el);
    });
}

function buy(adap){
    evolutionPoints -= adap.cost;
    playerLevel++;

    adaptations.splice(adaptations.indexOf(adap),1);
    adaptOptions.splice(adaptOptions.indexOf(adap),1);

    for(let prop in adap.adapt){
        AllGenes["player"][prop] += adap.adapt[prop];
    }

    console.log(AllGenes["player"]);

    updatePointsEl();
    renderAdaptations();
}

function dump(adap){
    evolutionPoints += adap.dump;
    adaptations.splice(adaptations.indexOf(adap),1);
    adaptOptions.splice(adaptOptions.indexOf(adap),1);
    updatePointsEl();
    renderAdaptations();
}

function updatePointsEl(){
    pointsEl.innerText = evolutionPoints;
}

renderAdaptations();

let ticks = 0;
function tick(localSpeed){
    ticks++;
    if(globalStop){
        console.log("program paused");
        return;
    }
    setTimeout(()=>{
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
        spawnNewSpecies();

        tick(globalSpeed);

    }, localSpeed);
}
function startTicking(){
    globalStop = false;
    tick();
}
function stopTicking(){
    globalStop = true;
}

pauseBtn.addEventListener("click", ()=>{
    if(globalStop){
        pauseBtn.innerText = "pause"
        startTicking();
    } else {
        pauseBtn.innerText = "unpause"
        stopTicking();

        console.log(ticks);
        console.log(pop);
        console.log(plantpop);
    }
});

for(let i = 0; i < 150; i++){
    seed(3+Math.floor(Math.random()*5));
}

function spawnNewSpecies(){
    // species 1
    if(ticks == 500){
        messager("A new species will emerge soon...");
    }
    if(ticks == 650){
        pop.push(new Blip("bot1", AllGenes["bot1"], Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot1", AllGenes["bot1"], Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }
    if(ticks == 700){
        truce = false;
    }

    //species 2
    if(ticks == 1500){
        messager("A new species will emerge soon...");
    }
    if(ticks == 1650){
        pop.push(new Blip("bot3", AllGenes["bot3"], Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot3", AllGenes["bot3"], Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }

    //species 3
    if(ticks == 2500){
        messager("A new species will emerge soon...");
    }
    if(ticks == 2650){
        pop.push(new Blip("bot5", AllGenes["bot5"], Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot5", AllGenes["bot5"], Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot5", AllGenes["bot5"], Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }

    //species 4
    if(ticks == 4300){
        messager("A new species will emerge soon...");
    }
    if(ticks == 4450){
        pop.push(new Blip("bot2", AllGenes["bot2"], Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }

    //species 5
    if(ticks == 6300){
        messager("A new species will emerge soon...");
    }
    if(ticks == 6450){
        pop.push(new Blip("bot4", AllGenes["bot4"], Math.floor(maxX/2), Math.floor(maxY/2)));
        pop.push(new Blip("bot4", AllGenes["bot4"], Math.floor(maxX/2), Math.floor(maxY/2)));
        messager("A new species has appeared");
        for(let i = 0; i < 20; i++){
            seed();
        }
    }
}
function messager(string, type){
    message.innerHTML = string;
    message.className = "";
    message.classList.add(type);
    messageContainer.style.opacity = 1;
    setTimeout(()=>{
        messageContainer.style.opacity = 0;
    }, 2000);
}

updatePointsEl();
startTicking();

//make a wrapping function so when they leave the world, they pop up on the other side
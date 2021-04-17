//important game functions that can be used anywhere

//will give the coordinates at the other side of the world, if they exceed the world coordinates
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

//will plant 1 seed randomly on the world map
function seed(food){
    let x = Math.random() * maxX;
    let y = Math.random() *maxY;
    if(food == null){
        food = 1 + Math.floor(Math.random()*3);
    }
    plantpop.push(new plant(x,y,food));
}

//calculate distance between two objects
function distanceBetween(obj1, obj2) {
    return Math.sqrt(((obj1.x - obj2.x) * (obj1.x - obj2.x)) + ((obj1.y - obj2.y) * (obj1.y - obj2.y)));
}

function randomString(length) {
    let result           = [];
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

//show the adaptationOptions on the screen
function renderAdaptations(){
    DOM.ui.adaptations.innerHTML = "";

    let trials = 20;
    for(let i = 0; i < (6 - Player.adaptOptions.length); i++){
        let adap = adaptations[Math.floor(Math.random()*adaptations.length)];
        if(adap.level <= Player.level){
            if(Player.adaptOptions.includes(adap)){
                trials--;
                if(trials > 0){
                    i--;
                    continue;
                }
            } else {
                Player.adaptOptions.push(adap);
            }
        } else {
            trials--;
            if(trials > 0){
                i--;
                continue;
            }
        }
    }
    
    Player.adaptOptions.forEach((adap)=>{
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
            if(adap.cost <= Player.evolutionPoints){
                Player.buy(adap);
            }
        });

        let btn2 = document.createElement("button");
        btn2.classList.add("dump");
        btn2.innerText = "Dump for "+adap.dump;
        btn2.addEventListener("click", ()=>{
                Player.dump(adap);
        });

        el.appendChild(name);
        el.appendChild(desc);
        el.appendChild(btn1);
        el.appendChild(btn2);

        DOM.ui.adaptations.appendChild(el);
    });
}

//update the Player.evolutionPoints on the screen
function updatePointsEl(){
    DOM.ui.points.innerText = Player.evolutionPoints;
}

//show a message on the screen
function messager(string, type){
    DOM.ui.message.text.innerHTML = string;
    DOM.ui.message.text.className = "";
    DOM.ui.message.text.classList.add(type);
    DOM.ui.message.container.style.opacity = 1;
    setTimeout(()=>{
        DOM.ui.message.container.style.opacity = 0;
    }, 2000);
}

function evolveAll(species){
    pop.forEach(blip => {
        if(blip.species == species){
            blip.evolve();
        }        
    });
}

function spawnEnemy(){
    //find an enemy that fits the current difficulty curve
    let choice;
    for(let i = 0; i < 10; i++){
        let enemy = enemies[Math.floor(Math.random()*enemies.length)];
        if(enemy.level <= Math.ceil(Game.ticks/500)){
            choice = enemy;
            break;
        }
    }
    if(choice == undefined){
        return;
    }

    //remove from enemies
    choice.count--;
    if(choice.count <= 0){
        enemies.splice(enemies.indexOf(choice), 1);
    }

    //first add DNA to AllGenes
    let id = speciesColors[Math.floor(Math.random()*speciesColors.length)];
    AllGenes[id] = choice.DNA;
    speciesColors.splice(speciesColors.indexOf(id), 1);
    console.log(speciesColors);
    activeSpecies.push(id);

    //then spawn enemies that use that DNA on a random place
    let possibleSpawn = [
        [maxX/2, maxY/2],
        [maxX/4, maxY/4],
        [maxX/2, maxY/4],
        [maxX*0.75, maxY/4],
        [maxX*0.75, maxY/2],
        [maxX*0.75, maxY*0.75],
        [maxX/2, maxY*0.75],
        [maxX/4, maxY*0.75],
        [maxX/4, maxY/2]
    ];
    let place = possibleSpawn[Math.floor(Math.random()*possibleSpawn.length)];
    for(let i = 0; i < choice.start; i++){
        pop.push(new Blip(id, place[0], place[1]));
    }
}
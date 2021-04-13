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

//show the adaptationOptions on the screen
function renderAdaptations(){
    DOM.ui.adaptations.innerHTML = "";

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

        DOM.ui.adaptations.appendChild(el);
    });
}

//buy an adaptation
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

//dump an adaptation
function dump(adap){
    evolutionPoints += adap.dump;
    adaptations.splice(adaptations.indexOf(adap),1);
    adaptOptions.splice(adaptOptions.indexOf(adap),1);
    updatePointsEl();
    renderAdaptations();
}

//update the evolutionpoints on the screen
function updatePointsEl(){
    DOM.ui.points.innerText = evolutionPoints;
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
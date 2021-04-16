class player {
    constructor(){
        this.adaptOptions = [];
        this.evolutionPoints = 5;
        this.level = 1;
        this.stats = {
            "eaten": 0, // eaten by others
            "hunted": 0, //eaten others
            "killed": 0, //killed in defence by others
            "bred": 0, //times bred
            "offspring": 0, //how much offspring was made in total
            "old_age": 0, //how many times has a blip died of old age?
            "starved": 0, //how many times has a blip died of hunger
            "deaths": 0, //how many blips have died
            "food": 0, // how much food have they eaten?
            "digested": 0 // how much food have they digested?
        }
    }

    //buy an adaptation
    buy(adap){
        Player.evolutionPoints -= adap.cost;
        Player.level++;

        adaptations.splice(adaptations.indexOf(adap),1);
        Player.adaptOptions.splice(Player.adaptOptions.indexOf(adap),1);

        for(let prop in adap.adapt){
            AllGenes["player"][prop] += adap.adapt[prop];
        }

        console.log(AllGenes["player"]);

        updatePointsEl();
        renderAdaptations();
        evolveAll("player");
    }

    //dump an adaptation
    dump(adap){
        Player.evolutionPoints += adap.dump;
        adaptations.splice(adaptations.indexOf(adap),1);
        Player.adaptOptions.splice(Player.adaptOptions.indexOf(adap),1);
        updatePointsEl();
        renderAdaptations();
    }
}
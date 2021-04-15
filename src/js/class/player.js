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
}
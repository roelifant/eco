adaptations = [

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
            "digestion": 2,
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
            "digestion": 3,
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
            "digestion": 5,
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
            "digestion":1,
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
            "digestion":1,
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
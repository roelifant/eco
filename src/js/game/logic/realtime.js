class RT {
    constructor(speed, actions){
        this.ticks = 0;
        this.speed = speed;
        this.stop = false;
        this.actions = actions;
    }

    tick(speed){
        this.ticks++;
        if(this.stop){
            console.log("program paused");
            return;
        }
        setTimeout(()=>{
            //this will happen every tick
            this.actions(this.ticks);
            this.tick();
        }, this.speed);
    }

    start(){
        this.stop = false;
        this.tick();
    }

    stop(){
        this.stop = true;
    }
}
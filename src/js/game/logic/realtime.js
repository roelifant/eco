class RT {
    constructor(speed, actions){
        this.ticks = 0;
        this.speed = speed;
        this.stopped = false;
        this.actions = actions;
    }

    tick(speed){
        this.ticks++;
        if(this.stopped){
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
        this.stopped = false;
        this.tick();
    }

    stop(){
        this.stopped = true;
    }
}
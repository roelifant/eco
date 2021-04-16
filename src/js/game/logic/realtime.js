class RT {
    constructor(speed, actions){
        this.ticks = 0;
        this.speed = speed;
        this.stopped = false;
        this.actions = actions;
    }

    tick(){
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
        this.tick(this.speed);
    }

    stop(){
        this.stopped = true;
    }
}
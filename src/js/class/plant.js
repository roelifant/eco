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
        DOM.world.appendChild(el);
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
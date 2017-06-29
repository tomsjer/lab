class Walker{
    constructor(options){
        this.location = options.location;
        this.velocity = options.velocity;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        // delta+= map(mouseX,0,width,0.01,10);
        this.cont = options.cont;
        this.delta = 0.0;
        this.theta = 0.0;
        this.gamma = 0.0;
    }
    update(){
        this.constrain();
        this.cont += 0.001;
        this.delta += this.cont;
        this.theta = Math.sin(rad(this.delta));
        this.gamma = Math.cos(rad(this.delta));
        this.velocity = new Vector(this.gamma,this.theta);
        //this.velocity.sub({x:1,y:1})
        this.location.add(this.velocity);
    }
    constrain(){
        if(this.location.x <= 0 || this.location.x >= width){
            this.velocity.x *= -1;
        }
        if(this.location.y <= 0 || this.location.y >= height){
            this.velocity.y *= -1;
        }
    }
    display(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.location.x,this.location.y,this.width,this.height);
    }
}

module.exports = Walker;
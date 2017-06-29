class Particle{
    constructor(o){
        this.location = o.location;
        this.velocity = o.velocity;
        this.acceleration = o.acceleration;
        this.mass = o.mass;
        this.r = o.radius;
        this.lifespan = 100;
        this.cont = 5;
        this.delta = Math.random();
        this.theta = Math.random();
        this.gamma = Math.random();
    }
    update(){
        
        /* Update data */
        this.cont += Math.random();
        this.delta += this.cont;
        this.theta = Math.sin(rad(this.delta));
        this.gamma = Math.cos(rad(this.delta));
        this.lifespan -= 0.2;
        
        /* Apply forces */
        this.applyForce(wind);
        this.applyForce(new Vector(0,gravity.x*this.mass));
        // this.applyEdgeForces(); NO FUNCA!

        /* Update location and reset values*/
        this.velocity.add(this.acceleration);
        // this.velocity.mult(0.5);
        // this.checkEdges();
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }
    display(){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fill();
    }
    checkEdges(){
        if( this.location.x > width){
            this.location.x = width;
            this.velocity.x *= -1;
        }
        if(this.location.y >= height){
            this.location.y = height;
            this.velocity.y *= -1;
        }
    }
    applyEdgeForces(){
        this.applyForce(edgess[0].clone().div(this.location.y));
        this.applyForce(edgess[1].clone().div(width - this.location.x));
        this.applyForce(edgess[2].clone().div(height - this.location.y));
        this.applyForce(edgess[3].clone().div(this.location.x));
    }
    isDead(){
        return (this.lifespan <= 0);
    }
    run(){
        this.update();
        this.display();
    }
    applyForce(force){
        force = new Vector(force.x,force.y).div(this.mass);
        this.acceleration.add(force);
    }
    remove(){
        delete this;
    }
    get x(){
        return this.location.x;
    }
    get y(){
        return this.location.y;
    }
}
module.exports = Particle;
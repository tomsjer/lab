import Particle from './Particle.js';
class PointParticle extends Particle{
    constructor(o){
        super(o);
        this.mass = 10;
    }
    display(){
        ctx.save();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x,this.y,10,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}
module.exports = PointParticle;

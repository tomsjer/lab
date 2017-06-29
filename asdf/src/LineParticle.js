import Particle from './Particle.js';
class LineParticle extends Particle{
    constructor(o){
        super(o);
        this.mass = 0.5;
    }
    display(){
        var white = map(this.lifespan,0,50,0,1);
        ctx.save();
        ctx.translate(this.x-this.r/2,this.y-this.r/2);
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,"+white+")";
        ctx.moveTo(0, 0);
        ctx.lineTo(random(-10,10),random(-10,10));
        // ctx.strokeRect(0,0,this.r,this.r);
        ctx.stroke();
        ctx.restore();
    }
}
module.exports = LineParticle;
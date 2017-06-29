import Particle from './Particle.js';
class SmokeParticle extends Particle{
    constructor(o){
        super(o);
        let self = this;
        this.imgLoaded = false;
        this.sprite = new Image();
        this.sprite.onload = function(){
            self.imgLoaded = true;
        };
        this.sprite.src = 'img/smoke_256.png';
    }
    display(){
        if(!this.imgLoaded) return;
        ctx.save();
        ctx.translate(this.x-this.r/2,this.y-this.r/2);
        ctx.rotate((frameCount*0.001)*Math.PI/180);
        ctx.globalAlpha = map(this.lifespan,0,100,0,1);
        ctx.drawImage(this.sprite,0,0,this.r,this.r);
        ctx.restore();
    }
}
module.exports = SmokeParticle;
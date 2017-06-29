import Particle from './Particle.js';
import SmokeParticle from './SmokeParticle.js';
import LineParticle from './LineParticle.js';
import PointPartice from './PointParticle.js';

class ParticleSystem{
    constructor(origin,maxAmount,type){
        this.particles = [];
        this.origin = origin;
        this.flag = true;
        this.maxAmount = maxAmount || 10;
        this.velocity = new Vector(1,1);
        this.acceleration = new Vector(0,0);
        this.cont = 5;
        this.delta = 0.0;
        this.theta = 0.0;
        this.gamma = 0.0;
        this.type = type;
        this.particleTypes = {
            'point':PointPartice,
            'line': LineParticle,
            'smoke':SmokeParticle
        };
        this.run();
    }
    run(){
        this.update();
        this.display();
    }
    update(){
        // this.delta += this.cont;
        // this.theta = Math.sin(rad(this.delta));
        // this.gamma = Math.cos(rad(this.delta));
        // this.acceleration = new Vector(this.gamma,this.theta);
        // this.velocity.add(this.acceleration);
        // this.origin.add(this.velocity);
        // this.velocity.mult(0);
        if(this.particles.length <= this.maxAmount && this.flag){
            this.particles.push(new this.particleTypes[this.type]({
                location: this.origin.clone(),
                velocity:  new Vector(map(Math.random(),0,1,-1,1),-0.01),
                acceleration:  new Vector(map(Math.random(),0,1,-0.02,0.01),-0.01),
                radius: Math.floor(map(Math.random(),0,1,20,50))
            }));
        }else{
            this.flag = false;
        }
        this.particles.forEach((p,i)=>{
            if(p.isDead()){
                p.remove();
                this.particles.splice(i,1);
            }
        });
    }
    display(){
        this.particles.forEach((p,i)=>{
            p.run();
        });
    }
    remove(){
        delete this;
    }
}

module.exports = ParticleSystem;
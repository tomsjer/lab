import Vector from './Vector.js';

function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}


class Arrow{
    constructor(){
        this.prevPos = new Vector(0,0);
        this.pos = new Vector(mouseX,mouseY);
        this.dir = new Vector(0,0);
        this.length = new Vector(50,50);
        this.origin = new Vector(mouseX,mouseY);
        this.width = 50;
        this.posta = 0;
        this.rot = 0;
        this.painting = false;
        this.points = [];
        this.bindEvents();
    }
    update(){
        
            this.origin = new Vector(this.pos.x,this.pos.y);
            this.dir = new Vector(mouseX,mouseY);
            this.dir.sub(this.origin).normalize();
            this.pos = new Vector(mouseX,mouseY);
            this.rot = this.getRot();
            this.posta = this.dir.add(this.pos);
        
    }
    display(){
        var self = this;
        // self.peine();
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = "1px";
        for(var i = -50; i <= 50; i+=25){
            var delta = 0 + i;
            var gamma = 0;
            var delta2 = 0 + i*1.2;
            var gamma2 = 0;

            ctx.beginPath();
            ctx.moveTo(self.points[0].x,self.points[0].y + i);
            this.points.forEach((p)=>{
                gamma = Math.sin(delta * Math.PI/180) * 0.5;
                delta += 1;
                // gamma2 = Math.sin(delta * Math.PI/180) * 0.8;
                // delta2 += 1.5;
                var r = (gamma+gamma2)/2;
                ctx.save();
                ctx.translate(p.x,p.y);
                ctx.rotate(p.r);
                ctx.lineTo(0,i*gamma);
                ctx.restore();
            });
            ctx.stroke();
            
        }
    }
    bindEvents(){
        var self = this;
        window.addEventListener('mousedown',(e)=>{
            self.update();
            self.painting = !self.painting;
            self.points = [];
            self.points.push({
                x:e.clientX,
                y:e.clientY,
                r:self.rot
            });
        });
        window.addEventListener('mousemove',(e)=>{
            self.update();
            if(self.painting) self.points.push({
                x:e.clientX,
                y:e.clientY,
                r:self.rot
            });
        });
        window.addEventListener('mouseup',(e)=>{
            // self.painting = false;
            self.points = [{x:e.clientX,y:e.clientY,r:self.rot}];
        });
    }
    getRot(){
        if(!this.dir.mag()) return this.rot;
        var r =  Math.atan2(this.dir.y,this.dir.x);
        // console.log('x: ' + this.dir.x + 'y: ' + this.dir.y + ' | mag(): '+this.dir.mag() + ' | rot: '+r)
        return r;
    }
    peine(){
        
        ctx.save();
        ctx.translate(this.pos.x,this.pos.y);
        ctx.rotate(this.rot);
        ctx.strokeStyle = "red";
        ctx.strokeRect(0,-50,2,100);
        ctx.strokeStyle = 'white';
        for(var i = -40; i <= 40; i+=10){
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0,i);
            ctx.lineTo(-50,i);
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }
}
export default Arrow; 
class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;

        return this;
    }
    add(vector){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    sub(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    mag(){
      return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    mult(num){
        this.x *= num;
        this.y *= num;
        return this;
    }
    clone(){
        return new Vector(this.x,this.y);
    }
    div(num){
        this.x = this.x/num;
        this.y = this.y/num;
        return this;
    }
}

window.Vector = Vector;
window.canvas = document.getElementById('canvas');
window.ctx = canvas.getContext('2d');

window.onresize = function(){
    canvas.width = window.width = window.innerWidth;
    canvas.height = window.height = window.innerHeight;
};
window.onresize();

window.cont = 0.0;

window.rad = function(deg){
    return deg * Math.PI/180;
};

window.mouseX = 0;
window.mouseY = 0;
window.onmousemove = function(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
};
window.map = function(a,b,c,d,f){return d+(f-d)*((a-b)/(c-b))};

window.random = function(min,max){
    return map(Math.random(),0,1,min,max);
}
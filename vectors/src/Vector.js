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
    normalize(){
        var m = this.mag();
        if(m === 0) return this;
        this.x = this.x/m;
        this.y = this.y/m;
        return this;
    }
}

export default Vector;
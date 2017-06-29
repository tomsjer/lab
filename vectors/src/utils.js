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
window.map = function(a,b,c,d,f){ return d+(f-d)*((a-b)/(c-b));};
window.random = function(min,max){ return map(Math.random(),0,1,min,max);};

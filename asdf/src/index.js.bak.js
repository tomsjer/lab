// GLOBALS
window.frameCount = 0;
window.systems = [];
window.PLAY = false;
window.TYPE = 'point';
window.reqId = 0;

//FORCES
window.wind = new Vector(0.1,0);
window.gravity = new Vector(0,0.1);
window.edgess = [
    new Vector(0,1),
    new Vector(-1,0),
    new Vector(0,-1),
    new Vector(1,0),
];

import ParticleSystem from './ParticleSystem.js';
import './utils.js';
import './sidebar.js';
import './controls.js';


function setup(){
    // ctx.globalCompositeBlending = 'screen';
    // loop();
}
function update(){
    ++frameCount;
}
function render(){
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0,0,width,height);
    systems.forEach((ps,i)=>{
        ps.run();
        if(!ps.particles.length){
            ps.remove();
            systems.splice(i,1);
            return;
        }
    });
}
var lastCalledFrame, fps, delta;
var fpsHTML = document.getElementById("fps");
function loop(){
    reqId = requestAnimationFrame(loop);
    update();
    render();
    if(!lastCalledFrame){
        lastCalledFrame = Date.now();
        fps = 0;
        return;
    }
    delta = (Date.now()-lastCalledFrame)/1000;
    fps = 1/delta | 0;
    lastCalledFrame = Date.now();
    if(frameCount % 24 === 0)fpsHTML.innerHTML = fps;
}
setup();

// CONTROLS
var play = document.getElementById('play');
var pause = document.getElementById('pause');
play.onclick = function(){
    if(!PLAY){
        loop();
        PLAY = true;
    }
};
pause.onclick = function(){
    if(PLAY){
        cancelAnimationFrame(reqId);
        PLAY = false;
    }
};
canvas.onclick = function(event){
    systems.push(new ParticleSystem(new Vector(event.clientX,event.clientY),1,TYPE));
}
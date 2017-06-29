// GLOBALS
window.frameCount = 0;

import ParticleSystem from './ParticleSystem.js';
import './utils.js';

var reqId;
var img = new Image();
    img.onload = function(){

    };
    img.src = 'img/smoke_256.png';
function setup(){
    // ctx.globalCompositeBlending = 'screen';
    loop();
}
function update(){
    ++frameCount;
}
function render(){
    ctx.clearRect(0,0,width,height);
    ctx.drawImage(img,mouseX,mouseY,30,30);
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


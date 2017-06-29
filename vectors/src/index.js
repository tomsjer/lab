// GLOBALS
window.frameCount = 0;
import './utils.js';
import Arrow from './Arrow.js';

var reqId, arrow = new Arrow();

function setup(){
    loop();
    ctx.lineJoin = ctx.lineCap = 'round';
}
function update(){
    ++frameCount;
    // arrow.update();
}
function render(){
    ctx.fillStyle="rgba(0,0,0,.25)";
    ctx.fillRect(0,0,width,height);
    // ctx.clearRect(0,0,width,height);
    if(arrow.painting) arrow.display();
}

function loop(){
    reqId = requestAnimationFrame(loop);
    update();
    render();
}
setup();


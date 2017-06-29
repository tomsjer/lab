import ParticleSystem from './ParticleSystem.js';
function handleDragStart(e) {
    console.log(this,e);
}
function handleDragOver(e) {
    console.log(this,e);
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    return false;
}
function handleDragEnter(e) {
  // this / e.target is the current hover target.
  console.log(this,e);
}
function handleDragLeave(e) {
    console.log(this,e);
}

function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  console.log(this,e);

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  var a = prompt('Amount?');
  systems.push(new ParticleSystem(new Vector(event.clientX,event.clientY),parseInt(a),this.dataset.type));
}


document.querySelectorAll('aside li').forEach(function(obj) {
  obj.addEventListener('dragstart', handleDragStart, false);
  obj.addEventListener('dragenter', handleDragEnter, false);
  obj.addEventListener('dragover', handleDragOver, false);
  obj.addEventListener('dragleave', handleDragLeave, false);
  obj.addEventListener('drop', handleDrop, false);
  obj.addEventListener('dragend', handleDragEnd, false);
  obj.addEventListener('click',(e)=>{
    TYPE = obj.dataset.type;
  });
});
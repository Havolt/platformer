
const levelsScript = document.createElement('script');
levelsScript.src= './levels.js';
document.head.appendChild(levelsScript);

let gc = document.getElementById('gc');
let ctx = gc.getContext('2d');

//Data for canvas
let ctxData = {
    width: 960,
    height: 576,
    tileSize: 48
};


//Sets the css of canvas
function setCanvasStyle(cId, width, height){
    console.log(cId)
    cId.setAttribute('width', width + 'px');
    cId.setAttribute('height', height + 'px');
}

//Initialize startup functions
function initApp(){
    setCanvasStyle(gc, ctxData.width, ctxData.height)
    console.log(levels);
}


window.onload = function(){
    initApp();
}


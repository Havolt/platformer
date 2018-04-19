let c = document.getElementById('game');
let ctx = c.getContext('2d');


function defineCanvasStyle(canvasId, width, height){
    canvasId.style.width = width +'px';
    canvasId.style.height = height +'px';
    canvasId.style.border = "1px solid black";
}

function gameEngine(){
    
    setTimeout(gameEngine, 20);
}


(function initApp(){
    console.log('hello');
    defineCanvasStyle(c, 960 , 540);
    gameEngine();
})()
console.log(window.innerWidth)
console.log(window.innerHeight);
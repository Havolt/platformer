
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

//Data for game
let gameData = {
    currLevel : []
}


//Sets the css of canvas
function setCanvasStyle(cId, width, height){
    cId.setAttribute('width', width + 'px');
    cId.setAttribute('height', height + 'px');
}

function drawLevelLoop(level){
    for(let i = 0; i < level.map.length; i++){
        for(let j = 0; j < level.map[i].length; j++){
            drawLevel(level.map[i][j], i, j);
        }  
    }
}

function drawLevel(tile, y, x){
    if(tile == 0){
        ctx.fillStyle='blue';
    }else if(tile == 1){
        ctx.fillStyle='green';
    }
    ctx.fillRect(x * ctxData.tileSize, y * ctxData.tileSize, ctxData.tileSize, ctxData.tileSize);
}

//Initialize startup functions
function initApp(){
    setCanvasStyle(gc, ctxData.width, ctxData.height);
    gameData.currLevel = levels.level1;
    drawLevelLoop(gameData.currLevel);
}


window.onload = function(){
    initApp();
}


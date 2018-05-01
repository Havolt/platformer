
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
    currLevel : [],
    fps: 1000
}

//Data for player
let playerData = {
    width: 20,
    height: 40,
    color: 'black',
    xPos: 50,
    yPos: 440,
    velocity: 0,
    direction: 0,
    status: 'alive',
    isMoving: false
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
        ctx.fillStyle='lightblue';
    }else if(tile == 1){
        ctx.fillStyle='green';
    }
    ctx.fillRect(x * ctxData.tileSize, y * ctxData.tileSize, ctxData.tileSize, ctxData.tileSize);
}

function drawPlayerChar(pd){
    ctx.fillStyle=pd.color;
    ctx.fillRect(pd.xPos, pd.yPos, pd.width, pd.height);
}

//Initialize startup functions
function initApp(){
    setCanvasStyle(gc, ctxData.width, ctxData.height);
    gameData.currLevel = levels.level1;
    drawLevelLoop(gameData.currLevel);
    drawPlayerChar(playerData);
    gameEngine('sup'); 
}

function gameEngine(){
    console.log('frame');
    setTimeout(function(){
        gameEngine()
    }, gameData.fps);
}

//Keydown listeners
document.addEventListener('keydown', function(e){
    if(e.keyCode == 37){
        playerData.direction = -1;
    }
    else if(e.keyCode == 39){
        playerData.direction = 1;
    }
    console.log(playerData.direction)
})

document.addEventListener('keyup', function(e){
    if(e.keyCode == 37 || e.keyCode == 39){
        playerData.direction = 0;
    }
    console.log(playerData.direction)
})


window.onload = function(){
    initApp();
}


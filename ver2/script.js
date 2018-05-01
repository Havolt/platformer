
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
    fps: 1000/30
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
    isMoving: false,
    inAir: false,
    currTileX: 0,
    currTileY: 0,
    keysDown: {'37': false,
                '39': false}
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




//Control players movement
function playerPhysics(){
    getCurrTile(gameData.currLevel.map, playerData);
    //console.log(playerData.direction)
    playerWalk();
}

function getCurrTile(gd, pd){
    playerData.currTileX = Math.floor(pd.xPos / ctxData.tileSize);
    playerData.currTileY = Math.floor(pd.yPos / ctxData.tileSize)
}

function playerWalk(){
    if(playerData.keysDown['39']){
        playerData.xPos += 5;
    }
    else if(playerData.keysDown['37']){
        playerData.xPos -= 5;
    }
}





//Initialize startup functions
function initApp(){
    setCanvasStyle(gc, ctxData.width, ctxData.height);
    gameData.currLevel = levels.level1;
    playerPhysics();
    drawLevelLoop(gameData.currLevel);
    drawPlayerChar(playerData);
    gameEngine(); 
}

function gameEngine(){
    ctx.clearRect(0,0,ctxData.width, ctxData.height);
    drawLevelLoop(gameData.currLevel);
    drawPlayerChar(playerData);
    playerPhysics();
    setTimeout(function(){
        gameEngine()
    }, gameData.fps);
}






//Keydown listeners
document.addEventListener('keydown', function(e){
    if(e.keyCode == 37){
        playerData.keysDown['37'] = true
    }
    else if(e.keyCode == 39){
        playerData.keysDown['39'] = true
    }
    
})

document.addEventListener('keyup', function(e){
    if(e.keyCode == 37){
        playerData.keysDown['37'] = false;
    }
    else if(e.keyCode == 39){
        playerData.keysDown['39'] = false;
    }
})


window.onload = function(){
    initApp();
}


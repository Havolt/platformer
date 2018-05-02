
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
    xPos: 0,
    yPos: 0,
    moveSpeed: 1,
    jumpSpeed: 8,
    jumpTimer: 0,
    jumpTimerMax: 10,
    velocity: 0,
    status: 'alive',
    isMoving: false,
    canMoveRight : true,
    canMoveLeft: false,
    canJump: true,
    inAir: false,
    currTileX: 0,
    currTileY: 0,
    keysDown: {'37': false,
                '39': false,
                '32' : false}
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
    else if(tile == 2){
        ctx.fillStyle='gold';
    }
    else if(tile == 3){
        ctx.fillStyle='red';
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
    playerData.inAir = true;
    for(let i = 0; i < 6; i++){
        checkArea(gameData.currLevel.map, playerData)
        playerWalk();
    }
    playerJump();
    playerGravity();
    if(playerData.inAir){console.log(playerData.inAir)}
}

//Gets the players current tile location
function getCurrTile(gd, pd){
    playerData.currTileX = Math.floor(pd.xPos / ctxData.tileSize);
    playerData.currTileY = Math.floor(pd.yPos / ctxData.tileSize)
}

//Lets player walk
function playerWalk(){
    if(playerData.keysDown['39'] && playerData.canMoveRight){
        playerData.xPos += playerData.moveSpeed;
    }
    else if(playerData.keysDown['37'] && playerData.canMoveLeft){
        playerData.xPos -= playerData.moveSpeed;
    }
}

function playerJump(){
    
    if(!playerData.inAir && !playerData.keysDown['32']){
        playerData.jumpTimer = 0;
        playerData.canJump = true;
    }
    if(playerData.jumpTimer == playerData.jumpTimerMax){
        playerData.canJump = false;
    }
    if(playerData.keysDown['32'] && playerData.canJump){
        playerData.yPos -= playerData.jumpSpeed;
        playerData.jumpTimer++;
        playerData.inAir = true;
    }
    if(!playerData.keysDown['32'] && playerData.inAir){
        playerData.jumpTimer = playerData.jumpTimerMax;
    }
    
}

function playerGravity(){

    if((playerData.jumpTimer == 0 || playerData.jumpTimer == playerData.jumpTimerMax) && playerData.inAir){
        playerData.yPos += playerData.jumpSpeed;
    }
}

function checkArea(gd, pd){
    playerData.canMoveLeft = true;
    playerData.canMoveRight = true;
    let counter = 0;
    for( let i = 0; i < gd.length; i++){
        for(let j = 0; j < gd[i].length; j++){
            if((i >= (pd.currTileY -1) && i <= (pd.currTileY + 1) && ((j >= (pd.currTileX -1) && j <= (pd.currTileX + 1))))){
                
                   let x1 = j * ctxData.tileSize;
                   let x2 = (j+1) * ctxData.tileSize
                   let y1 = i * ctxData.tileSize;
                   let y2 = (i+1) * ctxData.tileSize;
                   checkMove(x1, x2, y1, y2, gd[i][j]);
                   checkGround(x1, x2, y1, y2, gd[i][j]);
                   checkCeiling(x1, x2, y1, y2, gd[i][j]);

                   
                   
                    if((playerData.xPos >= (x1 + 5) && playerData.xPos <= (x2 - 5)) || (playerData.xPos + playerData.width >= (x1 + 5) && playerData.xPos + playerData.width <= (x2 - 5))){
                        if((playerData.yPos >= (y1 + 12) && playerData.yPos <= (y2)) || (playerData.yPos + playerData.height >= (y1 + 12) && playerData.yPos + playerData.height <= (y2))){
                            if(gd[i][j] == 2){
                                checkWin(x1, x2, y1, y2, gd[i][j]);
                            }
                            if(gd[i][j] == 3){
                                checkDeath();
                            }
                            
                        }
                    }
                
                   
                   
                
            }
        }
    }
}

function checkMove(x1,x2,y1,y2, tileNum){
    //console.log(tileNum)
    if(tileNum == 1){
        if((playerData.yPos >= y1 && playerData.yPos <= y2) || ((playerData.yPos + playerData.height > y1 && playerData.yPos + playerData.height < y2))){
            if(((playerData.xPos + playerData.width + playerData.moveSpeed) >= x1) && ((playerData.xPos + playerData.width + playerData.moveSpeed) <= x2) && playerData.xPos + playerData.width < x1 ){
                playerData.canMoveRight = false;
            }
            else if(((playerData.xPos - playerData.moveSpeed) >= x1) && ((playerData.xPos - playerData.moveSpeed) <= x2) && playerData.xPos > x2 ){
                playerData.canMoveLeft = false;
            }
        }
        if(playerData.xPos <= 0){
            playerData.canMoveLeft = false;
        }
        else if(playerData.xPos + playerData.width >= ctxData.width){
            playerData.canMoveRight = false;
        }
    }
}

function checkGround(x1, x2, y1, y2, tileType){
    if(tileType == 1){
        if((playerData.xPos >= x1 && playerData.xPos <= x2) || (playerData.xPos + playerData.width >= x1 && playerData.xPos + playerData.width <= x2) ){
            if(playerData.yPos + playerData.height == y1){
                playerData.inAir = false;
            }
        }
    }
}

function checkCeiling(x1, x2, y1, y2, tileType){
    if(tileType == 1){
        if((playerData.xPos >= x1 && playerData.xPos <= x2) || (playerData.xPos + playerData.width >= x1 && playerData.xPos + playerData.width <= x2) ){
            if(playerData.yPos == y2){
                playerData.canJump = false;
                playerData.jumpTimer = playerData.jumpTimerMax;
            }
        }
    }
}

function checkWin(){
    console.log('winner')
    initMap(gameData.currLevel.nextLevel);
}

function checkDeath(){
    console.log('you died');
    initMap(gameData.currLevel)
}



//createsMap and settings
function initMap(gd){
    gameData.currLevel = gd;
    playerData.canJump = true;
    playerData.inAir = false;
    playerData.jumpTimer = 0;
    playerData.xPos = gd.playerX;
    playerData.yPos = gd.playerY;
}


//Initialize startup functions
function initApp(){
    setCanvasStyle(gc, ctxData.width, ctxData.height);
    initMap(levels.level1);
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
        playerData.keysDown['37'] = true;
    }
    else if(e.keyCode == 39){
        playerData.keysDown['39'] = true;
    }
    if(e.keyCode == 32){
        playerData.keysDown['32'] = true;
    }
    
})

document.addEventListener('keyup', function(e){
    if(e.keyCode == 37){
        playerData.keysDown['37'] = false;
    }
    else if(e.keyCode == 39){
        playerData.keysDown['39'] = false;
    }
    if(e.keyCode == 32){
        playerData.keysDown['32'] = false;
    }
})


window.onload = function(){
    initApp();
}


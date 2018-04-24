
//Data sections
let c = document.getElementById('game');
let ctx = c.getContext('2d');

let ctxData = {
    width: 960,
    height: 576,
    tileSize: 48
}

let gameData = {
    currLevel : []
}

let engineData = {
    gameStarted : false,
    activeFuncs : []
}

let playerData = {
    width: 26,
    height: 44,
    color: 'black',
    xPos: 50,
    yPos: 400,
    gravity: 0,
    speed: 0,
    inAir: true,
    isMoving: false,
    alive: false
}

let levelData = {
    level1 : { level: 1, 
        map: [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
    }
}

//Give canvas height, width and border
function defineCanvasStyle(canvasId, width, height){
    canvasId.setAttribute('width', width + 'px');
    canvasId.setAttribute('height', height + 'px');
    canvasId.style.border = "1px solid black";
}

//Clears Canvas
function clearCanvas(){
    ctx.clearRect(0,0,ctxData.width, ctxData.height);
}

//Draws level
function drawLevel(obj){
   for(let i = 0; i < obj.level[0].length; i++){
    for(let j = 0; j < obj.level[0][i].length; j++){
        ctx.fillStyle="lightblue";
        if(obj.level[0][i][j] == 1){ctx.fillStyle='green'}
        ctx.fillRect(j * ctxData.tileSize, i * ctxData.tileSize, ctxData.tileSize, ctxData.tileSize);
    }
   }  
}


//draw the player character
function drawPlayer(pd){
    if(pd.alive){
        ctx.fillStyle = pd.color;
        ctx.fillRect(pd.xPos, pd.yPos, pd.width, pd.height)
    }
}

//changes the players speed
function changePlayerSpeed(e, pd, ctd){
   if(e.keyCode == 37 && pd.speed > -5){
       if(pd.speed > 0 && pd.xPos > 0){ pd.speed -= 2;}
       else if(pd.speed > -2 && pd.xPos > 0){pd.speed--}
       else if(pd.xPos > 0){ pd.speed -= 0.25;}
       pd.isMoving = true;
   }
   
   else if(e.keyCode == 39 && pd.speed < 5){
       if(pd.speed < 0 && pd.xPos < (ctd.width - pd.width)){ pd.speed += 2;}
       else if(pd.speed < 2 && pd.xPos < (ctd.width - pd.width)){pd.speed++}
       else if(pd.xPos < (ctd.width - pd.width)){ pd.speed += 0.25; }
       pd.isMoving = true;
   }
   if(pd.xPos < 0){
        pd.xPos = 0;
        pd.speed = 0;
    }
   if(pd.xPos > (ctd.width - pd.width)){
        pd.xPos = (ctd.width - pd.width);
        pd.speed = 0;
    }
}

//Tells the playerData.isMoving if player no longer is
function revertPlayerSpeed(e, pd){
    if(e.keyCode == 37){
        pd.isMoving = false;
    }else if(e.keyCode == 39){
        pd.isMoving = false;
    }
}


//slows the player down if keydown is no longer pressed
function slowPlayer(pd){
    
    if(!pd.isMoving){
        if(pd.speed > 0){
            pd.speed -= 1
            if(pd.speed < 0){pd.speed = 0}
        }
        else if(pd.speed < 0){
            pd.speed += 1;
            if(pd.speed > 0){pd.speed = 0;}
        }
    }
}

//moves player xPos based on speed
function movePlayer(pd){
    if(pd.speed != 0){
        pd.xPos += pd.speed;
    }
}


function groundScan(argz){
    let pd = argz[0].xPos + argz[0].height;
    let ld = argz[1][0];
    
    console.log(pd)

}






function drawMenu(){
    //Create linear gradient
    let menuData ={
        buttonWidth : 254,
        buttonHeight : 60
    }
    let grd = ctx.createLinearGradient(0,0, 0, ctxData.height);
    grd.addColorStop(0, '#3a3a3a');
    grd.addColorStop(1, '#777777');
    ctx.fillStyle=grd;
    ctx.fillRect(0,0, ctxData.width, ctxData.height);
    //Create button
    ctx.strokeStyle='#fefefe';
    ctx.strokeRect((ctxData.width /2)-(menuData.buttonWidth /2),(ctxData.height /2)-(menuData.buttonHeight /2) - 20,menuData.buttonWidth, menuData.buttonHeight)
    ctx.fillStyle="#4b4b4b";
    ctx.fillRect((ctxData.width /2)-(menuData.buttonWidth /2),(ctxData.height /2)-(menuData.buttonHeight /2) - 20,menuData.buttonWidth, menuData.buttonHeight);
    ctx.fillStyle="#fefefe";
    ctx.font="32px Arial"
    ctx.fillText('PRESS ENTER', (ctxData.width /2)-(menuData.buttonWidth /2) + 14,(ctxData.height /2)-(menuData.buttonHeight /2) + 22);
}


//Game engine all functions pass through this from engineData.activeFuncs
function gameEngine(){
    for(let i = 0; i < engineData.activeFuncs.length; i++){
        engineData.activeFuncs[i].func(engineData.activeFuncs[i].args);
    }
    //console.log(playerData.speed)
    setTimeout(gameEngine, 50);
}

//Initializes application
(function initApp(){
    defineCanvasStyle(c, ctxData.width , ctxData.height);
    drawMenu();
    gameEngine();
})()


//Adds event listener to start game on keydown of Enter button
document.addEventListener('keydown', function(e){
    if(!engineData.gameStarted){
        if(e.keyCode == 13){
            engineData.activeFuncs.push({func: clearCanvas, args: {}});
            gameData.currLevel.push(levelData.level1.map);
            engineData.activeFuncs.push({func: drawLevel, args: {level : gameData.currLevel}});
            engineData.activeFuncs.push({func: drawPlayer, args: playerData});
            engineData.activeFuncs.push({func: movePlayer, args: playerData});
            engineData.activeFuncs.push({func: slowPlayer, args: playerData});
            engineData.activeFuncs.push({func: groundScan, args:[ playerData, gameData.currLevel]});
            engineData.gameStarted = true;
            playerData.alive = true;
            gameEngine();
            document.addEventListener('keydown', function(){changePlayerSpeed(event, playerData, ctxData)})
            document.addEventListener('keyup', function(){revertPlayerSpeed(event, playerData)})
        }
    }
})

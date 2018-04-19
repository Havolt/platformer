let c = document.getElementById('game');
let ctx = c.getContext('2d');

let ctxData = {
    width: 960,
    height: 540
}

let engineData = {
    gameStarted : false,
    activeFuncs : []
}


function defineCanvasStyle(canvasId, width, height){
    canvasId.setAttribute('width', width + 'px');
    canvasId.setAttribute('height', height + 'px');
    canvasId.style.border = "1px solid black";
}

function testFunc1(){console.log('a')};
function testFunc2(){console.log('b')};

function gameEngine(){
    for(let i = 0; i < engineData.activeFuncs.length; i++){
        engineData.activeFuncs[i]();
    }
    //setTimeout(gameEngine, 20);
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
    ctx.fillStyle="#2b67c6";
    ctx.fillRect((ctxData.width /2)-(menuData.buttonWidth /2),(ctxData.height /2)-(menuData.buttonHeight /2) - 20,menuData.buttonWidth, menuData.buttonHeight);
    ctx.fillStyle="#fefefe";
    ctx.font="32px Arial"
    ctx.fillText('PRESS ENTER', (ctxData.width /2)-(menuData.buttonWidth /2) + 14,(ctxData.height /2)-(menuData.buttonHeight /2) + 22);
}


(function initApp(){
    defineCanvasStyle(c, ctxData.width , ctxData.height);
    drawMenu();
    gameEngine();
})()

document.addEventListener('keydown', function(e){
    console.log(e.keyCode)
    if(!engineData.gameStarted){
        if(e.keyCode == 13){
            engineData.activeFuncs.push(testFunc1);
            engineData.activeFuncs.push(testFunc2);
            engineData.gameStarted = true;
            gameEngine();
        }
    }
})

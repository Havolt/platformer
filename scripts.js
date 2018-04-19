let c = document.getElementById('game');
let ctx = c.getContext('2d');

let ctxData = {
    width: 960,
    height: 540
}


function defineCanvasStyle(canvasId, width, height){
    canvasId.setAttribute('width', width + 'px');
    canvasId.setAttribute('height', height + 'px');
    canvasId.style.border = "1px solid black";
}

function gameEngine(){
    
    //setTimeout(gameEngine, 20);
}

function drawMenu(){
    //Create linear gradient
    let menuData ={
        buttonWidth : 210,
        buttonHeight : 75
    }
    let grd = ctx.createLinearGradient(0,0, 0, ctxData.height);
    grd.addColorStop(0, '#3a3a3a');
    grd.addColorStop(1, '#777777');
    ctx.fillStyle=grd;
    ctx.fillRect(0,0, ctxData.width, ctxData.height);
    //Create button
    ctx.strokeStyle='#fefefe';
    ctx.strokeRect((ctxData.width /2)-(menuData.buttonWidth /2),(ctxData.height /2)-(menuData.buttonHeight /2) - 40,menuData.buttonWidth, menuData.buttonHeight)
    ctx.fillStyle="#417dc6";
    ctx.fillRect((ctxData.width /2)-(menuData.buttonWidth /2),(ctxData.height /2)-(menuData.buttonHeight /2) - 40,menuData.buttonWidth, menuData.buttonHeight);
    ctx.fillStyle="#fefefe";
    ctx.font="56px Arial"
    ctx.fillText('START', (ctxData.width /2)-(menuData.buttonWidth /2) + 12,(ctxData.height /2)-(menuData.buttonHeight /2) + 16)
}


(function initApp(){
    console.log('hello');
    defineCanvasStyle(c, ctxData.width , ctxData.height);
    drawMenu();
    gameEngine();
})()
console.log(window.innerWidth)
console.log(window.innerHeight);
const canvas=document.getElementById('canvas');
const ctx = canvas.getContext('2d'); 

console.log(ctx);

const scal=15;
const rows=canvas.height/scal;
const colums=canvas.width/scal;

let snake=[]; 
snake[0]={
    x:(Math.floor(Math.random()* colums))*scal,
    y:(Math.floor(Math.random()* rows))*scal
} 
food={
    x:(Math.floor(Math.random()* colums))*scal,
    y:(Math.floor(Math.random()* rows))*scal

}

let playGame=setInterval(draw,100)

let d="right";
//change diraction
document.onkeydown=diraction;

function diraction(event)
{
    let key=event.keyCode;
    if(key==37 && d!="right")
    {
        d="left";
    }
    if(key==38 && d!="down")
    {
        d="up";
    }
    if(key==39 && d!="left")
    {
        d="right";
    }
    if(key==40 && d!="up")
    {
        d="down";
    }
}
function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    for (let i=0; i<snake.length; i++)
    {
    ctx.fillStyle = "#ff9";
    ctx.strokeStyle="pink";
    ctx.fillRect(snake[i].x,snake[i].y,scal,scal); 
    ctx.strokeRect(snake[i].x,snake[i].y,scal,scal);  

}
//draw food
ctx.fillStyle = "#ff9";
ctx.strokeStyle="bl ack";
ctx.fillRect(food.x,food.y,scal,scal); 
ctx.strokeRect(food.x,food.y,scal,scal);  

    //old hade postion
    let snakex=snake[0].x;
    let snakey=snake[0].y;
    //diraction
    if(d == "left") snakex -= scal;
    if(d == "up") snakey   -= scal;
    if(d == "right") snakex += scal;
    if(d == "down") snakey += scal;

    if(snakex > canvas.width)
    {
        snakex=0;
    }
    
    if(snakey > canvas.height)
    {
        snakey=0;
    }
    
    if(snakex < 0)
    {
        snakex=canvas.width;
    }
    
    if(snakey < 0)
    {
        snakey=canvas.height;
    }
    if(snakex ==food.x && snakey == food.y)
    {
        //score++;
        food ={
            x:(Math.floor(Math.random()* colums))*scal,
            y:(Math.floor(Math.random()* rows))*scal
    }
    }else{
        snake.pop();
        }
    let newHead={
        x:snakex,
        y:snakey
    }
    if(eatSelf(newHead,snake))
    {
        clearInterval(playGame);
        window.alert("GAMEOVER")
    }
    
    snake.unshift(newHead);
}
function eatSelf( head,array){
    for (let i=0;i < array.length;i++)
    {
        if (head.x==array[i].x && head.y== array[i].y)
            return true;
  
    }
    return false;
}

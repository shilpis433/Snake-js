const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d");
//create unit
const box=32;
const move = 32;
//load image
const ground=new Image();

ground.src="img/ground.png";
const foodImg=new Image();
foodImg.src="img/food.png";


//load audio files

const dead=new Audio();
const eat=new Audio();
const up=new Audio();
const left=new Audio();
const right=new Audio();
const down=new Audio();

dead.src="F:\snake game\audio\dead.mp3"
eat.src="F:\snake game\audio\eat.mp3"
// up.src="F:\snake game\audio\up.mp3"
right.src="F:\snake game\audio\right.mp3"
left.src="F:\snake game\audio\left.mp3"
down.sc="F:\snake game\audio\down.mp3"

//create snake
let snake=[];
snake[0]={
  x:9*box,
  y:10*box
}
//create the food
let food={
  x:Math.floor(Math.random()*17+1)*box,
  y:Math.floor(Math.random()*15+3)*box,
}
//create score var
let score=0;
//control the snake
let d;
document.addEventListener("keydown",direction);
function direction(event) {
  if(event.keyCode==37 && d !="RIGHT" ){
    left.play();
    d="LEFT";
  }else if(event.keyCode==38 && d !="DOWN"){
    up.play();
    d="UP";
  }else if(event.keyCode==39 && d !="LEFT"){
    d="RIGHT";
    right.play();
  }else if(event.keyCode==40 && d !="UP"){
    d="DOWN";
    down.play();
  }
}

//check collision function
function collision(head,array) {
  for(let i=0;i<array.length;i++){
    if(head.x==array[i].x && head.y==array[i].y){
      return true;
    }
  }
  return false;
}

//draw everything to canvas
function draw(){
  ctx.drawImage(ground,0,0);
  for(let i=0;i<snake.length;i++){
    ctx.fillStyle=(i==0)?"green":"white";
    ctx.fillRect(snake[i].x,snake[i].y,box,box);

    ctx.strokeStyle="red";
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }
  ctx.drawImage(foodImg,food.x,food.y);

 //old head positon
 let snakeX=snake[0].x;
 let snakeY=snake[0].y;


 //which direction
 if(d=="LEFT") snakeX -= move;
  if(d=="UP") snakeY -= move;
  if(d=="RIGHT") snakeX += move;
  if(d=="DOWN") snakeY += move;

 //if the snake eats the food
 if(snakeX==food.x && snakeY==food.y){
   score++;
   eat.play();
   food={
     x:Math.floor(Math.random()*17+1)*box,
     y:Math.floor(Math.random()*15+3)*box,
   }
   //we don't remove the tail
 }else{
   //remove the tail
   snake.pop();
 }

   //add new head

  let newHead={
    x:snakeX,
    y:snakeY
  }

 //game over
 if(snakeX<box||snakeX>17 * box||snakeY<3*box
 ||snakeY>17*box||collision(newHead,snake)){
   clearInterval(game);
   dead.play();
 }

  snake.unshift(newHead);

  ctx.fillStyle="white";
  ctx.font="45px Change one";
  ctx.fillText(score,2*box,1.6*box);
}
//call draw function every 100 ms

let game=setInterval(draw,100);

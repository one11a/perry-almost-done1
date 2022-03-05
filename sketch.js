var PLAY = 1;
var END = 0;
var gameState = PLAY;

var perry, perry_collided, perry_running;
var runner, runner_running;

var ground, invisibleGround, groundImage;

var obstaclesGroup,obstacle1;
//var backgroundImg;

var score=0;

var restart;

function preload(){
  perry_running = loadAnimation("1.png","2.png","3.png","4.png","5.png")
  runner_running = loadAnimation("runner.png","runner2.png","runner3.png","runner4.png","runner5.png","runner6.png","runner7.png","runner8.png")

  perry_collided = loadImage("perry_collided.png")

  obstacle1 = loadImage("rock.png")

  groundImage = loadImage("ground2.png")

  restartImg = loadImage("restart.png")

  //backgroundImg = loadImage("valley.png")

}

function setup(){
  createCanvas(800,400)

  perry = createSprite(50,200,20,50)

  perry.addAnimation("running", perry_running);
  perry.addAnimation("collided",perry_collided);
  perry.setCollider('circle',0,0,350)
  perry.scale = 0.5
runner = createSprite(50,100,780,50)
runner.addAnimation("running", runner_running)
runner.setCollider('circle',0,0,350)
runner.scale = 0.5

  invisibleGround = createSprite(width/2,height-10,width,125)
  invisibleGround.shapeColor = "black";

  ground = createSprite(width,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2;
  ground.velocityX = -(6 + 3*score/100);

  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg)

  restart.scale = 0.1

  restart.visible = false;

  obstaclesGroup = new Group();
  score=0

}

function draw(){
  //background(backgrondImg);
  textSize(20);
fill("black")
text("Score: ")+ score,30,50;

if(gameState===PLAY){

  score = score+Math.round(getFrameRate()/60);
  ground.velocityX = -(6+3*score/100)

  if((touches.length > 0 || keyDown("SPACE")) && perry.y >=height-120){

    perry.velocityY = -10;
    touches=[];
  }
perry.velocityY=perry.velocityY+0.8

if(ground.x<0){
  ground.x=ground.width/2;
}

perry.collide(invisibleGround)
spawnObstacles();

if(obstaclesGroup.isTouching(perry)){
  gameState = END;
 }
}

else if (gameState === END) {
  restart.visible = true;

  ground.velocityX = 0
  perry.velocityY=0
  obstaclesGroup.setVelocityXEach(0)

  perry.changeAnimation("collided",perry_collided);

  obstaclesGroup.setLifetimeEach(-1)

  if(touches.length>0 || keyDown("SPACE")) {
    reset();
    touches=[]
  }
  
}

drawSprites();

}

function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle1 = createSprite(600,height-95,20,30);
    obstacle1.setCollider('circle',0,0,45)
    obstacle1.debug = true
  
    obstacle1.velocityX = -(6 + 3*score/100); 
        
    obstacle1.scale = 0.3;
    obstacle1.lifetime = 300;
    obstacle1.depth = perry.depth;
    perry.depth +=1;
   
    obstaclesGroup.add(obstacle1);
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  
  obstacleGroup.destroyEach();

  
  perry.changeAnimation("running",perry_running);
  
  score = 0;
  
}

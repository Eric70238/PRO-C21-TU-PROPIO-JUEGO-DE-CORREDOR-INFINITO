var bird, bird_flying,bird_collided;
var ground,groundImg;
var obstacle1,obstacle2,obstacle1Img,obstacle2Img;
var backroundImg;
var jumpSound, collidedSound;
var sun, sunImg
var gameState=PLAY;
var gameOver,gameOverImg;
var restart, restartImg;
var PLAY = 1;
var END = 0;
var score = 0;

function preload(){
jumpSound = loadSound("jumpSound.mp3")
collidedSound = loadSound("collidedSound.mp3")
backroundImg = loadImage("backroundImg.png")
sunImg = loadImage("sun.png")
bird_flying = loadAnimation("bird1.png","bird2.png","bird3.png")
bird_collided = loadAnimation("bird1.png")
groundImg = loadImage("ground.png")
obstacle1Img = loadImage("obstacle1")
obstacle2Img = loadImage("obstacle2")
gameOverImg = loadImage("gameOverImg.png")
restartImg = loadImage("restart.png")
}

function setup() {
 createCanvas(windowWidth,WindowHeight);
 bird = createSprite(Heigh/2,80,60,70);
 bird.addAnimation(bird_flying);
 bird.addAnimation(bird_collided);
 bird.setColider("circle",0,0,350);
 bird.debug=true;
 bird.scale=1;
 ground = createSprite(0,0,width,120);
 ground.addImage(groundImg);
 ground.x=width/6;
 gameOver = createSprite(width/2,height/2+100);
 gameOver.addImage(gameOverImg);
 gameOver.scale=1;
 gameOver.visible = false;
 restart = createSprite(width/2,height/2);
 restart.addImage(restartImg);
 restart.scale=1;
 restart.visible = false;
 obstacle1.addImage(obstacle1Img);
 obstacle2.addImage(obstacle2Img);
 obstaclesGroup = new Group();
}

function draw() {
 background(backroundImg)
 textSize(100);
 fill("black");
 text(score,width/2,heigth+30);
 if (gameState===PLAY){
     score = score+Math.round(getFrameRate()/200);
     ground.velocityX=-6;
     if (touches.length>0 || keyDown("SPACE")){
         jumpSound.play()
         bird.velocityY=-10;
         touches=[];
     }
     bird.velocityY=bird.velocityY+1;
     if(ground.x < 0){
         ground.x=ground.width/2;
     }
     bird.collide(ground);
     spawnObstacles();
     if(obstaclesGroup.isTouching(bird)){
         collidedSound.play()
         gameState=END;
     }
 }
 else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    bird.velocityY=0;
    bird.changeAnimation(bird_collided);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifeTimeEach(-1);
    if(touches.length>0 || keyDown("SPACE")) {      
        reset();
        touches = [];
      }
 }
 drawSprites();
}
function spawnObstacles(){
    if (frameCount % 200===0){
     obstacle1.velocityX=-6;
     obstacle2.velocityX=-6;
     var rand = Math.round(random(1,3));
     switch(rand){
          case 1: var obstacle1=createSprite(width+10,0,40,150)
          var obstacle2=createSprite(width+10,heigth,40,150)
          break;
          case 2:var obstacle1=createSprite(width+10,0,40,200)
          var obstacle2=createSprite(width+10,heigth,40,100)
          break;
          case 3:var obstacle1=createSprite(width+10,0,40,100)
          var obstacle2=createSprite(width+10,heigth,40,200)
          break;
          default: break;
     }
     obstacle1.scale=1;
     obstacle2.scale=1;
     obstacle1.lifetime=400;
     obstacle2.lifetime=400;
     obstacle1.depth = bird.depth;
     obstacle2.depth = bird.depth;
     bird.depth +=1;
     obstaclesGroup.add(obstacle1);
     obstaclesGroup.add(obstacle2);
 }
}
function reset(){
     gameState = PLAY;
     gameOver.visible = false;
     restart.visible = false;
     obstaclesGroup.destroyEach();
     bird.changeAnimation(bird_flying);
     score = 0;
}
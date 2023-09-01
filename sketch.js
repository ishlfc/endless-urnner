var forest, forestImg;
var lion, lionImg;
var tree, treeImg;
var log, logImg;
var invisibleGround;
var gameover,gameoverImg;
var logsGroup;
var treeGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload(){
  forestImg = loadImage("ccc.png");
  treeImg = loadImage("tree.png");
  lionImg = loadAnimation("lion1.png", "lion2.png");
  logImg = loadImage("log.png");
  gameoverImg = loadImage("gameover.png");
}

function setup() {
  createCanvas(300,700);

  forest = createSprite(150,200,500,500);
  forest.addImage("forest",forestImg);
  forest.velocityX = -2;
  forest.scale = 1;

  lion = createSprite(40,305, 60,30);
  lion.addAnimation("lion running", lionImg);
  lion.scale = 0.075;

  logsGroup = new Group();
  treeGroup = new Group();

 //gameover.addImage("game",gameoverImg);


  invisibleGround = createSprite (40, 325, 500,20);
  invisibleGround.visible = false;
  invisibleGround.debug = true;

  score = 0;

}

function draw() {
  background(250);

  text.depth = forest.depth;
  text.depth += 1;
  text("Score: "+ score, 250,400);


  if( gameState === PLAY) {
    score = score + Math.round(frameCount/60);
    
    if(forest.x < 100){
      forest.x = 200;
    }
  
    if(keyDown("SPACE") && lion.y >= 300 ) {
      lion.velocityY = -16;
    }
  
    lion.velocityY = lion.velocityY + 0.8;

    if(forest.x < 100){
      forest.x = 200;
    }
  
  /*  if(keyDown("SPACE") && lion.y >= 300 ) {
      lion.velocityY = -10;
    }*/
  
    lion.velocityY = lion.velocityY + 0.8;
  

  
    spawnTrees();

    if(logsGroup.isTouching(lion)){
     gameState = END;
     
  }


  }

  else if (gameState === END) {
    console.log("hey")
 //     gameOver.visible = true;
     
      forest.velocityX = 0;
      lion.velocityY = 0
     
      //set lifetime of the game objects so that they are never destroyed
    treeGroup.setLifetimeEach(-1);
    logsGroup.setLifetimeEach(-1);
     
     treeGroup.setVelocityXEach(0);
     logsGroup.setVelocityXEach(0); 
  }


  lion.collide(invisibleGround);





 drawSprites();
  }

function spawnTrees() {
  if(frameCount % 120 === 0) {
   tree = createSprite(350, 255);
    
    tree.x = Math.round(random(350,450));

    tree.addImage(treeImg);

    tree.velocityX = -2;

    tree.scale = 0.3;

    tree.liftime = 700;

    treeGroup.add(tree);
  }
  
  if(frameCount % 80 === 0) {
    log = createSprite(300, 310);
     
 //    log.x = Math.round(random(350,450));
 
     log.addImage(logImg);
 
     log.velocityX = -5;
 
     log.scale = 0.03;

     log.lifetime = 700;

     logsGroup.add(log);
   }


}






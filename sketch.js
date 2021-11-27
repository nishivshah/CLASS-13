var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obsimg; obsimg2; obsimg3; obsimg4; obsimg5; obsimg6;
var cloud, cloudsGroup, cloudImage;
var obsgrp
var newImage;
var gamestate = "start";
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  obsimg = loadImage("obstacle1.png");
  obsimg2 = loadImage("obstacle2.png");
  obsimg3 = loadImage("obstacle3.png");
  obsimg4 = loadImage("obstacle4.png");
  obsimg5 = loadImage("obstacle5.png");
  obsimg6 = loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  
}

function setup() {
  gamestate = "start";
  createCanvas(600, 200);
  cloudsGroup = new Group();

  obsgrp = new Group();
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //console.log("Hello"+ 5)
  
  var student = {
    name: "nishi",
    class: 9,
    fav_sub: "english",
    age: 14,
    marks: [10,20,30,40,50]
    

  };
  console.log(student);
  console.log(student.fav_sub);
  console.log(student.class);
  console.log(student.marks[3]);
}

function draw() {
  background(180);
  console.log(gamestate);
  
  if (gamestate == "start"){
    if (keyDown(ENTER)){
       gamestate = "play";
 }
  }
  else if (gamestate == "play"){
    ground.velocityX = -4;
    spawnClouds();
  spawnobstacles();
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8
    trex.collide(invisibleGround);
    if (obsgrp.isTouching(trex)){
      trex.changeAnimation("collided");
      console.log("gameover");
      gamestate = "end";
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
     
      
      
    }
  }
  else if (gamestate == "end"){
  console.log("GAMEOVER");
  ground.velocityX = 0;
  cloudsGroup.setVelocityXEach(0);
  obsgrp.setVelocityXEach(0);
  }

  
  
  //spawn the clouds
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloudsGroup.add(cloud);

    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

function spawnobstacles(){
  
  
  if (frameCount%100 == 0){
    
    var obstacle = createSprite(600,165,15,50);
    obsgrp.add(obstacle);
  
    obstacle.velocityX = -4;
    obstacle.scale = 0.5;
    obstacle.lifetime = 160;
  var randomNumber = Math.round(random(1,7))
  switch(randomNumber){
     case 1:
      obstacle.addImage(obsimg);
      break;
     case 2:
        obstacle.addImage(obsimg2);
        break;
     case 3:
        obstacle.addImage(obsimg3);
        break;
      case 4:
        obstacle.addImage(obsimg4);
        break;
      case 5:
        obstacle.addImage(obsimg5);
        break;
      case 6:
        obstacle.addImage(obsimg6);
        break;
      default:
        obstacle.addImage(obsimg);

  }

  }

}

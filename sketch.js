var monster, fruit1,fruit1Image,fruit2,fruit3,fruit4, sword, gameOver, gameOverSound, gameOverImage, fruit2Image,fruit3Image,fruit4Image, monsterAnimation;
var PLAY = 1
var END = 0
var gameState = 1
var score = 0

function preload(){
  monsterAnimation = loadAnimation("alien1.png","alien2.png")
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  swordImage = loadImage("sword.png") 
  gameOverImage = loadImage("gameover.png")
  gameOverSound = loadSound("gameover.mp3")
knifeSwooshSound =loadSound("knifeSwooshSound.mp3")
}
function setup(){
  createCanvas(450,450)
  sword = createSprite(40,200,20,20)
  sword.addImage(swordImage)
  sword.scale = 0.7
  fruitsGroup = createGroup()
  enemyGroup = createGroup()
  score = 0;
}


function draw(){
  background("lightblue")
  text("Score:"+score,370,50)
  if(gameState === PLAY){
  sword.y = World.mouseY
  sword.x = World.mouseX
   fruits();
  enemy();
  if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach()
    knifeSwooshSound.play()
    
    score = score+2
  }
  else {
    if(enemyGroup.isTouching(sword)){
      gameState=END;
      gameOverSound.play()
      fruitsGroup.destroyEach();
                                     enemyGroup.destroyEach();
                                     fruitsGroup.setVelocityXEach(0);
                                     enemyGroup.setVelocityXEach(0);
                                     sword.addImage(gameOverImage);
                                     sword.x=225; 
                                     sword.y=225; 
 } 
  }
  }  
  if(score>0 && score%4===0){
    fruitsGroup.setVelocityXEach(-11)
  }
drawSprites()
}
function fruits(){
if(World.frameCount%80===0){
 fruit = createSprite(400,200,20,20)
fruit.scale = 0.2
fruit.debug = false
r = Math.round(random(1,4))
if(r==1){
  fruit.addImage(fruit1Image) 
} else if(r==2){
  fruit.addImage(fruit2Image)
} else if(r==3){
  fruit.addImage(fruit3Image)
} else if(r==4){
  fruit.addImage(fruit4Image)
}
fruit.y = Math.round(random(50,340))
fruit.velocityX = -7
fruit.setLifetime = 100
fruitsGroup.add(fruit)
  position = Math.round(random(1,2))
  if(position==1)
    {
      fruit.x = 400
      fruit.velocityX = -(7+(score/4))
    }
  else
    {
      if(position==2){
        fruit.x = 0
        fruit.velocityX = (7+(score/4))
      }
    }
}
}
function enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20)
    monster.addAnimation("moving",monsterAnimation)
    monster.y = Math.round(random(100,300))
    monster.velocityX = -(8+(score/10))
    monster.setLifetime = 50
    enemyGroup.add(monster)
  }
}
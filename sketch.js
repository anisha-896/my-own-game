var monster,monsterimg,jail,jailimg,virus,virusimg,maze,jaildoor,jaildoorimg
var palace1,palace1img,palace2,palace2img,rocket,rocketimg,rocketmoving,rocketmovingimg
var space1,space1img,space2,space2img,space3,space3img,space4,space4img,space5,space5img
var gamestate="serve"
var counter=0

function preload() {
  monsterimg=loadImage("images/monster3.png")
  jailimg=loadImage("images/jail.jpg")
  virusimg=loadImage("images/virus.png")
  jaildoorimg=loadImage("images/jail2door.jpg")
  bgmusic=loadSound("images/gamelevel.wav")
  virusmusic=loadSound("images/drums.wav")
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  scene=createSprite(400,height/2,1500,1500)
  scene.addImage(jailimg)
  scene.scale=1.9
  monster=createSprite(400, 590, 50, 50);
  monster.addImage(monsterimg)
  monster.scale=0.4
  ground=createSprite(400,600,width,40)
  ground.x=ground.width/2
  ground.visible=false
  scene.x=scene.width/2
  virusgroup=new Group()
  gameover=createSprite(400,height/2,1500,1500)
  gameover.addImage(jaildoorimg)
  gameover.visible=false
  gameover.scale=2.5
  bgmusic.play()
}

function draw() {
  background(255,255,255);
  
    if(keyDown("UP_ARROW")){
      gamestate="play"
      
    }
    if(gamestate==="play"){
      
      gameover.visible=false
      //monster.velocityX=3
      ground.velocityX=-2
      scene.velocityX=-2
      spawnvirus()
      if(scene.x<0){
        scene.x=scene.width/2
      }
      if(ground.x<0){
        ground.x=ground.width/2
      }
    if(keyDown("space")){
      monster.velocityY=-10
      

    }
    monster.velocityY=monster.velocityY+0.8
    for (var i = 0; i < virusgroup.length; i++) {
			if (virusgroup.get(i).isTouching(monster)) {
				virusgroup.get(i).destroy();
				counter+=1
        virusmusic.play()
			}
		}

    if(counter>10){
      gamestate="end"
     
    }
    
   
    }
    drawSprites();
    if(gamestate==="end"){
      gameover.visible=true
      monster.velocityX=0
      ground.velocityX=0
      scene.velocityX=0
      virusgroup.setVelocityEach(0)
      virusgroup.destroyEach()
      textSize(30)
      fill("red")
      text("GAME OVER",width/2,height/2)
    }
    monster.collide(ground)
 
    if(gamestate==="serve"){
      fill("black")
      textSize(20)
      text("PRESS UP ARROW TO RELEASE THE MONSTER",200,100)
    }
 
 // text(counter,200,200)
}

function spawnvirus() {
  if(frameCount % 100===0){
  var virus=createSprite(Math.round(random(10,1500)),Math.round(random(10,1500)),5,5)
  virus.velocityX=Math.round(random(-2,-8))
  virus.addImage(virusimg)
  virus.scale=0.5
 
  virus.lifetime=200
  virusgroup.add(virus)
  }
}
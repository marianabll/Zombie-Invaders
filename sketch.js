var bg, cover;
var edges;
var player, playerImg, player_shooting;
var fence, fenceImg
var zombie, zombieImg;
var zombie2, zombie2Img;
var zombie3, zombie3Img, zombies;
var bullet, bullets;
var shootingSound, zombieMusic;
var gameState = 0;

function preload(){
  cover = loadImage("./assets/capa.png")
  bg = loadImage("./assets/bg.png")
  fenceImg = loadImage("./assets/fence.png")
  player_shooting = loadImage("./assets/player_shooting.png")
  playerImg = loadImage("./assets/player.png")
  zombieImg = loadAnimation("./assets/zumbi1.png","./assets/zumbi2.png")
  zombie2Img = loadAnimation("./assets/zumbi_amarelo1.png","./assets/zumbi_amarelo2.png")
  zombie3Img = loadAnimation("./assets/zumbi_azul.png","./assets/zumbi_azul2.png")

  shootingSound = loadSound("assets/shoot.mp3");
  zombieMusic = loadSound("assets/zombie_music.wav");
}

function setup() {
  createCanvas(700, 700);

  edges = createEdgeSprites()

  player = createSprite(350,650)
  player.addImage(playerImg)
  player.scale = 1.5
  
  fence = createSprite(350,500)
  fence.addImage(fenceImg)
  fence.scale = 0.5

  bullets = new Group()
  zombies = new Group()
}

function draw() {

  if (gameState === 0) {
    background(cover);
    zombieMusic.setVolume(0.05);
    zombieMusic.play();
    fence.visible = false;
    player.visible = false;


    if(keyDown('enter')) {
      gameState = 1
    }
  } else if (gameState === 1) {
    background(bg);
    zombieMusic.stop()
    fence.visible = true;
    player.visible = true;

    criarZumbis1();
  }

  
  player.collide(edges)
  player.collide(fence)
  zombies.collide(fence)

 if(keyWentDown('space')){
  player.addImage(player_shooting)
  shootingSound.play()
  
  bullet = createSprite(player.x+22, player.y-35, 5,10);
  bullet.shapeColor = "yellow"
  bullet.velocityY = -10;
  bullet.lifetime = 400;
  bullets.add(bullet)
 }

 if(keyWentUp('space')){
  player.addImage(playerImg)
 }

if(keyDown('w')){
  player.y -= 10
}

if(keyDown('s')){
  player.y += 10
}

if(keyDown('a')){
  player.x -= 10
}

if(keyDown('d')){
  player.x += 10
}


  drawSprites();
}


function criarZumbis1() {
  if(frameCount % 100 === 0){

    zombie = createSprite(random(50,width-50),0,20,20)
    zombie.addAnimation("zombie1", zombieImg)
    zombie.velocityY = 3
   
    zombie.lifetime = 400
    zombies.add(zombie)
  }
}

//Starting File
var canvas;
var Play = 1;
var End = 0;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine,world;
var ground;
var rocket,sky,rocket_img,bg_space;
var umb_li,umb_l;
var rocketfire_img;
var gameState = Play;
var distance = 0;
var r_launch;
var earth2,launch_base;
var mGroup,SGroup,pGroup,paGroup,mimg;
var r_crash,earth_outer,space_boundary;
var sat2;
var ds,p1,p2;
var p_name,pa;
var b1,b2;
var gp,esc_vel,fuel = 10000,fp;
var b1,b2,s;

function preload()
{
   sky = loadImage("images/blue sky.jpeg");
   rocket_img = loadImage("images/saturn_v_lauch.png");
   rocketfire_img = loadImage("images/saturn_v_lauch.png");
   bg_space = loadImage("images/earth1.jpg");
   earth2 = loadImage("images/space.jpg");
   launch_base = loadImage("images/lb.jpg");
   mimg = loadImage("images/debrie_4.png");
   r_crash = loadImage("images/e.png");
   earth_outer = loadImage("images/exo.jpg");
   space_boundary = loadImage("images/space 1.jpg");
   sat2 = loadImage("images/sat2.png");
   ds = loadImage("images/debrie 1.png");
   p1 = loadImage("images/debrie 2.jpg");
   p2 = loadImage("images/debrie_3.png");
   s = loadImage("images/sea.png");
}

function setup() {
  p_name = prompt("Enter name");
  pa = createP("Welcome " + p_name);
  pa.style('color','yellow');
  pa.style('background-color','black');
  pa.style('text-align','center');
  pa.style('font-size','30px');
  pa.style('font-family','Arial','sans-serif');
  pa.style('font-weight','bold');
  esc_vel = createSlider(5,30,15);
  b2 = createButton('Abort Mission');
  b2.style('color','white');
  b2.style('background-color','black');
	canvas = createCanvas(displayWidth,displayHeight-170);
	engine = Engine.create();
	world = engine.world;

  rocket = createSprite(870,460,80,80);
  rocket.addImage(rocket_img);
  rocket.scale = 0.1;

  ground = createSprite(0,rocket.y + 400,6000,2);
  ground.visible = false;

  mGroup = createGroup();
  SGroup = createGroup();
  pGroup = createGroup();
  paGroup = createGroup();

  rocket.setCollider("rectangle",0,0,50,130);
  rocket.debug = false;

	Engine.run(engine);
}

function am()
{
  gameState = End;
}

function draw() {
  background(0);
  image(launch_base, 0,-displayHeight*4 ,displayWidth, displayHeight*5);

  camera.position.x = displayWidth/2;
  camera.position.y = rocket.y;

  if (frameCount >= 0 && frameCount <= 200)
  {
    background(0);
    fill('white');
    textSize(40);
    text("Your Mission\n",(displayWidth / 2) - 100,(displayHeight / 2) - 200);
    text("Reach Moon within the provided fuel limit",(displayWidth / 2) - 100,(displayHeight / 2) - 100);
    text("We are counting on YOU!",(displayWidth / 2) - 100,(displayHeight / 2));
    text("The escape velocity from\nEarth's surface is about 40,270 km/h",(displayWidth / 2) - 100,(displayHeight / 2) + 100);
    text("Distance between Earth and Moon: 384,400 km",(displayWidth / 2) - 100,(displayHeight / 2) + 50);
    rocket.visible = false;
  }

  if (frameCount >= 200)
  {
    rocket.visible = true;
  if (gameState === Play)
  {  
    b2.mousePressed(am);
    console.log(fuel);
    if (keyDown('up_arrow'))
    {
      distance += 10;
      rocket.addImage(rocketfire_img);
      rocket.scale = 0.1;
      rocket.y -= esc_vel.value();
      fuel -= esc_vel.value();
    }
    else
    {
      if (distance >= 0)
      {
        rocket.y += 30;
        distance -= esc_vel.value();
      }
    }
    if (rocket.y <= 460)
    {
      rocket.addImage(r_crash);
    }
    console.log(rocket.x,rocket.y);
   if (keyDown('left_arrow'))
    {
      rocket.addImage(rocketfire_img);
      rocket.scale = 2;
      rocket.x -= 30;
    }
   else if (keyDown('right_arrow'))
    {
      rocket.addImage(rocketfire_img);
      rocket.scale = 2;
      rocket.x += 30;
    }
    else
    {
      rocket.addImage(rocket_img);
      rocket.scale = 2;
    }
    if (fuel <= 0)
    {
      gameState = End;
    }

    if (distance < 3080 && distance >= 1)
    {
      image(sky, 0,-displayHeight*10,displayWidth, displayHeight*30);
      if (distance >= 0 && distance <= 1500)
      {
          fill('yellow');
          textSize(20);
          text("Rocket is in Troposhere: the lowest region of the Earth atmosphere",rocket.x,rocket.y - 100);
      }
      else if (distance > 1500 && distance < 3000)
      {
          fill('yellow');
          textSize(20);
          text("Rocket is in Stratosphere: second major layer of Earth atmosphere",rocket.x,rocket.y - 100);
      }
    }
    else if (distance >= 3000 && distance < 4500)
    {
      image(bg_space, 0,-displayHeight*40,displayWidth, displayHeight*40);
      if (distance >= 3000)
      {
        rocket.addImage(sat2);
        rocket.scale = 0.5;
      }
     if (rocket.y <= 3000)
     {
       rocket.addImage(sat2);
     }
      fill('yellow');
      textSize(20);
      text("Rocket is in mesosphere: third layer of atmosphere, temperature decreases as altitude increases",rocket.x,rocket.y - 100);
      fill('red');
      text("METEROITE COLLISION ALERT", rocket.x - 150, rocket.y + 300);
      spawn_checker();
    }
    else if (distance < 5500 && distance >= 4500)
    {
      image(earth_outer, 0,-displayHeight*50,displayWidth, displayHeight*50);
      rocket.addImage(sat2);
      rocket.scale = 0.5;
      textSize(20);
      fill('red');
      text("DEBRIES COLLISION ALERT", rocket.x - 150, rocket.y + 300);
      if (distance > 4500 && distance < 5000)
      {
          fill('yellow');
          textSize(20);
          text("Rocket is in thermosphere: here, ultraviolet radiation causes photoionization",rocket.x,rocket.y - 100);
      }
      spawn_checker();
    }
    else if (distance < 7000 && distance >= 5500)
    {
      image(earth2, 0,-displayHeight*80,displayWidth, displayHeight*80);
      rocket.addImage(sat2);
      rocket.scale = 0.5;
      textSize(20);
      fill('red');
      text("DEBRIES COLLISION ALERT", rocket.x - 150, rocket.y + 300);
      fill('yellow');
      textSize(20);
      text("Rocket is in exosphere: here there is no air to breathe, its very cold.",rocket.x,rocket.y - 100);
      spawn_checker();
    }
    else if (distance < 10000 && distance >= 7000)
    {
      image(space_boundary, 0,-displayHeight*200,displayWidth, displayHeight*200);
      rocket.addImage(sat2);
      rocket.scale = 0.5;
      textSize(20);
      fill('red');
      text("METEROITES COLLISION ALERT", rocket.x - 150, rocket.y + 300);
      spawn_checker();
    }
    //Put here
    if (distance >= 0 && distance < 9)
    { 
      b1 = createA('./part2.html','Continue to Moon');
      b1.style('color','white');
      b1.style('background-color','black');
      b1.position(rocket.x,rocket.y);
    }
    fill('white');
    textSize(20);
    text("Fuel: " + fuel,rocket.x,rocket.y);
  }
}

   if (rocket.isTouching(ground))
   {
      gameState = End;
   }

  if (mGroup.isTouching(rocket))
      {
        gameState = End;
      }
  else if (SGroup.isTouching(rocket))
  {
    gameState = End;
  }
  else if (pGroup.isTouching(rocket))
  {
    gameState = End;
  }
  else if (paGroup.isTouching(rocket))
  {
    gameState = End;
  }

  if (gameState === End)
  {
     background(0);
     background(s);
     mGroup.destroyEach();
     SGroup.destroyEach();
     pGroup.destroyEach();
     paGroup.destroyEach();
     textSize(40);
     fill('white');
     text("Game Over",(displayWidth / 2) - 50,(displayHeight / 2) - 50);
     rocket.addImage(r_crash);
     rocket.scale = 1;
    console.log("Game Ended");
  }
 
  drawSprites();
 
}

function spawn_checker()
{
  if (frameCount % 70 === 0)
  {
    var rand = Math.round(random(1,4));
    switch(rand)
    {
      case 1: spawnM();
      break;
      case 2: spawnS();
      break;
      case 3: spawnp();
      break;
      case 4: spawnpa();
      break;
      default: break;
    }
}
}

function spawnM()
{
      var meteorite = createSprite(random(1,1200),rocket.y - 300,10,40);
      meteorite.addImage(mimg);
      meteorite.velocityY = 10  ;
           
       meteorite.scale = 0.5;
       meteorite.lifetime = 300;

       mGroup.add(meteorite);
}

function spawnS()
{
      var debsat = createSprite(random(1,1200),rocket.y - 300,10,40);
      debsat.addImage(ds);
      debsat.velocityY = 10;
           
      debsat.scale = 0.5;
      debsat.lifetime = 300;

      SGroup.add(debsat);
}

function spawnp()
{
      var p = createSprite(random(1,1200),rocket.y - 300,10,40);
      p.addImage(p1);
      p.velocityY = 10;
           
      p.scale = 0.5;
      p.lifetime = 300;

       pGroup.add(p);
}

function spawnpa()
{
      var pa = createSprite(random(1,1200),rocket.y - 300,10,40);
      pa.addImage(p2);
      pa.velocityY = 10;
           
      pa.scale = 0.5;
      pa.lifetime = 300;

      paGroup.add(pa);
}
var Play = 1;
var end = 0;
var gameState = Play;
var moon,player,lani,lanb,rover_img,rover,moon2;
var rover_left,rover_right,flagi,flags,mwa,mwai;
var battery = 121,counter = 0;

function preload()
{
    moon = loadImage("images/m1.png");
    moon2 = loadImage("images/m2.png");
    lani = loadImage("images/lander_img.png");
    lanb = loadImage("images/lander_broken.png");
    rover_img = loadImage("images/rover_upper.png");
    rover_right = loadImage("images/rover_right.png");
    rover_left = loadImage("images/rover_l.png");
    flagi = loadImage("images/flag.png");
    mwai = loadImage("images/mw.png");
}

function setup()
{
    createCanvas(displayWidth,displayHeight);

    player = createSprite(displayWidth/2,(displayHeight/2) + 150,30,30);
    player.addImage(lani);
    player.scale = 5;

    rover = createSprite(player.x - 20,player.y,30,30);
    rover.addImage(rover_img);
    rover.scale = 0.2;
    rover.visible = false;

    flags = createSprite(rover.x,rover.y,30,30);
    flags.visible = false;
    mwa = createSprite(1105,-2094,80,80);
    mwa.addImage(mwai);
    mwa.scale = 0.5;

}

function draw()
{
    background(0);
    image(moon, 0,-displayHeight*4,displayWidth, displayHeight*5);

    console.log(mouseX,mouseY);
    console.log(rover.x,rover.y);

    if (gameState === Play)
    {
        textSize(30);
        strokeWeight(2);
        stroke('black');
        fill('white');
        text("Orbiter Camera View",(displayWidth/2) - 750,(displayHeight/2) + 250);
        if (frameCount >=1 && frameCount <= 300)
        {
            textSize(30);
            strokeWeight(2);
            stroke('black');
            fill('white');
            text("Press Space key to decent Lander!",28,53);
        }
        if (player.scale > 0.199)
        {
                if (keyDown("space"))
                {
                    player.scale -= 0.03;
                }
                if (keyDown('right_arrow'))
                {
                    player.x += 5;
                }
                else if (keyDown('left_arrow'))
                {
                    player.x -= 5;
                }
                else if (keyDown('up_arrow'))
                {
                    player.y -= 5;
                }
                else if (keyDown('down_arrow'))
                {
                    player.y += 5;
                }
       }
       if (player.scale <= 5 && player.scale > 0.199)
        {
            textSize(20);
            strokeWeight(2);
            stroke('black');
            fill('white');
            text("X: " + player.x,33,77);
            text("Y: " + player.y,33,105);
            text("Target X: 568",33,135);
            text("Target Y: 581",33,165);
            fill('red');
            ellipseMode(CENTER);
            ellipse(570,587,30);
            textSize(30);
            strokeWeight(2);
            stroke('black');
            fill('yellow');
            text("Land in the marked area",(displayWidth/2) - 750,(displayHeight/2) - 100);
        }
        if (player.scale <= 0.199 && (player.x < 560 || player.x > 595) && (player.y < 580 || player.y > 590))
        {
           player.addImage(lanb);
           gameState = end;
        }
        else if (player.scale <= 0.199 && (player.x >= 560 && player.x <= 595) && (player.y >= 580 && player.y <= 590))
        {
                if (keyDown('space'))
                {
                    rover.visible = true;
                    rover.x = player.x - 50;
                    rover.y = player.y;
                }
            rover.scale = 0.1;
            if (rover.visible == true)
            {
                camera.position.x = rover.x;
                camera.position.y = rover.y;
                if (frameCount % 2 === 0)
                {
                    fill('yellow');
                    textSize(20);
                    text("Search for Water on Moon",player.x + 30,player.y);
                }
                if (rover.isTouching(mwa))
                {
                   fill('white');
                   textSize(20);
                   text("Press 'd' to deploy Flag",rover.x,rover.y + 50);
                   if (keyDown("d"))
                   {
                       flags.visible = true;
                       flags.addImage(flagi);
                       flags.scale = 0.4;
                       flags.x = rover.x;
                       flags.y = rover.y;
                   }
                }
                if (keyDown('down_arrow'))
                {
                    rover.addImage(rover_img);
                    rover.scale = 0.1;
                    rover.y += 2;
                    battery -= 0.05;
                }
                else if (keyDown('up_arrow'))
                {
                    rover.addImage(rover_img);
                    rover.scale = 0.1;
                    rover.y -= 2;
                    battery -= 0.05;
                }
                else if (keyDown('right_arrow'))
                {
                    rover.addImage(rover_right);
                    rover.scale = 0.1;
                    rover.x += 2;
                    battery -= 0.05;
                }
                else if (keyDown('left_arrow'))
                {
                    rover.addImage(rover_left);
                    rover.scale = 0.1;
                    rover.x -= 2;
                    battery -= 0.05;
                }
            }
            if (rover.x > displayWidth)
            {
                rover.x = rover.x - 200;
            }
            if (rover.x < 0)
            {
                rover.x = rover.x + 200;
            }
            if (flags.visible == true)
            {
                fill('white');
                textSize(50);
                text("CONGRATULATIONS!\nYou Did It!\n Mission Successful!\nAnother Realm opens for\nHumanity", rover.x,rover.y);
            }
            rover.depth = mwa.depth;
            rover.depth += rover.depth;
            fill('white');
            textSize(20);
            text("Battery: " + Math.round(battery) + " Ah",rover.x + 30,rover.y);
            if (battery <= 45)
            {
                fill('red');
                textSize(20);
                text("Return to lander to charge rover!",rover.x,rover.y + 60);
            }
            if (battery <= 0)
            {
                gameState = end;
            }
            if (rover.isTouching(player))
            {
                battery += 0.09;
                if (battery >= 121)
                {
                    battery = 121;
                }
            }
        }
    }

    if (gameState === end)
    {
        fill('white');
        textSize(30);
        textSize(30);
        strokeWeight(2);
        stroke('black');
        fill('yellow');
        text("Lost Contact with Lander",(displayWidth/2),(displayHeight/2));
        text("Mission Failed! Game Over!",player.x,player.y - 100);
    }

    drawSprites();
}
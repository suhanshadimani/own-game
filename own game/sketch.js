
var gameState = "PLAY";

var airBalloon,airBalloonImg;
var bird,birdAni;
var meteor,meteorImg;
var colorBall;
var canvas,bg,bgImg;
var edges;
var birdsGroup;
var life = 3;

function preload(){
    birdAni = loadAnimation("images/bird_1.png","images/bird_2.png","images/bird_3.png");
    airBalloonImg = loadImage("images/parachute.png");
    bgImg = loadImage("images/bg.jpg");
    meteorImg = loadImage("images/rdy meteor.png")


}

function setup(){
    canvas = createCanvas(800,700);
    edges = createEdgeSprites();

    bg = createSprite(400,350);
    bgImg.resize(1200,1400);
    bg.addImage(bgImg);
    bg.velocityY = 2;
    
    airBalloon = createSprite(400,620);
    airBalloon.scale = 0.3;
    airBalloon.addImage(airBalloonImg);
        
    birdsGroup = new Group();
    meteorsGroup = new Group();

}

function draw(){
    background(210);

    if(gameState === "PLAY"){
        if(bg.y > 700){
            bg.y = 0;
        }

        if(keyDown(LEFT_ARROW)){
            airBalloon.x = airBalloon.x - 10;
        }
        if(keyDown(RIGHT_ARROW)){
            airBalloon.x = airBalloon.x + 10;
        }
        if(keyDown(UP_ARROW)){
            airBalloon.y = airBalloon.y - 10;
        }
        if(keyDown(DOWN_ARROW)){
            airBalloon.y = airBalloon.y + 10;
        }

        for(var i = 0; i < birdsGroup.length; i++){
            if(birdsGroup.get(i).isTouching(airBalloon)){
                birdsGroup.get(i).destroy();
                life = life -1;

            }
        }
        if(life < 1 ){
            gameState = "END"
        }

        spownMeteor();
        spownBird();
        drawSprites();

    }
    
    if(gameState === "END") {
        text("GAME OVER",400,350)
        meteorsGroup

    }
    

    
    airBalloon.collide(edges);

    

    

   
    
    
    
    text("lives: "+life,10,10);
}

function spownMeteor(){
    if(World.frameCount % 120 === 0){
        meteor = createSprite(random(0,800),0,20,20);
        meteor.velocityY = 6;
        meteorImg.resize(400,500)
        meteor.addImage(meteorImg);
        meteor.scale = 0.5;
        meteorsGroup.add(meteor);
    
    }
}

function spownBird(){
    if(World.frameCount % 200 === 0){
        bird = createSprite(0,random(0,800),20,20);
        bird.scale = 0.4;
        bird.addAnimation("animation",birdAni);
        bird.velocityX = 5;
        birdsGroup.add(bird);
    
    }
}

function interaction(){
    if(birdsGroup.isTouching(airBalloon)){
        life = life - 1;
    }
}


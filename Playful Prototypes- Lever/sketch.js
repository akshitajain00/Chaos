//global
var rotationAngle=0;
var rotationSpeed=50;
var rotationDirection =50; 

//images
var stage1bg;
var player;
var ground;
var platform1;
var platform2;

//game control
var stage = 0;// keeps track of which function to call

//player
var p1X = 400; //position of the player; p1=player1
var p1Y= 375;
var pWidth = 30;
var pHeight = 70;
var pWeight = 2;

//platforms (boxes)
var b1X= 200; // position of the platform; b1=box1
var b1Y= 300;
var b2X= 500;
var b2Y= 200;
var b3X= 800;
var b3Y= 100;
var b4X=0;
var b4Y=100;
var b5X=800;
var b5Y=300;
var b6X=0;
var b6Y=300;
var b7X= 300;
var b7Y= 150;
var bWidth = 200;
var bHeight = 30;
var bWeight = 2;

//wall under the platforms
var w1Y= b1Y+20;
var w2Y= b2Y+20;
var w3Y= b3Y+20;
var w4Y= b4Y+20;
var w5Y= b5Y+20;
var w6Y= b6Y+20;
var w7Y= b7Y+20;
var wHeight= 20;


//objects for balance
var o1X = b2X;
var o1Y = b2Y;
var oWidth = 50;
var oHeight = 50;
var oWeight = 2;

//physics
var jump = false; 
var direction = 3; //force of gravity
var velocity = 2; //the speed of the player
var jumpPower = 15; //the strength of player
var fallingSpeed = 2; //equal to initial velocity
var minHeight = 375; // height of ground
var maxHeight = 50; // height of sky
var jumpCounter = 0; //keeps track of how much we are jumping
var jumpForce = pWeight*direction //the force for the balance



////setup
function setup() {
  createCanvas(800, 500);
  rectMode(CENTER);
  textAlign(CENTER);

  buttonPlay = createButton('Play');
  buttonPlay.position(0, 100);
}


////draw
function draw() {
  if(stage == 0){
    background(stage1bg);
    buttonPlay.show();
    buttonPlay.position(windowWidth/2, windowHeight/2);
    buttonPlay.addClass('buttonStyle');
    buttonPlay.mousePressed(() => stage = 1);
  }
  if(stage == 1){
    Stage1();
    playerMovement();
    playerJump();
    gravity();
    buttonPlay.hide();
    if(p1X>=800 && p1Y<=b3Y+bHeight){
      stage = 2
      p1X= 0
    }
  }
  if(stage == 2){
    Stage2();
    playerMovement();
    playerJump();
    gravity();
    if(p1X>=750){
      stage = 3
      p1X= 0
    }
  }
  if(stage == 3){
    Stage3();
    playerMovement();
    playerJump();
    gravity();
    // if(p1X>=800){
    //   stage = 4
    // }
  }
  if(stage == 4){
    Stage4();
    playerMovement();
    playerJump();
    gravity();
  }
}

// fuction for the start scene
function Stage1(){
  background(stage1bg);
  image(platform1, 100, 285, bWidth, bHeight);
  image(platform1, b3X-100, b3Y-15, bWidth, bHeight);
  // fill(255);
  noStroke();
  ellipse(o1X, o1Y, oWidth, oHeight);
  //player
  image(player, p1X, p1Y, pWidth, pHeight);

  // Calculate the position of the player relative to b2
  let relativePosition = p1X - b2X;

  // Map the relative position to a rotation angle
  let mappedAngle = map(relativePosition, -bWidth / 2, bWidth / 2, -PI / 2, PI / 2);

  // Apply the rotation
  push();
  translate(b2X, b2Y);
  rotate(mappedAngle);
  image(platform2, -75, -15, 150, bHeight);
  pop();
  
  //collisions
  //box 1
  if(p1X>= b1X-bWidth/2 && p1X <= b1X+bWidth/2 && p1Y+pHeight >= b1Y- bHeight/2 && p1Y-pHeight <= b1Y+bHeight/2 && jump == false){
    p1Y = p1Y
    velocity = 0;
    jumpCounter = 0; //allows player to jump again
  }
  //wall barrier under platform
  if(p1X >= b1X-bWidth/2 && p1X <= b1X+bWidth/2 && p1Y+pHeight/2 >= w1Y-wHeight/2 && p1Y-pHeight/2 <= w1Y+wHeight/2){
    jumpCounter = jumpPower;
    velocity = fallingSpeed;
  }

  //box 2
  if(p1X>= b2X-150/2 && p1X <= b2X+150/2 && p1Y+pHeight >= b2Y-bHeight/2 && p1Y-pHeight <= b2Y+bHeight/2 && jump == false){
    p1Y = p1Y
    velocity = 0; 
    jumpCounter = 0; //allows player to jump again
  }
   //wall barrier under platform
   if(p1X >= b2X-150/2 && p1X <= b2X+bWidth/2 && p1Y+pHeight/2 >= w2Y-wHeight/2 && p1Y-pHeight/2 <= w2Y+wHeight/2){
    jumpCounter = jumpPower;
    velocity = fallingSpeed;
  }

  //box 3
  if(p1X>= b3X-bWidth/2 && p1X <= b3X+bWidth/2 && p1Y+pHeight >= b3Y- bHeight/2 && p1Y-pHeight <= b3Y+bHeight/2 && jump == false){
    p1Y = p1Y
    velocity = 0;
    jumpCounter = 0; //allows player to jump again
  }
   //wall barrier under platform
   if(p1X >= b3X-bWidth/2 && p1X <= b3X+bWidth/2 && p1Y+pHeight/2 >= w3Y-wHeight/2 && p1Y-pHeight/2 <= w3Y+wHeight/2){
    jumpCounter = jumpPower;
    velocity = fallingSpeed;
  }
}

function Stage2(){
  //sky
  background(stage1bg);
  //platform (box)
  image(platform1, b4X-100, b4Y-15, bWidth, bHeight);
  image(platform1, b5X-100, b5Y-15, bWidth, bHeight);
  //circle
  noStroke();
  ellipse(o1X, o1Y, oWidth, oHeight);
  //player
  image(player, p1X, p1Y, pWidth, pHeight);

  // Calculate the position of the player relative to b2
  let relativePosition = p1X - b2X;

  // Map the relative position to a rotation angle
  let mappedAngle = map(relativePosition, -bWidth / 2, bWidth / 2, -PI / 2, PI / 2);

  // Apply the rotation
  push();
  translate(b2X, b2Y);
  rotate(mappedAngle);
  image(platform2, -75, -15, 150, bHeight);
  pop();

  //collisions
  if(p1X>= b4X-bWidth/2 && p1X <= b4X+bWidth/2 && p1Y+(pHeight/2) >= b4Y- bHeight/2 && p1Y-(pHeight/2) <= b4Y+bHeight/2 && jump == false){
    p1Y = p1Y
    velocity = 0;
    jumpCounter = 0; //allows player to jump again
  }
  //wall barrier under platform
  if(p1X >= b4X-bWidth/2 && p1X <= b4X+bWidth/2 && p1Y+pHeight/2 >= w4Y-wHeight/2 && p1Y-pHeight/2 <= w4Y+wHeight/2){
    jumpCounter = jumpPower;
    velocity = fallingSpeed;
  }

  if(p1X>= b5X-bWidth/2 && p1X <= b5X+bWidth/2 && p1Y+(pHeight/2) >= b5Y- bHeight/2 && p1Y-(pHeight/2) <= b5Y+bHeight/2 && jump == false){
    p1Y = p1Y
    velocity = 0;
    jumpCounter = 0; //allows player to jump again
  }
  //wall barrier under platform
  if(p1X >= b5X-bWidth/2 && p1X <= b5X+bWidth/2 && p1Y+pHeight/2 >= w5Y-wHeight/2 && p1Y-pHeight/2 <= w5Y+wHeight/2){
    jumpCounter = jumpPower;
    velocity = fallingSpeed;
  }

  //box 2
  if(p1X>= b2X-150/2 && p1X <= b2X+150/2 && p1Y+pHeight >= b2Y-bHeight/2 && p1Y-pHeight <= b2Y+bHeight/2 && jump == false){
    p1Y = p1Y
    velocity = 0; 
    jumpCounter = 0; //allows player to jump again
  }
   //wall barrier under platform
   if(p1X >= b2X-150/2 && p1X <= b2X+bWidth/2 && p1Y+pHeight/2 >= w2Y-wHeight/2 && p1Y-pHeight/2 <= w2Y+wHeight/2){
    jumpCounter = jumpPower;
    velocity = fallingSpeed;
  }
}

function Stage3(){
 //sky
 background(stage1bg);
 //platform (box)
 image(platform1, b6X-100, b6Y-15, bWidth, bHeight);
 image(platform1, b7X-100, b7Y-15, bWidth, bHeight);
 //circle
 noStroke();
 ellipse(o1X, o1Y, oWidth, oHeight);
 //player
 image(player, p1X, p1Y, pWidth, pHeight);

 // Calculate the position of the player relative to b2
 let relativePosition = p1X - b2X;

 // Map the relative position to a rotation angle
 let mappedAngle = map(relativePosition, -bWidth / 2, bWidth / 2, -PI / 2, PI / 2);

 // Apply the rotation
 push();
 translate(b2X, b2Y);
 rotate(mappedAngle);
 image(platform2, -75, -15, 150, bHeight);
 pop();

 //collisions
 if(p1X>= b6X-bWidth/2 && p1X <= b6X+bWidth/2 && p1Y+(pHeight/2) >= b4Y- bHeight/2 && p1Y-(pHeight/2) <= b6Y+bHeight/2 && jump == false){
   p1Y = p1Y
   velocity = 0;
   jumpCounter = 0; //allows player to jump again
 }
 //wall barrier under platform
 if(p1X >= b6X-bWidth/2 && p1X <= b6X+bWidth/2 && p1Y+pHeight/2 >= w6Y-wHeight/2 && p1Y-pHeight/2 <= w6Y+wHeight/2){
   jumpCounter = jumpPower;
   velocity = fallingSpeed;
 }

 if(p1X>= b7X-bWidth/2 && p1X <= b7X+bWidth/2 && p1Y+(pHeight/2) >= b7Y- bHeight/2 && p1Y-(pHeight/2) <= b7Y+bHeight/2 && jump == false){
   p1Y = p1Y
   velocity = 0;
   jumpCounter = 0; //allows player to jump again
 }
 //wall barrier under platform
 if(p1X >= b7X-bWidth/2 && p1X <= b7X+bWidth/2 && p1Y+pHeight/2 >= w7Y-wHeight/2 && p1Y-pHeight/2 <= w7Y+wHeight/2){
   jumpCounter = jumpPower;
   velocity = fallingSpeed;
 }

 //box 2
 if(p1X>= b2X-150/2 && p1X <= b2X+150/2 && p1Y+pHeight >= b2Y-bHeight/2 && p1Y-pHeight <= b2Y+bHeight/2 && jump == false){
   p1Y = p1Y
   velocity = 0; 
   jumpCounter = 0; //allows player to jump again
 }
  //wall barrier under platform
  if(p1X >= b2X-150/2 && p1X <= b2X+bWidth/2 && p1Y+pHeight/2 >= w2Y-wHeight/2 && p1Y-pHeight/2 <= w2Y+wHeight/2){
   jumpCounter = jumpPower;
   velocity = fallingSpeed;
 }
}


// fuction for gravity
function gravity(){
  if(p1Y>= minHeight && jump == false){
    p1Y=p1Y; //player doen't fall on ground
    jumpCounter = 0; //reset jump counter when landing
  }
  else{
    p1Y = p1Y + (direction*velocity); //gravity code
  }

  //jumping code
  if (jump==true){
    if(p1Y <= maxHeight || jumpCounter >= jumpPower){
      if(p1Y >= minHeight){
        p1Y = minHeight;
      }
      else{
        velocity = fallingSpeed; //fall at maximum
      }
    }
    else{
      velocity = -jumpPower;
      jumpCounter += 1;
    }
  }
  else{
    velocity = fallingSpeed;
  }
}

function playerMovement(){
  if(keyDown('LEFT_ARROW')){ 
    p1X -= 5; //move to the left
  }
  if(keyDown('RIGHT_ARROW')){ 
    p1X += 5; //move to the right
  }
}

function playerJump(){
  if(keyDown('SPACE')){
    jump = true;
  }
  else{
    jump = false;
  }
}

//load images, fonts, music
function preload() {
  stage1bg = loadImage("background.png");
  ground = loadImage("ground.png");
  platform1 = loadImage("platform.png");
  platform2 = loadImage("platform2.png");
  player = loadImage("player.png")

}

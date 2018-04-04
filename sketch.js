var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var barX = winWidth/2
var barY = winHeight - 100;
var ballX = winWidth/2;
var ballY = winHeight/2;
var changeX = 4;
var changeY = 2;
var misses = 0;
var pointX = winWidth - winWidth/3;
var pointY = winHeight - winHeight/3;
var points = 0;


function preload() {
  ball = createImg("assets/ball.gif");
  point = createImg("assets/point.gif");
  bgImg = loadImage("assets/backgroundimg.jpg");
  bounceSound = loadSound("assets/bounce.mp3");
  missSound = loadSound("assets/miss.mp3");
  pointSound = loadSound("assets/point.mp3");

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  changeX = random(1, 6);
  changeY = random(1, 6);
}

function draw() {
  imageMode(CORNER);
  background(bgImg);
  imageMode(CENTER);

  //side paneling
  fill(213, 38, 181);
  rect(0, 0, 20, winHeight)
  rect(winWidth - 20, 0, 20, winHeight);
  rect(0, 0, winWidth, 20);

  //paddle
  rect(barX, barY, 180, 20);
  var barRight = barX + 180;
  var barLeft = barX;
  var barTop = barY;
  var barBottom = barY + 20;
  var barLeftHalf = barLeft + barRight/2

  //ball
  ball.position(ballX, ballY);
  var ballRight = ballX + ball.width;
  var ballLeft = ballX;
  var ballTop = ballY;
  var ballBottom = ballY + ball.height;

  //point gem thing
  point.position(pointX, pointY);

  //changing speed and position
  ballX += changeX;
  ballY += changeY;

  //determine ball movement
  //bounce if ball hits a wall
  //disappear and reset if ball goes off the screen
  if (ballX < 18 || ballX > winWidth - 98) {
    changeX *= -1.1;
    changeY *= -1.1;
    bounceSound.play();
  } else if (ballY < 20) {
    changeY *= -1.1;
    bounceSound.play();
  } else if (ballY > winHeight) {
    ballX = winWidth/2;
    ballY = winHeight/2;
    misses += 1;
    changeX = random(1, 6);
    changeY = random(1, 6);
    missSound.play();
  }

  //map the bar's movement to A and D keys within the correct space
  if (keyIsDown(65) && barX > 20) {
    barX -= 8;
  }

  if (keyIsDown(68) && barX < winWidth - 200) {
    barX += 8;
  }

  // if ball hits paddlem, determine bounce direction
 if (!(barRight < ballLeft || barLeft > ballRight || barBottom < ballTop || barTop > ballBottom)) {
   ballY = barTop - ball.height - 2;
   changeY *= -1.1;
   if (ballX < barLeftHalf) {
     changeX = abs(changeX) * -1;
   } else if (ballX > barLeftHalf) {
     change = abs(changeX);
   }
   bounceSound.play();
 }

//collision detection for point + ball
  if (dist(ballX, ballY, pointX, pointY) < 70) {
    pointX = random(20, winWidth - 150);
    pointY = random(20, winHeight - 200);
    points += 1;
    pointSound.play();
  }

  text("Misses: " + misses, 80, 50);
  text("Points: " + points, 80, 80);
}

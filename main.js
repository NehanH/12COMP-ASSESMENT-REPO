/*************************************************************/
// SPEED GAMEMODE JAVASCRIPT
/*************************************************************/

/*************************************************************/
// VARIABLES
/*************************************************************/
const elmnt = document.getElementById("speedPC");


// BARRIER
var spot = {
  x: 100,
  y: 100,
}
// TIMER
var timer;
var counter = 0;
// RANDOM COLOUR
var col = {
  r: 0,
  g: 0,
  b: 0,
}
// VELOCITY ARRAY
const BALLVEL = [-7,-6,-5,-4,-3,3,4,5,6,7];
const BALLVELNEG = [-7,-6,-5,-4,-3]
const BALLVELPOS = [3,4,5,6,7]
// SPEED

var hit = false;
var score = 0;
var count = 0;
var miss = 0;

// BALL ARRAY
var ball = []
var ballRadius = 25;
var hits = 0;
var px2ball = [];

function dToBall (){
    for (i = 0; i < ball.length; i++) {
    px2ball[i] = dist(ball[i].x, ball[i].y, mouseX, mouseY);
  }
}

function setupCvs(){
  console.log(elmnt.offsetHeight + "/" + elmnt.offsetWidth);
let cnv = createCanvas(elmnt.offsetWidth, elmnt.offsetHeight);
 cnv.parent('speedPC');
}

function setup(){
  fb_initialise();  
  createBtns()
  frameRate(60)
  var speed = random(BALLVEL);
  var speedY = random(BALLVEL);
  timer = createP('timer')
  setInterval(timeIt, 500);
  createCanvas(0, 0); 
  for (let i = 0; i < 1; i++) {
      ball[i] = {
        
    x: random(100, 300),
    y: random(100, 300),
        
    speed: random(BALLVEL),
    speedY: random(BALLVEL),
    radius: 25,
    diameter: 50,
        
  display: function(){
    col.r = random(0, 255);
    col.g = random(0, 255);
    col.b = random(0, 255);
    spot.x = random(0, width);
    spot.y = random(0, height);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    fill(col.r,col.g,col.b);
    noStroke();
  },
  move: function(){
    this.x = this.x + this.speed;
    this.y = this.y + this.speedY;
  },
  bounce: function(){
    if(this.x + this.radius > width){
      this.speed = random(BALLVELNEG);
      this.x = 375;
  } else if(this.x - this.radius < 0){
      this.speed = random(BALLVELPOS);
      this.x = 25;
  }
  if(this.y + this.radius > height){
    this.speedY = random(BALLVELNEG);
    this.y = 375;
  } else if(this.y - this.radius < 0){
      this.speedY = random(BALLVELPOS);
        this.y = 25;
      }
    }
  }
  }

}

function timeIt(){
  timer.html(counter);
  counter++;
}

function mouseClicked(){
  for (var i = 0; i < ball.length; i++) {
    if (px2ball[i] <= ballRadius) {
      ball[i].x = random(20, 380);
      ball[i].y = random(20, 380);
    }
  }
    hit = px2ball.some(function (e) {
    return e <= ballRadius;
  });
  
if (hit == true) {
    score += 1;
    console.log("score: "+ score);
  }
  else {
    miss += 1;
    console.log("miss:" + miss);
  }
}
function draw(){
  background(200, 200, 200);
  for (let i = 0; i < ball.length; i++) {
  ball[i].bounce();
  ball[i].display();
  ball[i].move();
  }
 dToBall();
}

function start(){
 document.getElementById('h_taskName').innerHTML=TASKNAME;
}

// Hide Landing Page Show Game Page
function loginButton() {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("gamePage").style.display = "block";
}
// Hide Game Page Show Speed Page
function speedButton(){
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("speedPage").style.display = "block";
}
function trackButton(){
  
}
function flickButton(){
  
}
function createBtns(_x, _y) {  
  console.log("createBtns: x = " + _x + ",  y = " + _y);
  
  const BTNCOL   = 'rgb(255, 255, 255)';
  const BTNW     = 100;
  const BTNH     = 70;
  const GAP      = 15;
  const FONTSIZE = '18px';
  
  // create LOGIN button
  btnLogin = createButton('login');
  btnLogin.position(900, 200);
  btnLogin.size(BTNW, BTNH);
  btnLogin.style('background-color', color(BTNCOL));
  btnLogin.style('font-size', FONTSIZE);
  btnLogin.mousePressed(login);
}

function login() {
  fb_login(userDetails);
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("gamePage").style.display = "block";
  btnLogin.position(20000, 20000);
}
/*************************************************************/
//      END OF APP
/*************************************************************/

/*************************************************************/
// SPEED GAMEMODE JAVASCRIPT
/*************************************************************/

/*************************************************************/
// VARIABLES
/*************************************************************/
const elmnt = document.getElementById("speedPC");

// User Variables
var hit = false;
var score = 0;
var count = 0;
var miss = 0;
var userHighscore

// BARRIER
var spot = {
  x: 100,
  y: 100,
}

// TIMER
const timer = document.getElementById("g_timer");
var timerInterval;

// RANDOM COLOUR
var col = {
  r: 0,
  g: 0,
  b: 0,
}

/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
const DETAILS = "userDetails";      //<=============== INSERT YOUR FIREBASE PATH NAME HERE

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';
var readSuccess = ' ';

// userDetails object
var userDetails = {
  uid:      'n/a',
  email:    'n/a',
  name:     'n/a',
  photoURL: 'n/a',
  score:    'n/a',
  gameName: 'n/a',
  phone:    'n/a'
};


// VELOCITY ARRAY
const BALLVEL = [-7,-6,-5,-4,-3,3,4,5,6,7];
const BALLVELNEG = [-7,-6,-5,-4,-3]
const BALLVELPOS = [3,4,5,6,7]

// BALL ARRAY
var ball = []
var ballRadius = 25;
var hits = 0;
var px2ball = [];

// Start Timer / Game
function startTimer(){
  readRec();
  // reset misses + score
  miss = 0;
  score = 0;
  document.getElementById("currentHS").innerHTML = userDetails.score;
  document.getElementById("p_score").innerHTML = score;
  document.getElementById("p_misses").innerHTML = miss;
  document.getElementById("b_start").style.display = "none";
  // timer
  clearInterval(timerInterval);
  var second = 10;
  var minute = 0;
  var hour = 0;
  timerInterval = setInterval(function () {
timer.classList.toggle('odd');
    timer.innerHTML =
      (hour ? hour + ":" : "") +
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);
    second--;
    // when timer finishes
    if (second == -1) {
    clearInterval(timerInterval);
    gameOver()
    
    }
    // if timer is still going
    if(second >= -1){
  document.getElementById("p_score").innerHTML = score;
  document.getElementById("p_misses").innerHTML = miss;
    }
  }, 1000);
};
// Game Over Function
function gameOver(){
  // bring back start button
  document.getElementById("b_start").style.display = "block";
  // check for highscore
  if(userDetails.score <= score || userDetails.score == 'n/a'){
    writeRec();
  }
   cnv = createCanvas(0, 0);
  // update metrics
  document.getElementById("currentHS").innerHTML = userDetails.score;
  document.getElementById("p_score").innerHTML = score;
  document.getElementById("p_misses").innerHTML = miss;
}

// Distance To Ball Function
function dToBall (){
    for (i = 0; i < ball.length; i++) {
    px2ball[i] = dist(ball[i].x, ball[i].y, mouseX, mouseY);
  }
}

// Game Canvas Setup Function
// called by start button
function setupCvs(){
  console.log(elmnt.offsetHeight + "/" + elmnt.offsetWidth);
let cnv = createCanvas(elmnt.offsetWidth, elmnt.offsetHeight);
 cnv.parent('speedPC');
  startTimer();
}

// Setup Function
function setup(){
  fb_initialise();
  fb_login(userDetails);
  frameRate(60)
  document.getElementById("currentHS").innerHTML = userDetails.score;
  var speed = random(BALLVEL);
  var speedY = random(BALLVEL);
  createCanvas(0, 0); 
  // bouncing ball object
  for (let i = 0; i < 3; i++) {
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
      this.x = elmnt.offsetWidth - 25;
  } else if(this.x - this.radius < 0){
      this.speed = random(BALLVELPOS);
      this.x = 25;
  }
  if(this.y + this.radius > height){
    this.speedY = random(BALLVELNEG);
    this.y = elmnt.offsetHeight - 25;
  } else if(this.y - this.radius < 0){
      this.speedY = random(BALLVELPOS);
        this.y = 25;
      }
    }
  }
  }
}

var database = firebase.database();

// Mouse Clicked Function
// calculating misses + scores
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
    console.log("p_score: "+ score);
  }
  else{
    miss += 1;
    console.log("p_miss:" + miss);
  }
} 

// Draw Function
function draw(){
  // Check for admin
    if(userDetails.email == "19307nh@hvhs.school.nz" || userDetails.email == "bryan.gillies@hvhs.school.nz") {
      document.getElementById("b_lpAdmin").style.display = "block";
    } else {
      document.getElementById("b_lpAdmin").style.display = "none";
    }
  // Set Form Name And Email
    regEmailName()
  // Canvas
  background(200, 200, 200);
  // Ball object
  for (let i = 0; i < ball.length; i++) {
  ball[i].bounce();
  ball[i].display();
  ball[i].move();
  }
 dToBall();
}

// Hide Game Page Show Speed Page
function speedButton(){
  document.getElementById("gp").style.display = "none";
  document.getElementById("sp").style.display = "block";
}

// Login Function
function login() {
  readRec();
  fb_login(userDetails);
  console.log(loginStatus);
  const user = firebase.auth().currentUser;
  if (user) {
  console.log(userDetails.gameName)
  document.getElementById("b_login").style.display = "none";
  document.getElementById("lp").style.display = "none";
  document.getElementById("gp").style.display = "block";
  regEmailName();
  } else if (user == null) {
  console.log(userDetails.gameName)
    document.getElementById("b_login").style.display = "none";
  document.getElementById("lp").style.display = "none";
  document.getElementById("rp").style.display = "block";
  regEmailName();
  }
}

// Read All Function
function readAll() {
  // CALL YOUR READ ALL FUNCTION        <=================
  fb_readAll(DETAILS, dbArray);
}

// WriteRec Function
function writeRec() {
  if (userDetails.uid != '') {
    userDetails.score = score;
    
    // CALL YOUR WRITE A RECORD FUNCTION    <=================
    fb_writeRec(DETAILS, userDetails.uid, userDetails);
  }
  else {
    dbScore     = '';
    writeStatus = '';
    loginStatus = 'not logged in';
  }
}

// ReadRec Function
function readRec() {
  // CALL YOUR READ A RECORD FUNCTION    <=================
  fb_readRec(DETAILS, userDetails.uid, userDetails);
}
/*************************************************************/
//      END OF APP
/*************************************************************/

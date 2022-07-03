/*****************************************************/
// Written by ???  2021
// v1 firebase DB testing write AND read to firebase
// v2 add Google login
/*****************************************************/
const PADDING  = 15;
const PANELW   = 130;
const NEXTLINE = 30;

/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
const DETAILS = "userDetails";      //<=============== INSERT YOUR FIREBASE PATH NAME HERE

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

var userDetails = {
  uid:      'n/a',
  email:    'n/a',
  name:     'n/a',
  photoURL: 'n/a',
  score:    'n/a'
};

var dbArray = [];
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/

/*****************************************************/
// setup
/*****************************************************/
function setup() {
  fb_initialise();                     // connect to firebase
  
  playArea = createCanvas(800, 800); 
  playArea.position(PANELW, PADDING);  // position the canvas
  
  createBtns(PADDING, playArea.y);     // create the buttons
}

var database = firebase.database();
/*****************************************************/
// draw()
/*****************************************************/
function draw() {
  background("Gainsboro");
  
  // display the data
  textSize(30);
  text('uid:   ' + userDetails.uid,   20, 30);
   
  textSize(20);
  text('name:   ' + userDetails.name,  20, 60);   
  text('email:    ' + userDetails.email, 20, 85);
  
  textSize(20);
  text('path:      ' + DETAILS, 20, 140);
  
  text('program',   20, 190);
  text('database', 150, 190);
  
  textSize(40);
  text(userDetails.score,  20, 230);  
  text(userDetails.score, 150, 230);
    
  textSize(30);
  text('read all records', 20, 295);
  
  textSize(20);
  // if 'read all' records button hit, dbArray holds the data
  // loop thru scores array displaying it
  for(i=0; i < dbArray.length; i++) {
    text(dbArray[i].name,  450, 330 + NEXTLINE * i);
    text(dbArray[i].score, 700, 330 + NEXTLINE * i);
  }  
  
  text('DB login status: ' + loginStatus, 20, height-90);
  text('DB read status:  ' + readStatus,  20, height-60);
  text('DB write status: ' + writeStatus, 20, height-30);
}

/*****************************************************/
// createBtns(_x, _y)
// Called by setup
// Create buttons starting at position _x, _y
// Input:  x & y co-ords of 1st element
/*****************************************************/
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
    
  // create READ ALL button
  btnReadAll.position(btnLogin.x, btnLogin.y + 
                      btnLogin.height + 3 *GAP);
  btnReadAll.size(BTNW, BTNH);
  btnReadAll.style('background-color', color(BTNCOL));
  btnReadAll.style('font-size', FONTSIZE);
  btnReadAll.mousePressed(readAll);
  
  // create READ A RECORD button
  btnReadRec.position(btnReadAll.x, btnReadAll.y + 
                      btnReadAll.height + GAP);
  btnReadRec.size(BTNW, BTNH);
  btnReadRec.style('background-color', color(BTNCOL));
  btnReadRec.style('font-size', FONTSIZE);
  btnReadRec.mousePressed(readRec);
  
  // create WRITE button
  btnWrite.position(btnReadRec.x, btnReadRec.y + 
                    btnReadRec.height + GAP);
  btnWrite.size(BTNW, BTNH);
  btnWrite.style('background-color', color(BTNCOL));
  btnWrite.style('font-size', FONTSIZE);
  btnWrite.mousePressed(writeRec);
}

/*****************************************************/
// login()
// Input event; called when user clicks LOGIN button
// Logs user into firebase using Google login
// Input:
// Return:
/*****************************************************/
/*****************************************************/
// readAll()
// Input event; called when user clicks READ ALL button
// Read all firebase records
// Input:
// Return:
/*****************************************************/
function readAll() {
  // CALL YOUR READ ALL FUNCTION        <=================
  fb_readAll(DETAILS, dbArray);
}

/*****************************************************/
// readRec()
// Input event; called when user clicks READ A RECORD button
// Read a specific firebase record
// Input:
// Return:
/*****************************************************/
function readRec() {
  // CALL YOUR READ A RECORD FUNCTION    <=================
  fb_readRec(DETAILS, userDetails.uid, userDetails);
}

/*****************************************************/
// writeRec()
// Input event; called when user clicks WRITE A RECORD button
// Write a record to firebase
// Input:
// Return:
/*****************************************************/
function writeRec() {
  if (userDetails.uid != '') {
    userDetails.score = Number(prompt("enter the user's score"));
    
    // CALL YOUR WRITE A RECORD FUNCTION    <=================
    fb_writeRec(DETAILS, userDetails.uid, userDetails);
  }
  else {
    dbScore     = '';
    writeStatus = '';
    loginStatus = 'not logged in';
  }
}

/*****************************************************/
//    END OF PROG
/*****************************************************/
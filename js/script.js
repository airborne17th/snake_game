// Original script from:  http://zetcode.com/javascript/snake/
// Modified by John Kyker on 3/28/2020

var canvas;
var ctx;

var head;
var fruit = [];
var ball;

var dots;
var fruit_x;
var fruit_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;    

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 400;
const C_WIDTH = 400;    

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);   

var scoreCounter = 0;
var highScore = 0;
var i;
var person;

function init() {
    
    document.getElementById("playerScore").innerHTML = scoreCounter;
    document.getElementById("highScore").innerHTML = highScore;
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateFruit();
    setTimeout("gameCycle()", DELAY);
}    

function loadImages() {
    
    head = new Image();
    head.src = 'img/head.png';    
    
    ball = new Image();
    ball.src = 'img/dot.png'; 
    
    fruit[0] = new Image();
    fruit[0].src = 'img/apple.png'; 

    fruit[1] = new Image();
    fruit[1].src = 'img/banana.png'; 

    fruit[2] = new Image();
    fruit[2].src = 'img/orange.png'; 

    fruit[3] = new Image();
    fruit[3].src = 'img/watermelon.png'; 

    
    i = Math.floor(Math.random() * Math.floor(4));
}

function createSnake() {

    dots = 3;
    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function doDrawing() {
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {
        ctx.drawImage(fruit[i], fruit_x, fruit_y);

        for (var z = 0; z < dots; z++) {
            
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }    
    } else {
        if (scoreCounter > highScore) {
            highScore = scoreCounter;
            document.getElementById("playerScore").innerHTML = highScore;
            person = prompt("Congratutions! You got a high score. Please enter your name:");
            while (person == null || person == "") {
            person = prompt("Please enter in a name!");
            }
            document.getElementById("hiName").innerHTML = person;
        }    
        gameOver();
    }        
}

function gameOver() {
    
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
    window.alert("Game Over!");
}

function checkFruit() {

    if ((x[0] == fruit_x) && (y[0] == fruit_y)) {
        scoreCounter++;
        dots++;
        locateFruit();
        document.getElementById("playerScore").innerHTML = scoreCounter;
    }
}

function move() {

    for (var z = dots; z > 0; z--) {
    
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {
    
        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {
    
        x[0] += DOT_SIZE;
    }

    if (upDirection) {
    
        y[0] -= DOT_SIZE;
    }

    if (downDirection) {
    
        y[0] += DOT_SIZE;
    }
}    

function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {
    
        inGame = false;
    }

    if (y[0] < 0) {
    
       inGame = false;
    }

    if (x[0] >= C_WIDTH) {
    
      inGame = false;
    }

    if (x[0] < 0) {
    
      inGame = false;
    }
}

function locateFruit() {

    var r = Math.floor(Math.random() * MAX_RAND);
    fruit_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    fruit_y = r * DOT_SIZE;
}    

function gameCycle() {
    
    if (inGame) {

        checkFruit();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

document.getElementById("ResetBtn").addEventListener("click", function(){
    scoreCounter = 0;
    document.getElementById("playerScore").innerHTML = scoreCounter;
    init();
    inGame = true;  
  });


onkeydown = function(e) {
    
    var key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
        
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
        
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
        
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    
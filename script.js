"use strict";

var ctx = gameCanvas.getContext("2d");
var x = 300,
  moveRight = false,
  moveLeft = false,
  y = 50,
  monsterX = 300,
  changeX = 0,
  score = 0;

var gameTimer = setInterval(mainLoop, 20);
function mainLoop() {
  ctx.clearRect(0, 0, 640, 480);
  ctx.font = "30px Arial";
  ctx.fillText("score: " + score, 10, 30);
  ctx.drawImage(food, x, y, 80, 80);
  y += 6;
  if (y > 480) {
    y = -80;
    x = Math.random() * 600;
  }
  if (changeX > 0 && monsterX < 560) monsterX += changeX;
  if (changeX < 0 && monsterX > 0) monsterX += changeX;
  ctx.drawImage(player, monsterX, 400, 80, 80);
  checkForHits();
}
function checkKeys() {
  if (moveLeft == true && moveRight == true) {
    changeX = 0;
  } else if (moveLeft) {
    changeX = -4;
  } else if (moveRight) {
    changeX = 4;
  } else {
    changeX = 0;
  }
}
document.onkeydown = keyPressed;
function keyPressed(e) {
  var k = e.keyCode;
  if (k == 37) {
    moveLeft = true;
  }
  if (k == 39) {
    moveRight = true;
  }
  checkKeys();
}
document.onkeyup = keyUnPressed;
function keyUnPressed(e) {
  var k = e.keyCode;
  if (k == 37) {
    moveLeft = false;
  }
  if (k == 39) {
    moveRight = false;
  }
  checkKeys();
}
function checkForHits() {
  if (Math.abs(400 - y) < 60 && Math.abs(monsterX - x) < 60) {
    score += 5;
    y = -80;
    x = Math.random() * 600;
  }
}
setTimeout(gameOver, 30000);
function gameOver() {
  clearInterval(gameTimer);
  ctx.font = "80px Arial";
  ctx.fillText("Game Over", 100, 250);
}

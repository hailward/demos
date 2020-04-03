// Move the mouse across the screen as a sine wave.
var robot = require("robotjs");

// Speed up the mouse.
robot.setMouseDelay(0);

var screenSize = robot.getScreenSize();
var height = screenSize.height / 2;
var width = screenSize.width / 2;

var rad = Math.PI / 180;
var degree = 0
var radius = 10;
setInterval(() => {
  degree = degree % 360;
  robot.moveMouse(Math.cos(degree * rad)* radius + width, Math.sin(degree * rad) * radius + height);
  degree++;
}, 2)
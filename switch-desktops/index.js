const ioHook = require('iohook');
const robot = require("robotjs-node10");

const screen_height = robot.getScreenSize().height;

ioHook.on("mousedown", event => {
  if (event.button === 4) {
    let y = robot.getMousePos().y;
    if (screen_height - y <= 20) {
      robot.keyTap('left', ['control', 'command']);
    }
  } else if (event.button === 5) {
    let y = robot.getMousePos().y;
    if (screen_height - y <= 20) {
      robot.keyTap('right', ['control', 'command']);
    }
  }
});
ioHook.start();
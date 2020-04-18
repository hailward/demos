var ws = require('windows-shortcuts');

ws.create("%APPDATA%/Microsoft/Windows/Start Menu/Programs/Startup/switch-desktops.lnk", {
	target : process.cwd() + "/index.bat",
  runStyle : ws.MIN,
  desc: '监听鼠标按键，切换不同桌面。'
}, function(err) {
	if (err)
		throw Error(err);
	else
		console.log("Shortcut created!");
});
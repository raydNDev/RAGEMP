var cef = mp.browsers.new("package://assets/registerLogin.html");
mp.gui.cursor.visible = true;


let sceneryCamera = mp.cameras.new('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0,0,0), 40);

sceneryCamera.pointAtCoord(402.8664, -996.4108, -98.5);
sceneryCamera.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);

mp.game.ui.displayRadar(false);


mp.events.add("registerLogin.client",function(name,password,type) {
	if(name.length >= 3 && password.length >= 5) {
		mp.events.callRemote("registerLogin.server",name,password,type);
	}
	else
	{
		mp.game.graphics.notify("Die Angaben sind ungültig!");
	};
});


mp.events.add("registerLogin.destroy",function() {
	cef.destroy();
	mp.gui.cursor.visible = false;
	mp.game.cam.renderScriptCams(false, false, 0, true, false);
	mp.game.ui.displayRadar(true);
});

if(mp.game.ui.isPauseMenuActive()) { mp.game.ui.setFrontendActive(false); }
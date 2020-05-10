let AvailableWeathers = ["EXTRASUNNY","CLEAR","CLOUDS","SMOG","FOGGY","OVERCAST","RAIN","THUNDER","CLEARING","NEUTRAL","SNOW","BLIZZARD","SNOWLIGHT","XMAS","HALLOWEEN"];

// Command zum Ändern des Wetters
mp.events.addCommand("changeWeather",(player,fullText,weather) => {
	if(weather){
		if(AvailableWeathers.includes(weather)){
			mp.world.weather = weather;
			player.outputChatBox("Das Wetter wurde geändert.");
		}
		else
		{
			player.outputChatBox("Das angegebene Wetter existiert nicht!");
		};
	}
	else
	{
		player.outputChatBox("Du hast kein Wetter angegeben!");
	};
});

// Funktion, die das Wetter alle 60 Min. ändert
function changeWeather(){
	var weather = AvailableWeathers[Math.floor(Math.random()*AvailableWeathers.length)];
	mp.world.weather = weather;
	setTimeout(changeWeather,3600000);
};
setTimeout(changeWeather,3600000);
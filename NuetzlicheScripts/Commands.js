global.getPlayerID = (value) => {
	if(!isNaN(value) == true) {
		return mp.players.at(value);
	}
	else {
		let result = null;
		mp.players.forEach((player) => {
			if(result != null) return;
			if(player.name == value) {
				result = mp.players.at(player.id);
			};
		});
		return result;
	};
};

//1
mp.events.addCommand("mypos",(player) => {
	let playerPosition = player.position;
	console.log(playerPosition);
});

//2
mp.events.addCommand("msg",(player,fullText,target,msg) => {
	if(target && msg) {
		let targetPlayer = getPlayerID(target);
		if(targetPlayer) {
			targetPlayer.outputChatBox("Nachricht von " + player.name + ": " + msg);
			player.notify("Die Nachricht wurde versendet.");
		}
		else {
			player.notify("Der angegebene Spieler existiert nicht!");
		};
	}
	else {
		player.notify("Syntax: /msg [Spieler], [Message]");
	};
});

//3
mp.events.addCommand("akick",(player,fullText,target,reason) => {
	if(target && reason) {
		let targetPlayer = getPlayerID(target);
		if(targetPlayer) {
			mp.players.broadcast(targetPlayer.name + " wurde von " + player.name + " gekickt! Grund: " + reason);
			targetPlayer.kick();
		}
		else {
			player.notify("Der angegebene Spieler existiert nicht!");
		};
	}
	else {
		player.notify("Syntax: /akick [Spieler], [Grund]");
	};
});

//4
let Adminnames = ["Ticketbeauftragter","Supporter","Moderator","Administrator","Projektleiter"];

mp.events.addCommand("o",(player,fullText) => {
	if(fullText) {
		mp.players.broadcast("(( " + Adminnames[Math.floor(Math.random()*Adminnames.length)] + " " + player.name + ": " + fullText + " ))");
	}
	else {
		player.notify("Syntax: /o [Text]");
	};
});

//5
mp.events.addCommand("giveWeapon",(player,fullText,target,weapon,ammo) => {
	if(target && weapon) {
		let targetPlayer = getPlayerID(target);
		if(targetPlayer) {
			let weaponHash = mp.joaat(weapon);
			targetPlayer.giveWeapon(weaponHash,parseInt(ammo) || 1000);
			targetPlayer.notify("Du hast von " + player.name + " eine Waffe bekommen.");
			player.notify("Du hast " + targetPlayer.name + " eine Waffe gegeben.");
		}
		else {
			player.notify("Der angegebene Spieler existiert nicht!");
		};
	}
	else {
		player.notify("Syntax: /giveWeapon [Spieler], [Waffe]");
	};
});

//6
mp.events.addCommand("playerHeal",(player,fullText,target) => {
	if(target) {
		let targetPlayer = getPlayerID(target);
		if(targetPlayer) {
			targetPlayer.health = 100;
			targetPlayer.armour = 100;
			targetPlayer.notify("Du wurdest von " + player.name + " geheilt.");
			player.notify("Du hast " + targetPlayer.name + " geheilt.");
		}
		else {
			player.notify("Der angegebene Spieler existiert nicht!");
		};
	}
	else {
		player.notify("Syntax: /playerHeal [Spieler]");
	};
});

//7
mp.events.addCommand("fix",(player) => {
	if(player.vehicle) {
		player.vehicle.repair();
		player.notify("Das Fahrzeug wurde repairiert.");
	}
	else {
		player.notify("Du sitzt in keinem Fahrzeug!");
	};
});

//8
let Adminvehicle = {};

mp.events.addCommand("acar",(player,vehicleName) => {
	if(!vehicleName) { vehicleName = "turismor" };
	AdminvehicleDestroy(player);
	let playerPosition = player.position;
	
	Adminvehicle[player.name] = mp.vehicles.new(mp.joaat(vehicleName),playerPosition,{
		plate: "Adminfahrzeug",
		color: [[255,255,255],[255,255,255]],
	});
});

function AdminvehicleDestroy(player) {
	if(Adminvehicle[player.name]) {
		Adminvehicle[player.name].destroy();
		Adminvehicle[player.name] = null;
	};
};
mp.events.add("playerQuit",AdminvehicleDestroy);
mp.events.add("playerDeath",AdminvehicleDestroy);
mp.events.addCommand("acardestroy",AdminvehicleDestroy);
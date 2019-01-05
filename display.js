var OPEN = 1;
var CLOSED = 0;
var LEFT = 0;
var RIGHT = 1;
var NOANIMATION = -1;
var LOSE = 0;
var WIN = 1;
var BLANKFIGHTER = new Fighter("", "#13191c", -1);
var LEFTCOLORS = ["#FF4081","#FFEB3B",];
var RIGHTCOLORS = ["#2196F3","#2cc92e",];

var dojoid;
var dojoData;
var globalDojo;
var personalDojo;
var menuExpanded = false;
var initialized = false;
var animations = true;
var leftColorNav = {val: -1};
var rightColorNav = {val: -1};

document.onkeydown = checkKey;

function saveDojoCookie() {
	//setCookie("personalDojo", JSON.stringify(personalDojo),3);
	// console.log(document.cookie);
}

function loadDojoCookie() {
	/*	var cookieDojo = JSON.parse(getCookie("personalDojo"));
	// console.log(document.cookie);
	personalDojo = new Dojo(cookieDojo.name, cookieDojo.author, cookieDojo.key, cookieDojo.dojoState, cookieDojo.fighterList, cookieDojo.rankedList, cookieDojo.arrayNav, cookieDojo.newChallenger);*/
}

function deleteDojoCookie() {
	/*	document.cookie = "personalDojo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	// console.log(document.cookie);*/
}

function resetDojo() {
	/*	deleteDojoCookie();
	fetchDojo();
	toggleMenu();*/
}

function sortGlobals() {
	globalDojo.sort(function(a, b){return b.score - a.score});
}

function cycleColor(arr, nav) {
	nav.val++;
	if (nav.val >= arr.length) {
		nav.val = 0;
	}
	return arr[nav.val];
}

function checkKey(e) {

	e = e || window.event;

	switch (e.keyCode) {
		case 37:
			if (personalDojo.dojoState == OPEN && !menuExpanded) {
				personalDojo.fight(LEFT);
			}
			break;
		case 39:
			if (personalDojo.dojoState == OPEN && !menuExpanded) {
				personalDojo.fight(RIGHT);
			}
			break;
		case 38:
			if (personalDojo.dojoState == OPEN && menuExpanded) {
				toggleMenu();
			}
			break;
		case 40:
			if (personalDojo.dojoState == OPEN && !menuExpanded) {
				toggleMenu();
			}
			break;
	}

}

function showDialog(id) {
	console.log("show");
	var smokescreen = document.getElementById("smokescreen");
	var dialog = document.getElementById(id);
	smokescreen.style.zIndex = 1000;
	dialog.style.zIndex = 1001;

}

function hideDialog() {
	var smokescreen = document.getElementById("smokescreen");
	var dialogs = document.getElementsByClassName("dialog");
	smokescreen.style.zIndex = -1;
	for (var i = 0; i < dialogs.length; i++) {
		dialogs[i].style.zIndex = -1;
	}
	refreshSettings();

}

function fetchDojo() {
	dojoid = window.location.href.substr(-6);

	if (window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				dojoData = xmlhttp.responseText;
			}
		};
		xmlhttp.open("POST", "fetch_dojo.php?id=" + dojoid, false);
		xmlhttp.send();
	}

	if (dojoData === undefined) {
		showDialog("dnfDialog");
		return;
	}

	dojoData = JSON.parse(dojoData);
	var tempTitle = dojoData[0].name;
	dojoData.shift();
	if (dojoData.length < 2) {
		showDialog("dnfDialog");
		return;
	}
	globalDojo = {
		name: tempTitle,
		author: "dojovote",
		key: dojoid,
		roster: dojoData
	};
	loadDojo();
}

function loadDojo() {
	
	if (!checkCookie("visited")) {
		setCookie("visited","true", 10);
		showDialog("helpDialog");
	}
	

	document.getElementById("title").innerHTML = globalDojo.name;

	document.getElementById("personalList").innerHTML = "";
	personalDojo = new Dojo(globalDojo.name, globalDojo.author, globalDojo.key, OPEN, JSON.parse(JSON.stringify(globalDojo.roster)).shuffle(), [], 1, 1);
	for (var i in personalDojo.fighterList) {
		personalDojo.fighterList[i].score = 0;
	}
	personalDojo.openDojo();
	updateGlobalRanking();
	showPersonal();
	
	console.log(globalDojo.roster);
	console.log(personalDojo.fighterList);

	//	Dialog Loads
	document.getElementById("shareTitle").innerHTML = globalDojo.name;
	document.getElementById("shareCode").innerHTML = window.location.href;
	

}

function sendResults() {
	if (personalDojo.dojoState != CLOSED) {
		for (var i = 0; i < personalDojo.rankedList.length; i++) {
			if (window.XMLHttpRequest) {
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						console.log(this.responseText);
					}
				};
				xmlhttp.open("POST", "submit_dojo.php?id=" + globalDojo.key + "&fid=" + personalDojo.rankedList[i].fid + "&val=" + personalDojo.rankedList[i].score, true);
				xmlhttp.send();
			}
		}
	}
}

function toggleMenu() {
	if (menuExpanded) {
		if (personalDojo.dojoState == OPEN) {
			removeClass("fullMenu","expanded");
			menuExpanded = false;
		}
	}
	else {
		addClass("fullMenu","expanded");
		menuExpanded = true;
	}
}

function showPersonal() {
	var ptab = document.getElementById("personalTab");
	var plist = document.getElementById("personalRankings");
	var gtab = document.getElementById("globalTab");
	var glist = document.getElementById("globalRankings");

	ptab.style.zIndex = 6;
	plist.style.zIndex = 5;

	gtab.style.zIndex = 4;
	glist.style.zIndex = 4;
}

function refreshSettings() {
	if (document.getElementById("animations").checked) {
		animations = true;
	}
	else {
		animations = false;
	}
}

function showGlobal() {
	var ptab = document.getElementById("personalTab");
	var plist = document.getElementById("personalRankings");
	var gtab = document.getElementById("globalTab");
	var glist = document.getElementById("globalRankings");

	gtab.style.zIndex = 6;
	glist.style.zIndex = 5;

	ptab.style.zIndex = 4;
	plist.style.zIndex = 4;

	updateGlobalRanking();
}

function addWinner(fig) {
	var plist = document.getElementById("personalList");
	var newEntry = document.createElement("li");
	newEntry.innerHTML = fig.name;
	plist.appendChild(newEntry);
}

function updateGlobalRanking() {
	globalDojo.roster.sort(function(a, b){
		return b.score - a.score;
	});
	
	var gList = document.getElementById("globalList");
	gList.innerHTML = "";
	for (var i = 0; i < globalDojo.roster.length; i++) {
		var newEntry = document.createElement("li");
		newEntry.innerHTML = globalDojo.roster[i].name;
		gList.appendChild(newEntry);
	}
}

function deleteTrash(cl) {
	var trash = document.getElementsByClassName(cl + " trash");
	for (var i = 0; i < trash.length; i++) {
		trash[i].parentNode.removeChild(trash[i]);
	}
}

function displayFighter(pos, fighter, wl, end) {
	var side = "";
	var block = "";
	var winloseClass = "";
	var winloseId = "";
	var newColor = "";
	if (pos == LEFT) {
		side = "left";
		block = "leftblock"
		newColor = cycleColor(LEFTCOLORS, leftColorNav);
	}
	else {
		side = "right";
		block = "rightblock";
		newColor = cycleColor(RIGHTCOLORS, rightColorNav);
	}

	if (wl == LOSE) {
		winloseClass = " loseBlock";
		winloseId = "loseBlock";
	}
	else if (wl == WIN) {
		winloseClass = " winBlock";
		winloseId = "winBlock";
	}

	deleteTrash(winloseClass);

	if (animations && wl != -1) {
		var div = document.getElementById(block);
		var oldBlock = div.cloneNode(true); 
		oldBlock.id = winloseId;
		oldBlock.style.transition = "transform 400ms";
		oldBlock.style.zIndex = 2;
		document.getElementById(side).appendChild(oldBlock);
		window.getComputedStyle(oldBlock).transform;
		oldBlock.className += winloseClass + " trash";
	}

	document.getElementById(block).innerHTML = fighter.name;

	if (end) {
		document.getElementById(block).style.backgroundColor = "#13191c";
	}
	else {
		document.getElementById(block).style.backgroundColor = newColor;
	}

}
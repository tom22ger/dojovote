Array.prototype.swap = function(a,b) {
	var temp = this[a];
	this[a] = this[b];
	this[b] = temp;
	return this;
}

Array.prototype.shuffle = function() {
    var j, x, i;
    for (i = this.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this[i];
        this[i] = this[j];
        this[j] = x;
    }
    return this;
}

function addClass(id, cl) {
	var e = document.getElementById(id);
	e.className += " " + cl;
}

function removeClass(id, cl) {
	var e = document.getElementById(id);
	e.classList.remove(cl);
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie(cname) {
	var user = getCookie(cname);
	if (user == "") {
		return false;
	} 
	else {
		return true;
	}
}


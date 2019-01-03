var numSlots = 2;

document.addEventListener('keypress', function(event) {

	switch(event.keyCode) {
		case 13:
			event.preventDefault();
			break;
	}
});

document.addEventListener('keyup', function(event) {

	switch(event.keyCode) {
		case 13:
			enterBehav();
			break;
		case 8:
		case 46:
			backspaceBehav();
	}
});


function enterBehav() {
	console.log("enter");
	var active = document.activeElement;
	if (active.className == "fighterSlot" && active.value != "") {
		if (active.id == "f" + numSlots) {
			addFighterSlot();
		}
		else {
			var nextSlot = active.nextElementSibling;
			nextSlot.focus();
			nextSlot.scrollIntoView();
		}
	}
	else if (active.id == "titleField") {
		document.getElementById("f1").focus();
	}
}

function backspaceBehav() {
	console.log("bs");
	var active = document.activeElement;
	if (active.className == "fighterSlot" && active.value == "" && active.id != "f1" && active.id != "f2") {
		var previousSlot = active.previousElementSibling;
		active.parentNode.removeChild(active);
		numSlots--;
		previousSlot.focus();
		previousSlot.scrollIntoView();
	}
	else if (active.className == "fighterSlot" && active.value == "" && active.id == "f2") {
		var previousSlot = document.getElementById("f1");
		previousSlot.focus();
		previousSlot.scrollIntoView();
	}
}

function addFighterSlot() {
	/*if (document.getElementById("f" + numSlots).value != "") {
		numSlots++;
		var slot = document.createElement("input");
		slot.classList = "fighterSlot";
		slot.id = "f" + numSlots;
		slot.name = "fighter[]";
		var list = document.getElementById("addedFighters");
		list.appendChild(slot);
		slot.focus();
		slot.scrollIntoView();
	}*/
	numSlots++;
	var slot = document.createElement("input");
	slot.classList = "fighterSlot";
	slot.id = "f" + numSlots;
	slot.name = "fighter[]";
	var list = document.getElementById("addedFighters");
	list.appendChild(slot);
	slot.focus();
	slot.scrollIntoView();
}

function checkSubmit() {
	var t = document.getElementById("titleField").value;
	var f1v = document.getElementById("f1").value;
	var f2v = document.getElementById("f2").value;
	var submitButton = document.getElementById("submitButton");
	if (t !== "" && f1v !== "" && f2v !== "") {
		submitButton.removeAttribute("disabled");
		submitButton.style.backgroundColor = "#ff4081";
	}
	else {
		submitButton.setAttribute("disabled","true");
		submitButton.style.backgroundColor = "#fff4"
	}
}
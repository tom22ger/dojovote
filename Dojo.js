function Dojo (nm, auth, key, state, fList, rList, aNav, nc){
	this.name = nm;
	this.author = auth;
	this.key = key;
	this.dojoState = state;
	this.fighterList = fList;
	this.numFighters = fList.length;
	this.rankedList = rList;
	this.arrayNav = aNav;
	this.newChallenger = nc;

	this.logFighters = function(arr) {
		var str = "";
		for (var i = 0; i < arr.length; i++) {
			str += arr[i].name + "(" + arr[i].score + ")" + ", ";
		}
		console.log(str);
	}
	this.fight = function(pos) {

		if (this.newChallenger != pos) {
			this.fighterList.swap(this.arrayNav, this.arrayNav - 1);
		}

		this.fighterList[this.arrayNav].score += this.fighterList[this.arrayNav - 1].score + 1;

		this.arrayNav++;

		if (this.arrayNav == this.numFighters) {
			if (this.declareWinner(pos) == CLOSED) {
				this.dojoState = CLOSED;
				//	console.log("dojoState:" + this.dojoState);
				return;
			}
		}
		else {
			if (pos == LEFT) {
				displayFighter(RIGHT, this.fighterList[this.arrayNav], 0);
				this.newChallenger = RIGHT;
			}
			else {
				displayFighter(LEFT, this.fighterList[this.arrayNav], 0);
				this.newChallenger = LEFT;
			}
		}
		saveDojoCookie();
		//	this.logFighters(this.fighterList);
		// console.log(this.arrayNav);
	};
	this.favorite = function(pos) {
		//	this.logFighters(this.fighterList);
		if (this.newChallenger != pos) {
			this.fighterList.swap(this.arrayNav, this.arrayNav - 1);
		}
		//	this.logFighters(this.fighterList);
		this.fighterList[this.arrayNav].score += this.fighterList[this.arrayNav - 1].score + 1;

		this.fighterList.swap(this.arrayNav, this.numFighters - 1);

		this.fighterList[this.numFighters - 1].score = this.numFighters - 1;
		//	this.logFighters(this.fighterList);

		this.arrayNav = this.numFighters;
		if (this.arrayNav == this.numFighters) {
			if (this.declareWinner(pos) == CLOSED) {
				this.dojoState = CLOSED;
				//	console.log("dojoState:" + this.dojoState);
				return;
			}
		}
		saveDojoCookie();
		//	this.logFighters(this.fighterList);
	}
	this.declareWinner = function(pos) {
		//	console.log(this.fighterList[this.arrayNav - 1].name + "(" + this.fighterList[this.arrayNav - 1].score + ")");
		addWinner(this.fighterList[this.arrayNav - 1])
		this.rankedList.push(this.fighterList.pop());
		this.arrayNav--;
		this.numFighters--;
		//	console.log(this.arrayNav);
		this.logFighters(this.rankedList);
		//	console.log("numFighters: " + this.numFighters);
		if (this.numFighters <= 0) {
			//	this.logFighters(this.rankedList);
			this.closeDojo();
			saveDojoCookie();
			return CLOSED;
		}
		else {
			if (this.fighterList[this.arrayNav - 1].score == this.numFighters - 1) {
				if (this.declareWinner() == CLOSED) {
					if (pos == LEFT) {
						displayFighter(LEFT, BLANKFIGHTER, 1, true);
						displayFighter(RIGHT, BLANKFIGHTER, 0, true);
					}
					else {
						displayFighter(LEFT, BLANKFIGHTER, 0, true);
						displayFighter(RIGHT, BLANKFIGHTER, 1, true);
					}
					saveDojoCookie();
					return CLOSED;
				}
			}
			else {

				this.arrayNav--;
				while (this.numFighters > 2 && this.arrayNav > 1 && this.fighterList[this.arrayNav - 1].score == 0) {
					this.arrayNav--;
				}

				if (pos == LEFT) {
					displayFighter(0, this.fighterList[this.arrayNav - 1], 1);
					displayFighter(1, this.fighterList[this.arrayNav], 0);
				}
				else {
					displayFighter(0, this.fighterList[this.arrayNav - 1], 0);
					displayFighter(1, this.fighterList[this.arrayNav], 1);
				}

				this.newChallenger = 1;
				saveDojoCookie();
				return OPEN;
			}

		}
	}
	this.openDojo = function() {
		displayFighter(LEFT,this.fighterList[this.arrayNav-1],NOANIMATION);
		displayFighter(RIGHT,this.fighterList[this.arrayNav],NOANIMATION);
		this.dojoState = OPEN;
	}
	this.closeDojo = function() {
		console.log("Dojo Closed");
		if (!menuExpanded) {
			showPersonal();
			toggleMenu();
			sendResults();
		}
		this.dojoState = CLOSED;
	}
}

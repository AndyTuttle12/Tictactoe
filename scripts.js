var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
var computerPlayer = false;
var multiPlayer = false;
var totalRowCount = 0;
// var needASquare = true;
var winningCombos = [
	['A1', 'B1', 'C1'],
	['A2', 'B2', 'C2'],
	['A3', 'B3', 'C3'],
	['A1', 'A2', 'A3'],
	['B1', 'B2', 'B3'],
	['C1', 'C2', 'C3'],
	['A1', 'B2', 'C3'],
	['A3', 'B2', 'C1']
];

function onePlayerGame(){
	computerPlayer = true;
	document.getElementById('chooseGame').innerHTML = "";
	document.getElementById('onePlayer').style.display = "none";
	document.getElementById('twoPlayer').style.display = "none";
}

function twoPlayerGame(){
	multiPlayer = true;
	document.getElementById('chooseGame').innerHTML = "";
	document.getElementById('twoPlayer').style.display = "none";
	document.getElementById('onePlayer').style.display = "none";
}

function resetGame(){
	if(someoneWon || noWinner){
		document.getElementById('reset').style.display = "none";
		document.getElementById('onePlayer').style.display = "inline-block";
		document.getElementById('twoPlayer').style.display = "inline-block";
		whosTurn = 1;
		player1Squares = [];
		player2Squares = [];
		someoneWon = false;
		computerPlayer = false;
		multiPlayer = false;
		totalRowCount = 0;
		document.getElementById('message').innerHTML = "";
		document.getElementById('tieMessage').innerHTML = "";
		var squareDivs = document.getElementsByClassName('square');
		for(var i = 0; i < 9; i++){
			squareDivs[i].innerHTML = " ";
			squareDivs[i].className = "square";
		}
	}
}

function markSquare(currentSquare){
	if(multiPlayer || computerPlayer){
		// console.log(square.id);
		if(currentSquare.innerHTML == "X" || currentSquare.innerHTML == "O"){
			// console.log("Someone already moved there. Stop cheating!");
			return "taken";
		}else if(someoneWon){
			console.log('Someone already won!');
		}else{
			if(whosTurn === 1){
				currentSquare.innerHTML = "X";
				whosTurn = 2;
				player1Squares.push(currentSquare.id);
				checkWin(1, player1Squares);
				if(computerPlayer){
					computerMove();
				}
			}else{
				currentSquare.innerHTML = "O";
				player2Squares.push(currentSquare.id);
				whosTurn = 1;
				checkWin(2, player2Squares);
			}
		}
	}else{
		var choose = "Please choose a game type to begin.";
		document.getElementById('chooseGame').innerHTML = choose;
	}
}

function checkWin(whoJustWent, currentPlayerSquares){
	totalRowCount++;
	// outer loop
	for(var i = 0; i < winningCombos.length; i++){
		// inner loop
		var rowCount = 0;
		for(var j = 0; j < winningCombos[i].length; j++){
			// console.log(winningCombos[i][j]);
			var winningSquare = winningCombos[i][j];
			if(currentPlayerSquares.indexOf(winningSquare) > -1){
				// Player has this square somewhere: Ka-boom!
				rowCount++;
			}
		}
		// console.log("Combo Completed");
		if(rowCount === 3){
			console.log("Player " + whoJustWent +" Won!");
			gameOver(whoJustWent, winningCombos[i]);
			break;
		}else if(rowCount !== 3 && totalRowCount === 9){
			tieGame();
		}
	}
}

function computerMove(){
	var needASquare = true;
	// Go find a random Square. Use Machine learning.
	var squareDivs = document.getElementsByClassName('square');
	while(needASquare){
		var randomNumber = (Math.ceil(Math.random() * 8) + 1);
		var randomSquare = squareDivs[randomNumber];
		isTaken = markSquare(randomSquare);
		console.log(isTaken);
		if (isTaken !== "taken"){
			needASquare = false;
		}
	}


}


function gameOver(whoJustWon, winningCombo){
	var message = "Congrats to player " + whoJustWon + ". You just won with " + winningCombo + "!";
	document.getElementById('message').innerHTML = message;
	for(var i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square';
	}
	someoneWon = true;
	document.getElementById("reset").style.display = "inline-block";
}

function tieGame(){
	var tieMessage = "Neither of you won... ";
	document.getElementById('tieMessage').innerHTML = tieMessage;
	var squareEl = document.getElementsByClassName('square');
	for(var i = 0; i < 9; i++){
		squareEl[i].className += ' tie-square';
	}
	noWinner = true;
	document.getElementById("reset").style.display = "inline-block";
}

var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
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

function markSquare(currentSquare){
	// console.log(square.id);
	if(currentSquare.innerHTML == "X" || currentSquare.innerHTML == "O"){
		console.log("Someone already moved there. Stop cheating!");
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
}

function checkWin(whoJustWent, currentPlayerSquares){
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
}

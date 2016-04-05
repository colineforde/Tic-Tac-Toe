// Pseudocode: Start by making a Game class for tictac toe. It will have two players, need to keep track of which player has made the last move/current player, and check the board to see if there is a winner. Every time a player goes, it needs to check if the move is valid, if so, update the board, check for a winner, and if there is no winner but still empty spots, the next player goes and the game switches players. After each turn, the game checks to see if there is a winner by checking vertically, horizontally, and diagonally to see if there are three x's or o's in a row. If so, the game is over. //


// var c = document.getElementById("ticTacToe");
// var ctx = c.getContext("2d");
// var drawGame = function() {
// 	ctx.clearRect(0,0, c.width, c.height);
// 	//draw board lines
// 	ctx.beginPath()
// 	ctx.lineWidth=15;
// 	ctx.moveTo(0, 200);
// 	ctx.lineTo(600,200);
// 	ctx.moveTo(0, 400);
// 	ctx.lineTo(600,400);
// 	ctx.moveTo(200, 0);
// 	ctx.lineTo(200,600);
// 	ctx.moveTo(400, 0);
// 	ctx.lineTo(400,600);
// 	ctx.closePath()
// 	//draw icons
// 	ctx.font="325px Arial"
// 	ctx.fillStyle="black"
// 	for (y = 0; y < game.board.length; y ++) {
// 		row = game.board[y]
// 		for(x = 0; x < row.length; x ++) {
// 			ctx.fillText(row[x], (x * 200) + 10, (y * 200) + 185)
// 		}
// 	}
// 	ctx.stroke();
// 	//write winner
// 	ctx.beginPath()
// 	if (game.winner()) {
// 		ctx.fillStyle="red"
// 		ctx.font="100px Arial"
// 		ctx.fillText(game.winner().icon + " wins!", 150, 350)
// 	}
// 	ctx.closePath()
// 	ctx.stroke();
// 	ctx.font="50px Arial"
// 	ctx.fillText("X : " + player1.score, 100, 650);
// 	ctx.fillText("O : " + player2.score, 400, 650);
// 	ctx.stroke();
// }
// var mainloop = function () {
//         drawGame();
// }
// var startGame = function() {
// 	c.addEventListener('click', function(event) {
// 		if (game.gameOver()) {
// 			game.resetGame();
// 		};
// 		var x = event.pageX - c.offsetLeft,
// 			y = event.pageY - c.offsetTop
// 			game.makeMove(Math.floor(x/200), Math.floor(y/200))
// 	}, false);
// 	setInterval(mainloop, 1000/60);
// }
// startGame()

// var player1 = {
// 	icon: 'x',
// 	score: 0
// }

// var player2 = {
// 	icon: 'o',
// 	score: 0
// }

// var game = {
// 	board: [[" "," "," "], [" "," "," "], [" "," "," "]],
// 	currentPlayer: player1,
// 	nextPlayer: player2,
// 	makeMove: function(x,y) {
// 		if (this.validMove(x,y)) {
// 			this.board[y][x] = this.currentPlayer.icon
// 			this.score();
// 			var player = this.currentPlayer
// 			this.currentPlayer = this.nextPlayer
// 			this.nextPlayer = player
// 		}
// 	},

// 	validMove: function(x,y) {
// 		return this.board[y][x] === " "
// 	},

// 	gameOver: function(x,y) {
// 		return this.winner() || this.boardFilled() 
// 	},

// 	boardFilled: function() {
// 		return !this.board.some(row => row.some(space => space === " "))
// 	},

// 	winner: function() {
// 		var currentWinner = false;
// 		[player1, player2].forEach(player => {
// 			//check for horizontal three in a row
// 			this.board.forEach(row => {
// 				if (row.every(space => space === player.icon)) {
// 					currentWinner = player 
// 				}
// 			})
// 			//check for vertical three in row
// 			var transposedBoard = this.board[0].map((col, i) => {
// 				return this.board.map((row) => {
// 					return row[i];
// 				})
// 			});
// 			transposedBoard.forEach(row => {
// 				if (row.every(space => space === player.icon)) {
// 					currentWinner = player 
// 				}
// 			})
// 			// check top left and top right diagonal for wins. 
// 			var topLeftDiag = []
// 			this.board.forEach((row, rowIndex) => {
// 				row.forEach((space, spaceIndex) => {
// 					if (spaceIndex === rowIndex) {
// 						topLeftDiag.push(space)
// 					}		
// 				})
// 			})
// 			if (topLeftDiag.every(space => space === player.icon)) {
// 				currentWinner = player 
// 			}
// 			// check top right diagonal for wins 
// 			var topRightDiag = []
// 			this.board.forEach((row, rowIndex) => {
// 				row.forEach((space, spaceIndex) => {
// 					if (spaceIndex + rowIndex === 2) {
// 						topRightDiag.push(space)
// 					}		
// 				})
// 			})
// 			if (topRightDiag.every(space => space === player.icon)) {
// 				currentWinner = player
// 			}
// 		})
// 		return currentWinner
// 	}, 

// 	resetGame: function() {
// 		this.board = [[" "," "," "], [" "," "," "], [" "," "," "]]
// 	},

// 	score: function() {
// 		if (this.winner() === player1) {
// 			player1.score += 1; 
// 		}else if (this.winner() == player2) {
// 			player2.score += 1; 
// 		}
// 	}	
// }


// Refactored


var c = document.getElementById("ticTacToe");
var ctx = c.getContext("2d");
var drawGame = function() {
	ctx.clearRect(0,0, c.width, c.height);
	//draw board lines
	ctx.beginPath()
	ctx.lineWidth=15;
	ctx.moveTo(0, 200);
	ctx.lineTo(600,200);
	ctx.moveTo(0, 400);
	ctx.lineTo(600,400);
	ctx.moveTo(200, 0);
	ctx.lineTo(200,600);
	ctx.moveTo(400, 0);
	ctx.lineTo(400,600);
	ctx.closePath()
	//draw icons
	ctx.font="325px Arial"
	ctx.fillStyle="black"
	for (y = 0; y < game.board.length; y ++) {
		row = game.board[y]
		for(x = 0; x < row.length; x ++) {
			ctx.fillText(row[x], (x * 200) + 10, (y * 200) + 185)
		}
	}
	ctx.stroke();
	//write winner
	ctx.beginPath()
	if (game.winner()) {
		ctx.fillStyle="red"
		ctx.font="100px Arial"
		ctx.fillText(game.winner().icon + " wins!", 150, 350)
	}
	ctx.closePath()
	ctx.stroke();
	ctx.font="50px Arial"
	ctx.fillText("X : " + player1.score, 100, 650);
	ctx.fillText("O : " + player2.score, 400, 650);
	ctx.stroke();
}
var mainloop = function () {
        drawGame();
}
var startGame = function() {
	c.addEventListener('click', function(event) {
		if (game.gameOver()) {
			game.resetGame();
		};
		var x = event.pageX - c.offsetLeft,
			y = event.pageY - c.offsetTop
			game.makeMove(Math.floor(x/200), Math.floor(y/200))
	}, false);
	setInterval(mainloop, 1000/60);
}
startGame()

var player1 = {
	icon: 'x',
	score: 0
}

var player2 = {
	icon: 'o',
	score: 0
}

var game = {
	board: [[" "," "," "], [" "," "," "], [" "," "," "]],
	currentPlayer: player1,
	nextPlayer: player2,
	makeMove: function(x,y) {
		if (this.validMove(x,y)) {
			this.board[y][x] = this.currentPlayer.icon
			this.score();
			var player = this.currentPlayer
			this.currentPlayer = this.nextPlayer
			this.nextPlayer = player
		}
	},

	validMove: function(x,y) {
		return this.board[y][x] === " "
	},

	gameOver: function(x,y) {
		return this.winner() || this.boardFilled() 
	},

	boardFilled: function() {
		return !this.board.some(row => row.some(space => space === " "))
	},

	winner: function() {
		var currentWinner = false;
		[player1, player2].forEach(player => {
			//check for horizontal three in a row
			this.board.forEach(row => {
				if (row.every(space => space === player.icon)) {
					currentWinner = player 
				}
			})
			//check for vertical three in row
			var transposedBoard = this.board[0].map((col, i) => {
				return this.board.map((row) => {
					return row[i];
				})
			});
			transposedBoard.forEach(row => {
				if (row.every(space => space === player.icon)) {
					currentWinner = player 
				}
			})
			// check top left and top right diagonal for wins. 
			var topLeftDiag = []
			this.board.forEach((row, rowIndex) => {
				row.forEach((space, spaceIndex) => {
					if (spaceIndex === rowIndex) {
						topLeftDiag.push(space)
					}		
				})
			})
			if (topLeftDiag.every(space => space === player.icon)) {
				currentWinner = player 
			}
			// check top right diagonal for wins 
			var topRightDiag = []
			this.board.forEach((row, rowIndex) => {
				row.forEach((space, spaceIndex) => {
					if (spaceIndex + rowIndex === 2) {
						topRightDiag.push(space)
					}		
				})
			})
			if (topRightDiag.every(space => space === player.icon)) {
				currentWinner = player
			}
		})
		return currentWinner
	}, 

	resetGame: function() {
		this.board = [[" "," "," "], [" "," "," "], [" "," "," "]]
	},

	score: function() {
		if (this.winner()) {
			this.winner().score += 1;
		}
	}	
}
// Reflection
// What was the most difficult part of this challenge? - Making the arrays in javascript match up to the spots in Canvas/Html. It involved a bit of math to divide up the sections and have them each correspond to an array. 
// What did you learn about creating objects and functions that interact with one another? - You are able to call functions within other functions. I already knew it, but it was interesting to see how they relate to one another. 
// Did you learn about any new built-in methods you could use in your refactored solution? If so, what were they and how do they work? - I learned about .every, .some, and .forEach, the equivalent of .all?, .any?, and .each in Ruby. I also learned that adding a second argument to any of them will give you the index. 
// How can you access and manipulate properties of objects? - By calling the bracket or dot notation of the object and assigning it to a new name. 




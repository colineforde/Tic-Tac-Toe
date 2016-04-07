
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


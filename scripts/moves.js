/*
 * This constructor manages the move log and keeps track of who's
 * turn it is to move.
 */

class Moves {
	constructor() {
		this.turn = 'W';
		this.turnStatus = $('#turnStatus');
		this.movesList = $('#movesList');
		// These variables manage whether or not a player is checked.
		this.whiteChecked = false;
		this.blackChecked = false;
	}

	/*
	 * Reset the turn to white at the start of the game.
	 */
	resetTurn() {
		this.turn = 'W';
		this.turnStatus.text('White:');
	}

	/*
	 * This logs a move to movesList. In chess the move log should show
	 * The alternation between white and black.
	 * 1. whitemove blackmove
	 * 2. W B
	 * 3. W B+
	 * 4. Kf1 ...
	 */
	logMove(move) {
		this.turn == 'W' ?
			this.movesList.append('<li>' + move + '</li>') :
			this.movesList.children().last().append(' ' + move);
	}

	logCheck(move) {
		// endsWith() is a built-in JavaScript function.
		this.logMove(move + (move.endsWith('+') ? '' : '+'));
	}

	/*
	 * Clears the move log.
	 */
	clearMoveLog() {
		$('#movesList').text('');
	}

	/*
	 * Gives the user an error message when they try to make an illegal move.
	 */
	moveError(text) {
		// alert() is a standard browser feature.
		alert('Invalid move: ' + text);
	}

	/*
	 * Switch who's turn it is to move.
	 */
	switchTurn() {
		this.turn = (this.turn == 'W' ? 'B' : 'W');
		this.turnStatus.text(this.turn == 'W' ? 'White:' : 'Black:');
	}

	verify(piece, move) {
	}
}
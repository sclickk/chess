/*
 * This constructor manages the move log and keeps track of who's
 * turn it is to move.
 */
function Moves()
{
  this.turn = 'W';
  this.turnStatus = $('#turnStatus');
  this.movesList = $('#movesList');
  // These variables manage whether or not a player is checked.
  this.whiteChecked = false;
  this.blackChecked = false;

  /*
   * Switch who's turn it is to move.
   */
  this.switchTurn = function () {
    this.turn = (this.turn == 'W' ? 'B' : 'W');
    this.turnStatus.text(this.turn == 'W' ? 'White:' : 'Black:');
  }

  /*
   * Reset the turn to white at the start of the game.
   */
  this.resetTurn = function () {
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
  this.logMove = function (move) {
    this.turn == 'W' ?
      this.movesList.append('<li>' + move + '</li>'):
      this.movesList.children().last().append(' ' + move);
  }

  this.logCheck = function(move) {
    // endsWith() is a built-in JavaScript function.
    this.logMove(move + (move.endsWith('+') ? '' : '+'));
  }

  /*
   * Clears the move log.
   */
  this.clearMoveLog = function () {
    $('#movesList').text('');
  }

  /*
   * Gives the user an error message when they try to make an illegal move.
   */
  this.moveError = function (text) {
    // alert() is a standard browser feature.
    alert('Invalid move: ' + text);
  }

  this.verify = function (piece, move) {
  }
}
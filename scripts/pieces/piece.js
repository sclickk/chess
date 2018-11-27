/*
 * The classes King, Queen, Rook, Knight, Bishop, and Pawn all inherit
 * properties and functions from this class. It stores properties that they all
 * have in common:
 * - pos = a position on the board.
 * - char = a character that visually represents the piece on the board.
 * - color = the color (or player) a piece plays for.
 * - rangeOfMovement = where a piece can move, different for every type of piece.
 */
function Piece(pos, char) {
  var t = new Tile();
  if (pos != undefined) {
    if (pos.match(/[a-h][1-8]/)) {
      this.pos = pos;
      this.file = this.pos[0];
      this.rank = this.pos[1];
    } else {
      console.warn("A piece's position can't be " + pos);
    }
    this.char = char;
    this.color = t.getPieceColor(this.char);
    this.rangeOfMovement = new Array();
  }

  /*
   * This manages instances whereby a rule depends on whether on not a piece
   * has moved, such as castling.
   */
  this.timesMoved = 0;

  t.set(this.pos, this.char);

  /*
   * Returns a boolean that determines whether or not the piece is captured.
   */
  this.isDead = function () {
    return t.get(this.pos) != this.char ? true : false;
  }

  /*
   * Change the current position to newPos.
   */
  this.changePos = function (newPos) {
    t.set(this.pos, "");
    this.pos = newPos;
    t.set(newPos, this.char);
    this.timesMoved++;
  }

  /*
   * FIDE 3.1 states:
   *   It is not permitted to move a piece to a square occupied by a piece of
   * the same colour. If a piece moves to a square occupied by an opponent’s
   * piece the latter is captured and removed from the chessboard as part of
   * the same move.
   * 
   * TL;DR No piece can capture it's own pieces.
   */
  // TODO: Fill up this function
  this.filterMovement = function () {

  }
}
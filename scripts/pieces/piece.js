/*
 * The classes King, Queen, Rook, Knight, Bishop, and Pawn all inherit
 * properties and functions from this class. It stores properties that they all
 * have in common:
 * - pos = a position on the board.
 * - char = a character that visually represents the piece on the board.
 * - color = the color (or player) a piece plays for.
 * - rangeOfMovement = where a piece can move, different for every type of piece.
 */
class Piece
{
  constructor(pos, char)
  {
    if (pos.match(/[a-h][1-8]/)) {
      this.pos = pos;
      this.file = this.pos[0];
      this.rank = this.pos[1];
    } else {
      console.warn("A piece's position can't be " + pos);
    }
    this.char = char;
    this.color = Tile.getPieceColor(this.char);
    this.rangeOfMovement = new Array();
    /**
     * This manages instances whereby a rule depends on whether on not a piece
     * has moved, such as castling.
     */
    this.timesMoved = 0;
    Tile.set(this.pos, this.char);
  }

  /**
   * Change the current position of the piece.
   * @param newPos The new position of the piece
   */
  changePos(newPos)
  {
    // Empty the "square of departure".
    Tile.set(this.pos, "");
    // Change the pos variable.
    this.pos = newPos;
    // Place the piece on the "square of arrival".
    Tile.set(newPos, this.char);
    // Increment timesMoved.
    this.timesMoved++;
  };

  /**
   * Returns a boolean that determines whether or not the piece is captured.
   */
  isDead()
  {
    return Tile.get(this.pos) != this.char ? true : false;
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
  filterMovement()
  {
  }
}

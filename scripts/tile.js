class Tile {
  constructor(pos) {
    this.pos = pos;
    this.tileHTML = "<td class=\"tile\" id=\"" + this.pos + "\"></td>\n";
  }

  /*
   * Change the piece that's on a tile.
   */
  set(tile, piece) {
    $('#' + tile).text(piece);
  }

  /*
   * Returns the piece currently on a tile.
   */
  get(tile) {
    return this.exists(tile) ? $('#' + tile).text() : "";
  }

  /*
   * This function takes in a tile and determines the color of a piece on it.
   * You ask "What player owns the piece on tile [a3, e4, etc.]?" and it
   * returns "W", "B", or "E" (empty).
   */
  getPieceColor(tile) {
    if (tile.match(/[♙♖♘♗♕♔]/)) {
      return "W";
    } else if (tile.match(/[♟♜♞♝♛♚]/)) {
      return "B";
    } else {
      return "E";
    }
  }

  /*
   * Determine whether or not a given notation is valid for a
   * position on the board.
   */
  exists(tile) {
    // Regular expressions let us match coordinate notation more easily.
    if (tile.length == 2 && tile.match(/[a-h][1-8]/)) {
      return true;
    } else {
      return false;
    }
  }
}

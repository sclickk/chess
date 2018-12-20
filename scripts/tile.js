class Tile {
  constructor(pos) {
    this.pos = pos;
    this.tileHTML = "<td class=\"tile\" id=\"" + this.pos + "\"></td>\n";
  }

  /*
   * Change the piece that's on a tile.
   */
  static set(tile, piece) {
    $('#' + tile).text(piece);
  }

  /*
   * Returns the piece currently on a tile.
   */
  static get(tile) {
    return this.exists(tile) ? $('#' + tile).text() : "";
  }

  /*
   * This function takes in a tile and determines the color of a piece on it.
   * You ask "What player owns the piece on tile [a3, e4, etc.]?" and it
   * returns "W", "B", or "E" (empty).
   */
  static getPieceColor(tile) {
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
  static exists(tile) {
    // Regular expressions let us match coordinate notation more easily.
    if (tile.length == 2 && tile.match(/[a-h][1-8]/)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This function takes the coordinates of a square and returns adjusted
   * coordinates. For example:
   *   fromRef('a3', 2, -1) returns 'c2', 2 files right, 1 file down.
   * This is useful when determining the places of boards
   * @param files The number of files to adjust (negative left, positive right)
   * @param ranks The number of ranks to adjust (negative down, positive up)
   */
  static fromRef(square, files, ranks)
  {
    var square_file = toNumber(square[0]);
    var square_rank = square[1];

    if (files > 0) {
      for (let i = 0; i < files; i++) {
        square_file++;
      }
    } else if (files < 0) { // do nothing if files = 0
      for (let i = 0; i > files; i--) {
        square_file--;
      }
    }

    if (ranks > 0) {
      for (let i = 0; i < ranks; i++) {
        square_rank++;
      }
    } else if (ranks < 0) { // do nothing if ranks = 0
      for (let i = 0; i > ranks; i--) {
        square_rank--;
      }
    }

    return (toLetter(square_file) + square_rank);
  }
}

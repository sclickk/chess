class Queen extends Piece {
  constructor(pos, color) {
    super(pos, color == "W" ? "♕" : "♛");
  }
}

/*
 * The queen is by far the most powerful piece on the board. It
 * can move any number of pieces in a straight line horizontally,
 * vertically, or diagonally, but still can't jump over other pieces.
 *
 * This code is straight up stolen from the rook and the bishop. For
 * more info on how this works, look there.
 */
Queen.prototype.getRangeOfMovement = function () {
  var range = new Array();
  var tiles = new Array();
  var oppositeColor = (this.color == "W" ? "B" : "W");
  // Add every tile to the left of the queen.
  for (var i = toNumber(this.pos[0]); i >= 0; i--) {
    var c = Tile.fromRef(this.pos, i, 0);
    // Make sure the tile actually exists.
    if (Tile.exists(c)) {
      // Don't add the current position of the rook.
      if (c != this.pos) {
        // When it evaluates the next tile, one of the following
        // should happen:
        // * If the tile is empty, just add the tile and evaluate the next.
        // * If the tile has a piece:
        //   * If it's color is the opposite of this piece:
        //     * Add the tile and break the loop.
        //   * If it's color is the same of this piece:
        //     * Break the loop.
        if (Tile.getPieceColor(Tile.get(c)) == oppositeColor) {
          range = range.concat(c);
          i = -100;
        }
        else if (Tile.getPieceColor(Tile.get(c)) == this.color) {
          i = -100;
        }
        else {
          range = range.concat(c);
        }
      }
    }
  }
  // Add every tile to the right of the queen.
  for (var i = toNumber(this.pos[0]); i <= 8; i++) {
    var c = Tile.fromRef(this.pos, i, 0);
    if (Tile.exists(c)) {
      if (c != this.pos) {
        if (Tile.getPieceColor(Tile.get(c)) == oppositeColor) {
          range = range.concat(c);
          i = 100;
        }
        else if (Tile.getPieceColor(Tile.get(c)) == this.color) {
          i = 100;
        }
        else {
          range = range.concat(c);
        }
      }
    }
  }
  // Add every tile below the queen.
  for (var i = this.pos[1]; i >= 0; i--) {
    var c = Tile.fromRef(this.pos, 0, i);
    if (Tile.exists(c)) {
      if (c != this.pos) {
        if (Tile.getPieceColor(Tile.get(c)) == oppositeColor) {
          range = range.concat(c);
          i = -100;
        }
        else if (Tile.getPieceColor(Tile.get(c)) == this.color) {
          i = -100;
        }
        else {
          range = range.concat(c);
        }
      }
    }
  }
  // Add every tile above the queen.
  for (var i = this.pos[1]; i <= 8; i++) {
    var c = Tile.fromRef(this.pos, 0, i);
    if (Tile.exists(c)) {
      if (c != this.pos) {
        if (Tile.getPieceColor(Tile.get(c)) == oppositeColor) {
          range = range.concat(c);
          i = 100;
        }
        else if (Tile.getPieceColor(Tile.get(c)) == this.color) {
          i = 100;
        }
        else {
          range = range.concat(c);
        }
      }
    }
  }
  // Add every tile to the up-right of the queen.
  for (var i = 0; i <= 8; i++) {
    var c = Tile.fromRef(this.pos, i, i);
    if (Tile.exists(c)) {
      if (c != this.pos) {
        if (Tile.getPieceColor(Tile.get(c)) == this.color) {
          i = 10;
        }
        else if (Tile.getPieceColor(Tile.get(c)) == oppositeColor) {
          range = range.concat(c);
          i = 10;
        }
        else {
          range = range.concat(c);
        }
      }
    }
  }
  // Add every tile to the botton-left of the queen.
  for (var i = 0; i <= 8; i++) {
    var c = Tile.fromRef(this.pos, -i, -i);
    if (Tile.exists(c)) {
      if (c != this.pos) {
        if (Tile.getPieceColor(Tile.get(c)) == this.color) {
          i = 10;
        }
        else if (Tile.getPieceColor(Tile.get(c)) == oppositeColor) {
          range = range.concat(c);
          i = 10;
        }
        else {
          range = range.concat(c);
        }
      }
    }
  }
  // Add every tile to the bottom-right of the queen.
  for (var i = 0; i <= 8; i++) {
    var c = Tile.fromRef(this.pos, i, -i);
    if (Tile.exists(c)) {
      if (c != this.pos) {
        if (Tile.getPieceColor(Tile.get(c)) == this.color) {
          i = 10;
        }
        else if (Tile.getPieceColor(Tile.get(c)) == oppositeColor) {
          range = range.concat(c);
          i = 10;
        }
        else {
          range = range.concat(c);
        }
      }
    }
  }
  // Add every tile to the up-left of the queen.
  for (var i = 0; i <= 8; i++) {
    var c = Tile.fromRef(this.pos, -i, i);
    if (Tile.exists(c)) {
      if (c != this.pos) {
        if (Tile.getPieceColor(Tile.get(c)) == this.color) {
          i = 10;
        }
        else if (Tile.getPieceColor(Tile.get(c)) == oppositeColor) {
          range = range.concat(c);
          i = 10;
        }
        else {
          range = range.concat(c);
        }
      }
    }
  }
  return range;
}

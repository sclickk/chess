class Rook extends Piece {
  constructor(pos, color) {
    super(pos, color == "W" ? "♖" : "♜");
  }
}

/*
 * Rooks generally move in a straight line vertically or
 * horizontally. However, rooks can not jump over other pieces.
 * Rooks have the simplest range of movement algorithmically.
 */
Rook.prototype.getRangeOfMovement = function () {
  var range = new Array();
  var t = new Tile();
  var oppositeColor = (this.color == "W" ? "B" : "W");
  // Add every tile to the left of the rook.
  for (var i = toNumber(this.pos[0]); i >= 0; i--) {
    var c = toLetter(0 - -i) + this.pos[1];
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
  // Add every tile to the right of the rook.
  for (var i = toNumber(this.pos[0]); i <= 8; i++) {
    var c = toLetter(0 - -i) + this.pos[1];
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
  // Add every tile below the rook.
  for (var i = this.pos[1]; i >= 0; i--) {
    var c = this.pos[0] + (0 - -i);
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
  // Add every tile above the rook.
  for (var i = this.pos[1]; i <= 8; i++) {
    var c = this.pos[0] + (0 - -i);
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
  return range;
}

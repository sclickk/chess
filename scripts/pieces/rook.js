function Rook(pos, color) {
  this.p = new Piece(pos, color == "W" ? "♖" : "♜");
  this.color = this.p.color;
  this.char = this.p.char;
  this.pos = this.p.pos;
  this.isDead = this.p.isDead;
  this.rangeOfMovement = this.p.rangeOfMovement;
  this.hasMoved = this.p.hasMoved;
  this.changePos = this.p.changePos;
  
  /*
   * Rooks generally move in a straight line vertically or
   * horizontally. However, rooks can not jump over other pieces.
   * Rooks have the simplest range of movement algorithmically.
   */
  this.getRangeOfMovement = function () {
    var range = new Array();
    var t = new Tile();
    var oppositeColor = (this.color == "W" ? "B" : "W");

    // Add every tile to the left of the rook.
    for (var i = toNumber(this.pos[0]); i >= 0; i--) {
      var c = toLetter(0 - -i) + this.pos[1];
      // Make sure the tile actually exists.
      if (t.exists(c)) {
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
          if (t.getPieceColor(t.get(c)) == oppositeColor) {
            range = range.concat(c);
            i = -100;
          } else if (t.getPieceColor(t.get(c)) == this.color) {
            i = -100;
          } else {
            range = range.concat(c);
          }
        }
      }
    }
    // Add every tile to the right of the rook.
    for (var i = toNumber(this.pos[0]); i <= 8; i++) {
      var c = toLetter(0 - -i) + this.pos[1];
      if (t.exists(c)) {
        if (c != this.pos) {
          if (t.getPieceColor(t.get(c)) == oppositeColor) {
            range = range.concat(c);
            i = 100;
          } else if (t.getPieceColor(t.get(c)) == this.color) {
            i = 100;
          } else {
            range = range.concat(c);
          }
        }
      }
    }
    // Add every tile below the rook.
    for (var i = this.pos[1]; i >= 0; i--) {
      var c = this.pos[0] + (0 - -i);
      if (t.exists(c)) {
        if (c != this.pos) {
          if (t.getPieceColor(t.get(c)) == oppositeColor) {
            range = range.concat(c);
            i = -100;
          } else if (t.getPieceColor(t.get(c)) == this.color) {
            i = -100;
          } else {
            range = range.concat(c);
          }
        }
      }
    }
    // Add every tile above the rook.
    for (var i = this.pos[1]; i <= 8; i++) {
      var c = this.pos[0] + (0 - -i);
      if (t.exists(c)) {
        if (c != this.pos) {
          if (t.getPieceColor(t.get(c)) == oppositeColor) {
            range = range.concat(c);
            i = 100;
          } else if (t.getPieceColor(t.get(c)) == this.color) {
            i = 100;
          } else {
            range = range.concat(c);
          }
        }
      }
    }
    return range;
  }
}
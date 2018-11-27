function Bishop(pos, color) {
  this.p = new Piece(pos, color == "W" ? "♗" : "♝");
  this.color = this.p.color;
  this.char = this.p.char;
  this.pos = this.p.pos;
  this.isDead = this.p.isDead;
  this.rangeOfMovement = this.p.rangeOfMovement;
  this.hasMoved = this.p.hasMoved;
  this.changePos = this.p.changePos;
  
  // Bishops can move diagonally forwards or backwards. Because of this Bishops
  // can only move on tiles that are the same color as where they started. For
  // example, checking a king with only a bishop is near pointless, since the
  // king can easily defend itself by moving to vertically or horizonally to
  // another square.
  this.getRangeOfMovement = function () {
    var range = new Array(),
        t = new Tile(),
        oppositeColor = (this.color == "W" ? "B" : "W");

    // Add every tile to the up-right of the bishop.
    for (var i = 0; i <= 8; i++) {
      var c = toLetter(toNumber(this.pos[0]) - -i) + (this.pos[1] - -(i));
      if (t.exists(c)) {
        if (c != this.pos) {
          if (t.getPieceColor(t.get(c)) == this.color) {
            i = 10;
          } else if (t.getPieceColor(t.get(c)) == oppositeColor) {
            range = range.concat(c);
            i = 10;
          } else {
            range = range.concat(c);
          }
        }
      }
    }
    // Add every tile to the botton-left of the bishop.
    for (var i = 0; i <= 8; i++) {
      var c = toLetter(toNumber(this.pos[0]) - i) + (this.pos[1] - i);
      if (t.exists(c)) {
        if (c != this.pos) {
          if (t.getPieceColor(t.get(c)) == this.color) {
            i = 10;
          } else if (t.getPieceColor(t.get(c)) == oppositeColor) {
            range = range.concat(c);
            i = 10;
          } else {
            range = range.concat(c);
          }
        }
      }
    }
    // Add every tile to the bottom-right of the bishop.
    for (var i = 0; i <= 8; i++) {
      var c = toLetter(toNumber(this.pos[0]) - -i) + (this.pos[1] - (i));
      if (t.exists(c)) {
        if (c != this.pos) {
          if (t.getPieceColor(t.get(c)) == this.color) {
            i = 10;
          } else if (t.getPieceColor(t.get(c)) == oppositeColor) {
            range = range.concat(c);
            i = 10;
          } else {
            range = range.concat(c);
          }
        }
      }
    }
    // Add every tile to the up-left of the bishop.
    for (var i = 0; i <= 8; i++) {
      var c = toLetter(toNumber(this.pos[0]) - i) + (this.pos[1] - -i);
      if (t.exists(c)) {
        if (c != this.pos) {
          if (t.getPieceColor(t.get(c)) == this.color) {
            i = 10;
          } else if (t.getPieceColor(t.get(c)) == oppositeColor) {
            range = range.concat(c);
            i = 10;
          } else {
            range = range.concat(c);
          }
        }
      }
    }
    
    return range;
  }
}
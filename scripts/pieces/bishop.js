class Bishop extends Piece {
  constructor(pos, color) {
    super(pos, color == "W" ? "♗" : "♝");
  }
}

// Bishops can move diagonally forwards or backwards. Because of this Bishops
// can only move on tiles that are the same color as where they started. For
// example, checking a king with only a bishop is near pointless, since the
// king can easily defend itself by moving to vertically or horizonally to
// another square.
Bishop.prototype.getRangeOfMovement = function () {
  var range = new Array(),
      oppositeColor = (this.color == "W" ? "B" : "W");
  // Add every tile to the up-right of the bishop.
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
  // Add every tile to the botton-left of the bishop.
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
  // Add every tile to the bottom-right of the bishop.
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
  // Add every tile to the up-left of the bishop.
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

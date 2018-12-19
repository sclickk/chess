class Pawn extends Piece {
  constructor(pos, color) {
    super(pos, color == "W" ? "♙" : "♟");
  }

  /*
  * Pawns are the only piece in the game that can be promoted to another
  * type of piece.
  */
  promote(piece) {
  }
}

// Pawns can seem simple but are quite quirky pieces. Pawns can move either
// one or two pieces ahead on their first move. When one player moves two
// pieces on their first move, and the opposing player has a pawn to the left
// or right it, they can play a special move called *en passant*, where the
// opposing player can capture the pawn and move to the position where
// it is as if though they had only moved their pawn once.
Pawn.prototype.getRangeOfMovement = function () {
  var range = new Array(),
      t = new Tile();
  // This array holds tiles where the pawn is able to capture another piece.
  // Both black and white pawns capture to files adjacent to their
  // current position.
  var capture = [
    toLetter(toNumber(this.pos[0]) + 1),
    toLetter(toNumber(this.pos[0]) - 1)
  ]
  // White pawns capture upward diagonal, black pawns capture downward diagonal.
  capture[0] += ((this.color == "W") ? (this.pos[1] - -1) : (this.pos[1] - 1));
  capture[1] += ((this.color == "W") ? (this.pos[1] - -1) : (this.pos[1] - 1));
  
  // White pawns move up ranks, black pawns move down ranks.
  // Pawns are the only pieces where their direction of movement
  // depends on its color.
  if (this.color == "W") {
    // Move up one rank
    if (t.get(this.pos[0] + (this.pos[1] - -1)) == "") {
      range = range.concat(this.pos[0] + (this.pos[1] - -1));
    }
    if (this.timesMoved == 0) { // A pawn can move two pieces ahead on their first move.
      // Make sure the tile is empty.
      if (t.get(this.pos[0] + (this.pos[1] - -2)) == "") {
        range = range.concat(this.pos[0] + (this.pos[1] - -2));
      }
    }
  }
  if (this.color == "B") {
    // Move up down rank
    if (t.get(this.pos[0] + (this.pos[1] - 1)) == "") {
      range = range.concat(this.pos[0] + (this.pos[1] - 1));
    }
    range = range.concat(this.pos[0] + (this.pos[1] - 1));
    if (this.timesMoved == 0) { // A pawn can move two pieces ahead on their first move.
      // Make sure the tile is empty.
      if (t.get(this.pos[0] + (this.pos[1] - 2)) == "") {
        range = range.concat(this.pos[0] + (this.pos[1] - 2));
      }
    }
  }
  
  for (var i = 0; i < capture.length; i++) {
    // Make sure the tiles aren't off the board.
    if (t.exists(capture[i])) {
      // Make sure the tile it's trying to capture on isn't empty
      if (t.get(capture[i]) != "") {
        range = range.concat(capture[i]);
      }
    }
  }
  this.rangeOfMovement = range;
  return this.rangeOfMovement;
}
class Pawn extends Piece {
  constructor(pos, color) {
    super(pos, color == "W" ? "♙" : "♟");
  }
}

/*
 * Pawns are the only piece in the game that can be promoted to another
 * type of piece.
 */
Pawn.prototype.promote = function(piece) {
}

// Pawns can seem simple but are quite quirky pieces. Pawns can move either
// one or two pieces ahead on their first move. When one player moves two
// pieces on their first move, and the opposing player has a pawn to the left
// or right it, they can play a special move called *en passant*, where the
// opposing player can capture the pawn and move to the position where
// it is as if though they had only moved their pawn once.
Pawn.prototype.getRangeOfMovement = function () {
  var range = new Array();
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
  var parity = (this.color == "W" ? 1 : -1);

  // Move up or down one rank.
  var one_square = Tile.fromRef(this.pos, 0, parity * 1);
  if (Tile.get(one_square) == "") {
    range = range.concat(Tile.fromRef(this.pos, 0, parity * 1));
  }

  // A pawn can move two pieces ahead on their first move.
  if (this.timesMoved == 0) { 
    // Make sure the tile is empty.
    var two_squares = Tile.fromRef(this.pos, 0, parity * 2);
    if (Tile.get(two_squares) == "") {
      range = range.concat(Tile.fromRef(this.pos, 0, parity * 2));
    }
  }
  
  for (var i = 0; i < capture.length; i++) {
    // Make sure the tiles aren't off the board.
    if (Tile.exists(capture[i])) {
      // Make sure the tile it's trying to capture on isn't empty
      if (Tile.get(capture[i]) != "") {
        range = range.concat(capture[i]);
      }
    }
  }
  this.rangeOfMovement = range;
  return this.rangeOfMovement;
}
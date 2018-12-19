class King extends Piece {
  constructor(pos, color) {
    super(pos, color == "W" ? "♔" : "♚");
  }
}

/*
 * The king has the simplest range of movement: one move in any
 * direction. Like any other piece, it can't move *itself* to any
 * tile where it would be put in check.
 */
King.prototype.getRangeOfMovement = function () {
  var range = new Array();
  var tilesPreset = [
    this.pos[0] + (this.pos[1] - -1),
    this.pos[0] + (this.pos[1] - 1),
    toLetter(toNumber(this.pos[0]) - -1) + this.pos[1],
    toLetter(toNumber(this.pos[0]) - 1) + this.pos[1],
    toLetter(toNumber(this.pos[0]) - -1) + (this.pos[1] - -1),
    toLetter(toNumber(this.pos[0]) - -1) + (this.pos[1] - 1),
    toLetter(toNumber(this.pos[0]) - 1) + (this.pos[1] - -1),
    toLetter(toNumber(this.pos[0]) - 1) + (this.pos[1] - 1)
  ];
  for (var i = 0; i < tilesPreset.length; i++) {
    if (Tile.exists(tilesPreset[i])) {
      // This applies to both empty tiles as well.
      if (Tile.getPieceColor(Tile.get(tilesPreset[i])) != this.color) {
        range = range.concat(tilesPreset[i]);
      }
    }
  }
  return range;
}

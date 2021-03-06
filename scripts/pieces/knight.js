class Knight extends Piece {
  constructor(pos, color) {
    super(pos, color == "W" ? "♘" : "♞");
  }
}

// Knights can move 2 tiles in any direction, then another tile adjacent to it.
//
// In this picture, the white knight can move on any of the green squares:
// https://qph.fs.quoracdn.net/main-qimg-556ae5342fd31a53cdd43c81208056bb
Knight.prototype.getRangeOfMovement = function () {
  var range = new Array();
  var tilesPreset = new Array();
  /*
   * Based on the definition above, we can set the variables hor and vert
   * variables to 2 and 1, respectively. Then we make a loop that iterates
   * twice. After the first iteration, the variables are switched to 1 and 2,
   * respectively, switching the directions around. The first
   */
  var vert = 2;
  var hor = 1;
  for (var i = 0; i < 2; i++) {
    // Weird string concatenation happens when you use:
    //   this.pos[1] + hor
    // Instead of:
    //   this.pos[1] - -hor
    // Two negative signs = positive sign.
    tilesPreset = tilesPreset.concat(Tile.fromRef(this.pos, hor, -vert));
    tilesPreset = tilesPreset.concat(Tile.fromRef(this.pos, hor, vert));
    tilesPreset = tilesPreset.concat(Tile.fromRef(this.pos, -hor, -vert));
    tilesPreset = tilesPreset.concat(Tile.fromRef(this.pos, -hor, vert));
    var vert = 1;
    var hor = 2;
  }
  // Make sure every tile it can move to exists.
  for (var i = 0; i < tilesPreset.length; i++) {
    if (Tile.exists(tilesPreset[i])) {
      // No piece can capture it's own pieces.
      if (Tile.getPieceColor(Tile.get(tilesPreset[i])) != this.color) {
        range = range.concat(tilesPreset[i]);
      }
    }
  }
  this.rangeOfMovement = range;
  return this.rangeOfMovement;
}
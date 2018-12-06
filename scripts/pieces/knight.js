class Knight {
  constructor(pos, color) {
    this.p = new Piece(pos, color == "W" ? "♘" : "♞");
    this.color = this.p.color;
    this.char = this.p.char;
    this.pos = this.p.pos;
    this.isDead = this.p.isDead;
    this.rangeOfMovement = this.p.rangeOfMovement;
    this.timesMoved = this.p.timesMoved;
    this.changePos = this.p.changePos;
  }

  // Knights can move 2 tiles in any direction, then another tile adjacent to it.
  //
  // In this picture, the white knight can move on any of the green squares:
  // https://qph.fs.quoracdn.net/main-qimg-556ae5342fd31a53cdd43c81208056bb
  getRangeOfMovement() {
    var range = new Array();
    var tilesPreset = new Array();
    /*
     * Based on the definition above, we can set the variables hor and vert
     * variables to 2 and 1, respectively. Then we make a loop that iterates
     * twice. After the first iteration, the variables are switched to 1 and 2,
     * respectively, switching the directions around. The first
     *
     */
    var vert = 2;
    var hor = 1;
    for (var i = 0; i < 2; i++) {
      // Weird string concatenation happens when you use:
      //   this.pos[1] + hor
      // Instead of:
      //   this.pos[1] - -hor
      tilesPreset = tilesPreset.concat((toLetter(toNumber(this.pos[0]) + hor)) + (this.pos[1] - -vert));
      tilesPreset = tilesPreset.concat((toLetter(toNumber(this.pos[0]) + hor)) + (this.pos[1] - vert));
      tilesPreset = tilesPreset.concat((toLetter(toNumber(this.pos[0]) - hor)) + (this.pos[1] - -vert));
      tilesPreset = tilesPreset.concat((toLetter(toNumber(this.pos[0]) - hor)) + (this.pos[1] - vert));
      var vert = 1;
      var hor = 2;
    }
    var t = new Tile();
    // Make sure every tile it can move to exists.
    for (var i = 0; i < tilesPreset.length; i++) {
      if (t.exists(tilesPreset[i])) {
        // No piece can capture it's own pieces.
        if (t.getPieceColor(t.get(tilesPreset[i])) != this.color) {
          range = range.concat(tilesPreset[i]);
        }
      }
    }
    this.rangeOfMovement = range;
    return this.rangeOfMovement;
  }
}
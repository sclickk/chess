function King(pos, color) {
  this.p = new Piece(pos, color == "W" ? "♔" : "♚");
  this.color = this.p.color;
  this.char = this.p.char;
  this.pos = this.p.pos;
  this.isDead = this.p.isDead;
  this.rangeOfMovement = this.p.rangeOfMovement;
  this.timesMoved = this.p.timesMoved;
  this.changePos = this.p.changePos;

  /*
   * The king has the simplest range of movement: one move in any
   * direction. Like any other piece, it can't move *itself* to any
   * tile where it would be put in check.
   */
  this.getRangeOfMovement = function () {
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

    var t = new Tile();
    for (var i = 0; i < tilesPreset.length; i++) {
      if (t.exists(tilesPreset[i])) {
        // This applies to both empty tiles as well.
        if (t.getPieceColor(t.get(tilesPreset[i])) != this.color) {
          range = range.concat(tilesPreset[i]);
        }
      }
    }
    
    return range;
  }
}
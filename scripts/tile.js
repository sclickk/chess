function Tile(pos) {
  this.pos = pos;
  this.tileHTML = "<td class=\"tile\" id=\"" + this.pos + "\"></td>\n";
  /*
   * Determine whether or not a given notation is valid for a
   * position on the board.
   */
  this.exists = function (tile) {
    // Regular expressions let us match coordinate notation more easily.
    if (tile.length == 2 && tile.match(/[a-h][1-8]/)) {
      return true;
    } else {
      return false;
    }
  }
  if (pos != undefined) {
    if (document.getElementById(this.pos)) {
      console.log("hi");
      document.getElementById(this.pos).onclick = function () {
        this.pos = pos;
        document.getElementById(this.pos).style = "border: 1px solid #f00;";
        console.log("created border at " + this.pos);
      }
    }
  } else {

    /*
     * Change the piece that's on a tile.
     */
    this.set = function (tile, piece) {
      $('#' + tile).text(piece);
    }

    /*
     * Returns the piece currently on a tile.
     */
    this.get = function (tile) {
      return this.exists(tile) ? document.getElementById(tile).innerHTML : "";
    }

    /*
     * This function takes in a tile and determines the color of a piece on it.
     * You ask "What player owns the piece on tile [a3, e4, etc.]?" and it
     * returns "W", "B", or "E" (empty).
     */
    this.getPieceColor = function (tile) {
      if (tile.match(/(♙|♖|♘|♗|♕|♔)/)) {
        return "W";
      } else if (tile.match(/(♟|♜|♞|♝|♛|♚)/)) {
        return "B";
      } else {
        return "E";
      }
    }
  }
}
function CaptureLog() {
  this.whiteCapturedHTML = document.getElementById("whiteCaptured");
  this.blackCapturedHTML = document.getElementById("blackCaptured");
  /*
   * Clears the log of what pieces where captured at the start of the game.
   */
  this.clear = function () {
    this.whiteCapturedHTML.innerHTML = "⚐: ";
    this.blackCapturedHTML.innerHTML = "⚑: ";
  }
  /*
   * Log a piece being captured by a player.
   */
  this.log = function (turn, piece) {
    var captureHTML, t = new Tile();
    captureHTML = (turn == "W" ? this.whiteCapturedHTML : this.blackCapturedHTML);
    captureHTML.innerHTML += t.get(piece);
  }
}
function CaptureLog() {
  /*
   * Clears the log of what pieces where captured at the start of the game.
   */
  this.clear = function () {
    $('#whiteCaptured').text("⚐: ");
    $('#blackCaptured').text("⚑: ");
  }
  /*
   * Log a piece being captured by a player.
   */
  this.log = function (turn, piece) {
    if (turn == "W") {
      $('#whiteCaptured').append(piece);
    } else {
      $('#blackCaptured').append(piece);
    }
  }
}
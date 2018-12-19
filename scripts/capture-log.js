class CaptureLog
{
  /**
   * Create a log of what pieces have been captured in the game.
   */
  constructor()
  {
    this.whiteCaptured = $('#whiteCaptured');
    this.blackCaptured = $('#blackCaptured');
  }
  /**
   * Clears the log of what pieces where captured at the start of the game.
   */
  clear() {
    this.whiteCaptured.text("⚐: ");
    this.blackCaptured.text("⚑: ");
  }
  /**
   * Log a piece being captured by a player.
   * @param turn the current player's turn
   * @param piece the piece to be logged
   */
  log(turn, piece) {
    turn == "W" ?
      this.whiteCaptured.append(piece):
      this.blackCaptured.append(piece);
  }
}
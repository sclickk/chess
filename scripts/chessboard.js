function ChessBoard(boardHTML) {
  // Stores all 64 instances of the Tile() class.
  this.tiles = new Array();
  // Stores the 32 Piece()s.
  this.pieces = new Array();
  // Shows the guides at the top and sides of the board.
  this.guides = new Guide();
  this.boardHTML = document.getElementById(boardHTML);
  this.getRank = function (rank) {
  }
  this.getFile = function (file) {
  }
  this.exists = function (board) {
    if (board.getAttribute("isChessBoard") == "true") {
      return true;
    } else {
      return false;
    }
  }
  /*
   * This does the boilerplate work of generating 64 game tiles on the board
   * for us. A nice feature implemented here is that the ID of each tile is
   * the same as it's position on the board. To get what piece is on tile e3,
   * type:
   *   document.getElementById("e3").innerHTML;
   * Tile.get("e3") also does this.
   */
  this.create = function () {
    // Don't create a second chessboard if it's already there.
    if (!this.exists(this.boardHTML)) {
      // HTML works with tables as cells within rows, so we first, create all
      // the rows ("ranks") on the board, then we can add a tile to the
      for (var i = 8; i > 0; i--) {
        this.boardHTML.innerHTML += "<tr class=\"row\" id=\"" + i + "\"></tr>\n";
        for (var j = 1; j < 9; j++) {
          this.tiles = this.tiles.concat(new Tile(toLetter(j) + i));
        }
      }
      // Add every Tile() instance onto the board.
      for (var i = 0; i < this.tiles.length; i++) {
        document.getElementById(this.tiles[i].pos[1]).innerHTML += this.tiles[i].tileHTML;
      }
      // Mark that the board was already created.
      this.boardHTML.setAttribute("isChessBoard", "true");
    } else {
      console.warn("ChessBoard \'" + this.boardHTML.id + "\' already exists.");
    }
  }
  /*
   * This function creates variables that place the pieces on the board.
   */
  this.fill = function () {
    // For white, pawns go in rank 2, others in rank 1.
    var kingRank = "1",
        pawnRank = "2",
        playerColor = "W";
    for (var i = 0; i < 2; i++) {
      this.pieces = this.pieces.concat(new Rook("a" + kingRank, playerColor));
      this.pieces = this.pieces.concat(new Knight("b" + kingRank, playerColor));
      this.pieces = this.pieces.concat(new Bishop("c" + kingRank, playerColor));
      this.pieces = this.pieces.concat(new Queen("d" + kingRank, playerColor));
      this.pieces = this.pieces.concat(new King("e" + kingRank, playerColor));
      this.pieces = this.pieces.concat(new Bishop("f" + kingRank, playerColor));
      this.pieces = this.pieces.concat(new Knight("g" + kingRank, playerColor));
      this.pieces = this.pieces.concat(new Rook("h" + kingRank, playerColor));
      for (var j = 1; j < 9; j++) {
        this.pieces = this.pieces.concat(new Pawn(toLetter(j) + pawnRank, playerColor));
      }
      // For black, pawns go in rank 7, others in rank 8.
      kingRank = "8";
      pawnRank = "7";
      playerColor = "B";
    }
    console.log("Successfully created " + this.pieces.length + " pieces.");
    console.log(this.pieces);
  }
  /*
   * Remove every piece on the board.
   */
  this.clear = function () {
    var t = new Tile();
    for (var i = 1; i < 9; i++) {
      for (var j = 1; j < 9; j++) {
        t.set(toLetter(i) + j, "");
      }
    }
  }
}
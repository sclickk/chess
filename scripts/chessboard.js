class ChessBoard
{
  /**
   * Sets up the chessboard on the screen.
   * @param id The id of the chessboard.
   */
  constructor(id)
  {
    // Stores all 64 instances of the Tile() class.
    this.tiles = new Array();
    // Stores the 32 Piece()s.
    this.pieces = new Array();
    // Shows the guides at the top and sides of the board.
    this.guides = new Guide();
    this.board = $("#" + id);
  }
  getRank (rank) {
  }
  getFile (file) {
  }
  /**
   * Determine if the chessboard already exists.
   * @param board The id of the chessboard.
   */
  exists(board) {
    if ($('#' + board).attr("isChessBoard") == "true") {
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
  create() {
    // Don't create a second chessboard if it's already there.
    if (!this.exists(this.board.attr('id'))) {
      // HTML works with tables as cells within rows, so we first, create all
      // the rows ("ranks") on the board, then we can add a tile to the
      for (var i = 8; i > 0; i--) {
        this.board.append("<tr class=\"row\" id=\"" + i + "\"></tr>\n");
        for (var j = 1; j < 9; j++) {
          this.tiles = this.tiles.concat(new Tile(toLetter(j) + i));
        }
      }
      // Add every Tile() instance onto the board.
      for (var i = 0; i < this.tiles.length; i++) {
        var c = this.tiles[i];
        $("#" + c.pos[1]).append(c.tileHTML);
      }
      // Mark that the board was already created.
      this.board.attr("isChessBoard", "true");
    } else {
      console.warn("ChessBoard \'" + this.board.id + "\' already exists.");
    }
  }

  /**
   * Add a piece to the pieces array.
   * @param {Piece} piece The piece to add.
   */
  addPiece(piece)
  {
    this.pieces = this.pieces.concat(piece);
  }

  /*
   * This function creates variables that place the pieces on the board.
   */
  fill() {
    // For white, pawns go in rank 2, others in rank 1.
    var kingRank = "1",
        pawnRank = "2",
        playerColor = "W";
    for (var i = 0; i < 2; i++) {
      this.addPiece(new Rook("a" + kingRank, playerColor));
      this.addPiece(new Knight("b" + kingRank, playerColor));
      this.addPiece(new Bishop("c" + kingRank, playerColor));
      this.addPiece(new Queen("d" + kingRank, playerColor));
      this.addPiece(new King("e" + kingRank, playerColor));
      this.addPiece(new Bishop("f" + kingRank, playerColor));
      this.addPiece(new Knight("g" + kingRank, playerColor));
      this.addPiece(new Rook("h" + kingRank, playerColor));
      for (var j = 1; j < 9; j++) {
        this.addPiece(new Pawn(toLetter(j) + pawnRank, playerColor));
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
  clear() {
    var t = new Tile();
    for (var i = 1; i < 9; i++) {
      for (var j = 1; j < 9; j++) {
        t.set(toLetter(i) + j, "");
      }
    }
  }
}
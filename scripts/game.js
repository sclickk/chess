class Game {
  /**
   * Create a new instance of the Game() class.
   */
  constructor() {
    this.t = new Tile();
    this.moveLog = new Moves();
    document.getElementById("moveButton").addEventListener("click", (event) => {
      this.performMove(this.userInput.get());
    });
  
    document.getElementById("userInput").addEventListener("keydown", (event) => {
      var key = event.keyCode;  
      // Do the same thing when the enter key is pressed.
      if (key == 13) {
        this.performMove(this.userInput.get());
      }
    });
  }
  /*
   * This get's called once the player clicks on "New Game".
   */
  start() {
    this.userInput = new UserInput();
    this.userInput.createMiniKeyboard();
    
    this.chessBoard = new ChessBoard("board");
    $("#gameInteraction").css(
      "display", "block"
    );
    this.gameSettings = new Settings();
    this.gameSettings.showSettingsButton();
    // Creates the guides on the top and left of the board.
    this.chessBoard.guides.create();
    this.chessBoard.guides.show();
    this.chessBoard.create();
    this.chessBoard.clear(); // We don't want extra pieces laying around.
    this.chessBoard.fill();
    this.moveLog.clearMoveLog(); // Clear the move log from the last game.
    this.moveLog.resetTurn(); // Reset who's turn it is.
    this.captureLog = new CaptureLog();
    this.captureLog.clear(); // Clear the log of what pieces where captured.
  }

  /*
   * Determine if either player is in check.
   */
  checkedOpposingPlayer() {
    var opposingKing;

    // Sets opposingKing;
    for (var i = 0; i < this.chessBoard.pieces.length; i++) {
      // In PHP, C, bash, etc., I use "c" to save myself some
      // typing within loops.
      //
      // In PHP I would use:
      // for ($i = 0; $i < count($arr); $i++) {
      //   $c = $arr[$i];
      //   // add code here...
      // }
      //
      // btw, "c" stands for "case".
      var c = this.chessBoard.pieces[i];
      if (c.constructor.name == "King") {
        if (c.color != this.moveLog.turn) {
          opposingKing = c;
        }
      }
    }

    for (var i = 0; i < this.chessBoard.pieces.length; i++) {
      var c = this.chessBoard.pieces[i];
      if (c.constructor.name != "King") {
        /*
         * If any of your opposing player's pieces has your king within their
         * range of attack, your king is in check.
         */
        if (c.color == this.moveLog.turn) {
          if (c.getRangeOfMovement().indexOf(opposingKing.pos) != -1) {
            if (!c.isDead()) {
              console.log(c);
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  /*
   * Determine if an input is too long, too short, or if there is no input.
   */
  badInput(input) {
    if (input.length > 7) {
      return true;
    } else if (input.length < 2) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * Log a move and switch the the current turn.
   */
  logMoveAndSwitchTurn(input) {
    console.log("Move successful:");
    if (this.checkedOpposingPlayer()) {
      this.moveLog.logCheck(input);
      this.moveLog.turn == "W" ? this.moveLog.blackChecked = true : this.moveLog.whiteChecked = true;
    } else {
      this.moveLog.logMove(input);
      this.moveLog.turn == "W" ? this.moveLog.blackChecked = false : this.moveLog.whiteChecked = false;
    }
    this.userInput.clear();
    this.moveLog.switchTurn();
  }

  /*
   * Determine if the player will castle based on a given input.
   */
  willCastle(input) {
    if (!this.badInput(input)) {
      // O-O and O-O-O is notation for castling. This also includes 0-0 and
      // 0-0-0 in case the player confuses O with 0 (zero)
      return input.match(/(O-O(-O)?|0-0(-0)?)/) ? true : false;
    } else {
      return false;
    }
  }

  /*
   * Perform a "castling" of the king. This moves the king to position that
   * protects it behind the rook and a row of pawns.
   */
  performCastle(side, input) {
    // The row where the king and the rook should be.
    var rankToCheck = (this.moveLog.turn == "W" ? "1" : "8");
    // Stores the tiles that need to be empty in order to rook.
    var spaceNeeded;
    console.log(rankToCheck);

    if (side == "queen") {
      spaceNeeded = ["b" + rankToCheck,
                     "c" + rankToCheck,
                     "d" + rankToCheck];
    } else if (side == "king") {
      spaceNeeded = ["f" + rankToCheck,
                     "g" + rankToCheck];
    }

    // Make sure all the spaces between the rook and the king are empty.
    var allSpacesEmpty = true;
    for (var i = 0; i < spaceNeeded.length; i++) {
      var c = spaceNeeded[i];
      if (this.t.get(c) != "") {
        allSpacesEmpty = false;
      }
    }

    if (allSpacesEmpty) {
      for (var i = 0; i < this.chessBoard.pieces.length; i++) {
        var c = this.chessBoard.pieces[i];
        if (c.color == this.moveLog.turn) {
          if (!c.isDead()) {
            if (c.timesMoved == 0) {
              if (side == "queen") {
                if (c.constructor.name == "King") {
                  c.changePos("c" + rankToCheck);
                  moveSuccessful = true;
                }
                if (c.constructor.name == "Rook") {
                  if (c.pos == "a" + rankToCheck) {
                    c.changePos("d" + rankToCheck);
                    moveSuccessful = true;
                  }
                }
              }
              if (side == "king") {
                if (c.constructor.name == "King") {
                  c.changePos("g" + rankToCheck);
                  moveSuccessful = true;
                }
                if (c.constructor.name == "Rook") {
                  if (c.pos == "h" + rankToCheck) {
                    c.changePos("f" + rankToCheck);
                    moveSuccessful = true;
                  }
                }
              }
            }
          }
        }
      }
    } else {
      alert("You need to clear the area between the rook and the king.");
    }

    if (moveSuccessful) {
      this.logMoveAndSwitchTurn(input);
    }
  }

  // With pieceClassName(), we can use piece.constructor.name in order to
  // easily determine what class the piece is inherited frothis.moveLog. It's one of the
  // weirdest features in JavaScript, and it probably isn't best programming
  // practice, but why not?
  pieceClassName(piece) {
    var pieceClassName = "";
    switch (piece) {
      case "Q": pieceClassName = "Queen"; break;
      case "K": pieceClassName = "King"; break;
      case "R": pieceClassName = "Rook"; break;
      case "B": pieceClassName = "Bishop"; break;
      case "N": pieceClassName = "Knight"; break;
      case "p": pieceClassName = "Pawn"; break;
    }
    return pieceClassName;
  }

  /*
   * Move a piece based on the given input.
   */
  performMove(input) {
    if (!this.badInput(input)) {
      if (this.willCastle(input)) {
        // Look for "O-O-O" first to prevent accidental matching on "O-O".
        // "O-O-O" (or 0-0-0) is to castle on the queen side.
        // "O-O" (or 0-0) is to castle on the king side.
        if (input.match(/O-O-O|0-0-0/)) {
          this.performCastle("queen", input);
        } else if (input.match(/O-O|0-0/)) {
          this.performCastle("king", input);
        }
      } else {
        // Most of the following code is based on Appendix C of the FIDE Laws
        // of Chess, doing the work of interpreting what the player wants to
        // do based on an input given as Algrebraic chess notation.

        // pieceToMove is the type of piece that the player intends to move.
        // Based on FIDE C.1, C.2, and C.4
        var pieceToMove = (input[0].match(/[QKRBN]/) ? input[0] : "p");

        // willCapture is a boolean that determines whether or not the pieceToMove
        // will make a capture on this move. Based on FIDE C.9
        var willCapture = input.match(/x/) ? true : false;

        // moveIntent is the tile the player wants pieceToMove to change to.
        var moveIntent = "";
        // Here we set moveIntent.
        if (willCapture) {
          moveIntent = input.substr((input.match(/x/).index + 1), 2);
        } else if (pieceToMove == "p" && !willCapture) {
          moveIntent = input.substr(0, 2);
        } else {
          moveIntent = input.substr(input.length - 2, 2);
        }

        // possibleIntents makes it more efficient to see what piece the player
        // might "want" to move. With the loop below, we add every piece that is:
        // * On the current player's color.
        // * Of the type the player wants to move.
        // * Is not dead.
        // * Has moveIntent within it's range of movement.
        //
        // If the piece meets all of the above, it's added to possibleIntents.
        var possibleIntents = new Array();
        // Cycle through *every* piece on the board.
        for (var i = 0; i < this.chessBoard.pieces.length; i++) {
          var c = this.chessBoard.pieces[i];
          // Make sure the piece is on the player's color.
          if (c.color == this.moveLog.turn) {
            // Make sure this piece is of the type the player knows it is.
            if (c.constructor.name == this.pieceClassName(pieceToMove)) {
              // Make sure the piece isn't dead.
              if (!c.isDead()) {
                // Make sure this piece can move to where the player want's it to.
                if (c.getRangeOfMovement().indexOf(moveIntent) != -1) {
                  possibleIntents = possibleIntents.concat(c);
                }
              }
            }
          }
        }

        if (possibleIntents.length == 0) {
          alert("Which piece do you want to move?");
        } else {
          // needToDistinguish determines whether or not special notation is *needed*
          // to tell which piece moves where. If possibleIntents has more than one
          // value, there is a need to distinguish. See FIDE C.10 for more info.
          var needToDistinguish = (possibleIntents.length > 1 ? true : false);

          // pieceDistinguish enables notation that can distinguish between
          // two or more pieces of the same type moving to a tile. For
          // example, the notation Nbd7 means that there's another knight
          // that can move to d7, but the player wants to move the knight
          // in file b.
          var pieceDistinguish = null;
          if (needToDistinguish) {
            // For example, gxh3 and Nbd7
            pieceDistinguish = (pieceToMove == "p" ? input[0] : input[1]);
            // Determine if pieceDistinguish is a file or a rank.
            if (pieceDistinguish.match(/[a-h]/)) {
              var distinguishType = "file";
            } else if (pieceDistinguish.match(/[1-8]/)) {
              var distinguishType = "rank";
            }
          }

          console.log(possibleIntents);

          var exactIntent;
          // Cycle through possibleIntents and determine which is the pieceIntent.
          for (var i = 0; i < possibleIntents.length; i++) {
            var c = possibleIntents[i];
            // exactIntent should be a single piece.
            if (!needToDistinguish) {
              exactIntent = c;
            } else {
              if (c.pos[distinguishType == "file" ? 0 : 1] == pieceDistinguish) {
                exactIntent = c;
              }
            }
          }

          if (exactIntent) {
            if (willCapture) {
              this.captureLog.log(this.moveLog.turn, this.t.get(moveIntent));
            }
            exactIntent.changePos(moveIntent);
            this.logMoveAndSwitchTurn(input);
          } else {
            alert("Move unsuccessful.");
            console.log("Move unsuccessful:");
          }
        }
        console.log("\tinput: " + input + "\n");
        console.log("\tmoveIntent: " + moveIntent + "\n");
        console.log("\tpieceToMove: " + pieceToMove + "\n");
        console.log("\twillCapture: " + willCapture + "\n");
        console.log("\tneedToDistinguish: " + needToDistinguish + "\n");
        console.log("\tpieceDistinguish: " + pieceDistinguish + "\n");
        console.log("\tdistinguishType: " + distinguishType + "\n");
      }
    } else {
      alert("The input you entered is invalid.");
    }
  }

}
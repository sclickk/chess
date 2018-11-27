/*
 * The class hierarchy goes real deep:
 *
 * + Game
 * |+ WRa                    -- Instance of the Rook class
 * ||- getRangeOfMovement()  -- function of Rook
 * ||+ p                     -- Instance of the Piece class
 * |||- pos                  -- Property of Piece
 */
function Game() {
  // This becomes important later on.
  var gameScope = this;
  var m = new Moves(),
      t = new Tile();
  /*
   * This get's called once the player clicks on "New Game".
   */
  this.start = function () {
    this.userInput = new UserInput();
    this.captureLog = new CaptureLog();
    this.chessBoard = new ChessBoard("board");
    document.getElementById("gameInteraction").style = "display: block;";
    this.gameSettings = new Settings();
    this.gameSettings.showSettingsButton();
    // Creates the guides on the top and left of the board.
    var guides = new Guide();
    guides.create();
    guides.show();
    this.chessBoard.create();
    this.chessBoard.clear(); // We don't want extra pieces laying around.
    this.chessBoard.fill();
    m.clearMoveLog(); // Clear the move log from the last game.
    m.resetTurn(); // Reset who's turn it is.
    this.captureLog.clear(); // Clear the log of what pieces where captured.
  }

  /*
   * Determine if either player is in check.
   */
  this.checkedOpposingPlayer = function () {
    // Verify check.
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
        if (c.color != m.turn) {
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
        if (c.color == m.turn) {
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
  this.badInput = function (input) {
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
  this.logMoveAndSwitchTurn = function (input) {
    console.log("Move successful:");
    if (this.checkedOpposingPlayer()) {
      m.logCheck(input);
      m.turn == "W" ? m.blackChecked = true : m.whiteChecked = true;
    } else {
      m.logMove(input);
      m.turn == "W" ? m.blackChecked = false : m.whiteChecked = false;
    }
    this.userInput.clear();
    m.switchTurn();
  }

  /*
   * Determine if the player will castle based on a given input.
   */
  this.willCastle = function (input) {
    if (!this.badInput(input)) {
      return input.match(/(O-O(-O|)|0-0(-0|))/) ? true : false;
    } else {
      return false;
    }
  }

  /*
   * Perform a "castling" of the king. This moves the king to position that
   * protects it behind the rook and a row of pawns.
   */
  this.performCastle = function (side) {
    // The row where the king and the rook should be.
    var rankToCheck = (m.turn == "W" ? "1" : "8");
    console.log(rankToCheck);
    // Look for "O-O-O" first to prevent accidental matching on "O-O".
    // "O-O-O" (or 0-0-0) is to castle on the queen side.
    // "O-O" (or 0-0) is to castle on the king side.
    if (side == "queen") {
      // Make sure all the tiles between the king and the rook are empty.
      if (t.get("b" + rankToCheck) == ""
       && t.get("c" + rankToCheck) == ""
       && t.get("d" + rankToCheck) == "") {
        for (var i = 0; i < gameScope.chessBoard.pieces.length; i++) {
          var c = gameScope.chessBoard.pieces[i];
          if (c.color == m.turn) {
            if (c.constructor.name == "King") {
              if (c.pos == ("e" + rankToCheck)) {
                c.changePos("c" + rankToCheck);
                moveSuccessful = true;
              }
            }
            if (c.constructor.name == "Rook") {
              if (c.pos == ("a" + rankToCheck)) {
                c.changePos("d" + rankToCheck);
                moveSuccessful = true;
              }
            }
          }
        }
      } else {
        alert("You can't castle on the queen side because tiles"
            + " b" + rankToCheck
            + ", c"  + rankToCheck
            + ", and d" + rankToCheck
            + " all need to be empty.");
      }
    } else if (side == "king") {
      if (t.get("f" + rankToCheck) == ""
       && t.get("g" + rankToCheck) == "") {
        for (var i = 0; i < gameScope.chessBoard.pieces.length; i++) {
          var c = gameScope.chessBoard.pieces[i];
          if (c.color == m.turn) {
            if (c.constructor.name == "King") {
              if (c.pos == ("e" + rankToCheck)) {
                c.changePos("g" + rankToCheck);
                moveSuccessful = true;
              }
            }
            if (c.constructor.name == "Rook") {
              if (c.pos == ("h" + rankToCheck)) {
                c.changePos("f" + rankToCheck);
                moveSuccessful = true;
              }
            }
          }
        }
      } else {
        alert("You can't castle on the king side because tiles"
            + " f" + rankToCheck
            + " and g"  + rankToCheck
            + " need to be empty.");
      }
    }
  }

  /*
   * Move a piece based on the given input.
   */
  this.performMove = function (input) {
    // pieceToMove is the piece that the player intends to move by the next move.
    var pieceToMove = (input[0].match(/(Q|K|R|B|N)/) ? input[0] : "p");

    // With pieceClassName, we can use piece.constructor.name in order to
    // easily determine what class the piece is inherited from. It's one of the
    // weirdest features in JavaScript, and it probably isn't best programming
    // practice, but why not?
    var pieceClassName = "";
    switch (pieceToMove) {
      case "Q": pieceClassName = "Queen"; break;
      case "K": pieceClassName = "King"; break;
      case "R": pieceClassName = "Rook"; break;
      case "B": pieceClassName = "Bishop"; break;
      case "N": pieceClassName = "Knight"; break;
      case "p": pieceClassName = "Pawn"; break;
    }

    // Sets to true when the player checks their opponent
    var checkedOpposingPlayer = false;

    // Sets to true when we can pass a given move as valid.
    var moveSuccessful = false;
    var validMove = false;

    // O-O and O-O-O is notation for castling. This also includes 0-0 and
    // 0-0-0 in case the player confuses O with 0 (zero)
    if (this.willCastle(input)) {
      var rankToCheck = (m.turn == "W" ? "1" : "8");
      console.log(rankToCheck);
      // Look for "O-O-O" first to prevent accidental matching on "O-O".
      // "O-O-O" (or 0-0-0) is to castle on the queen side.
      // "O-O" (or 0-0) is to castle on the king side.
      if (input.match(/O-O-O|0-0-0/)) {
        // Make sure all the tiles between the king and the rook are empty.
        if (t.get("b" + rankToCheck) == ""
         && t.get("c" + rankToCheck) == ""
         && t.get("d" + rankToCheck) == "") {
          for (var i = 0; i < gameScope.chessBoard.pieces.length; i++) {
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
            var c = gameScope.chessBoard.pieces[i];
            if (c.color == m.turn) {
              if (c.constructor.name == "King") {
                if (c.pos == ("e" + rankToCheck)) {
                  c.changePos("c" + rankToCheck);
                  moveSuccessful = true;
                }
              }
              if (c.constructor.name == "Rook") {
                if (c.pos == ("a" + rankToCheck)) {
                  c.changePos("d" + rankToCheck);
                  moveSuccessful = true;
                }
              }
            }
          }
        } else {
          alert("You can't castle on the queen side because tiles"
              + " b" + rankToCheck
              + ", c"  + rankToCheck
              + ", and d" + rankToCheck
              + " all need to be empty.");
        }
      } else if (input.match(/O-O|0-0/)) {
        if (t.get("f" + rankToCheck) == ""
         && t.get("g" + rankToCheck) == "") {
          for (var i = 0; i < gameScope.chessBoard.pieces.length; i++) {
            var c = gameScope.chessBoard.pieces[i];
            if (c.color == m.turn) {
              if (c.constructor.name == "King") {
                if (c.pos == ("e" + rankToCheck)) {
                  c.changePos("g" + rankToCheck);
                  moveSuccessful = true;
                }
              }
              if (c.constructor.name == "Rook") {
                if (c.pos == ("h" + rankToCheck)) {
                  c.changePos("f" + rankToCheck);
                  moveSuccessful = true;
                }
              }
            }
          }
        } else {
          alert("You can't castle on the king side because tiles"
              + " f" + rankToCheck
              + " and g"  + rankToCheck
              + " need to be empty.");
        }
      }
    }

    // willCapture is a boolean that determines whether or not the pieceToMove
    // will make a capture on this move.
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
    for (var i = 0; i < gameScope.chessBoard.pieces.length; i++) {
      var c = gameScope.chessBoard.pieces[i];
      // Make sure the piece is on the player's color.
      if (c.color == m.turn) {
        // Make sure this piece is of the type the player knows it is.
        if (c.constructor.name == pieceClassName) {
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

    // needToDistinguish determines whether or not special notation is *needed*
    // to tell which piece moves where. If possibleIntents has more than one
    // value, there is a need to distinguish.
    var needToDistinguish = (possibleIntents.length > 1 ? true : false);

    // pieceDistinguish enables notation that can distinguish between
    // two or more pieces of the same type moving to a tile. For
    // example, the notation Nbd7 means that there's another knight
    // that can move to d7, but the player wants to move the knight
    // in file b.
    var pieceDistinguish = null;
    if (needToDistinguish) {
      if (pieceToMove == "p") {
        // For example, gxh3 and Nbd7
        pieceDistinguish = (pieceToMove == "p" ? input[0] : input[1]); 
      }
      // Determine if pieceDistinguish is a file or a rank.
      if (pieceDistinguish != null) {
        if (pieceDistinguish.match(/[a-h]/)) {
          var distinguishType = "file";
        } else if (pieceDistinguish.match(/[1-8]/)) {
          var distinguishType = "rank";
        }
      }
    }

    console.log(possibleIntents);

    if (!this.badInput(input)) {
      if (!this.willCastle(input)) {
        for (var i = 0; i < possibleIntents.length; i++) {
          var c = possibleIntents[i];
          if (!needToDistinguish) {
            if (willCapture) {
              gameScope.captureLog.log(m.turn, moveIntent);
            }
            c.changePos(moveIntent);
            moveSuccessful = true;
          } else {
            if (c.pos[distinguishType == "file" ? 0 : 1] == pieceDistinguish) {
              if (willCapture) {
                gameScope.captureLog.log(m.turn, moveIntent);
              }
              c.changePos(moveIntent);
              moveSuccessful = true;
            }
          }
        }
      }
    }

    if (moveSuccessful) {
      gameScope.logMoveAndSwitchTurn(input);
    } else {
      alert("Move unsuccessful.");
      console.log("Move unsuccessful:");
    }
    console.log("\tinput: " + input + "\n");
    console.log("\tmoveIntent: " + moveIntent + "\n");
    console.log("\tpieceToMove: " + pieceToMove + "\n");
    console.log("\twillCapture: " + willCapture + "\n");
    console.log("\tneedToDistinguish: " + needToDistinguish + "\n");
    console.log("\tpieceDistinguish: " + pieceDistinguish + "\n");
    console.log("\tdistinguishType: " + distinguishType + "\n");
  }

  // Getting this to work was very tricky especially for the third bullet, and it's
  // part of the reason I don't like JavaScript too much:
  // * This function is the event handler for moveButton()
  // * This needed to be inside of Game() because it shouldn't detect
  //   user input until the game starts.
  // * I needed this function to be able to access the functions and properties
  //   of the pieces declared above.
  //
  // This question on Stack Overflow helped:
  // https://stackoverflow.com/questions/12731528/adding-event-listeners-in-constructor
  //
  // I first used this code:
  //
  // document.getElementById("moveButton").onclick = function () {
  //   alert(this.WK.pos);
  // }
  //
  // It should have alerted "e1" but nothing happened because it thought that
  // "this" meant the current function (getElementById("moveButton").onclick),
  // and not the scope of this Game(constructor)
  //
  // The variable gameScope declared above is set to that way when we type
  // gameScope.WK.pos we are intending to point to the Game() constructor.
  //
  // Another odd thing to point out is the difference between event handlers
  // and regular functions when it comes to inheritance. Notice how above the
  // variables this.BRa, this.WQ, etc. are all defined in the scope of Game
  // despite being in the this.fillBoard() function. You would expect all the
  // pieces to be accessed with this.fillBoard.piece.
  //
  // TL;DR JavaScript inheritance is weird.
  //
  document.getElementById("moveButton").onclick = function () {
    gameScope.performMove(gameScope.userInput.get());
  }
  
  document.getElementById("userInput").onkeydown = function () {
    var key = event.keyCode;
    // Do the same thing when the enter key is pressed.
    if (key == 13) {
      gameScope.performMove(gameScope.userInput.get());
    }
  }
}
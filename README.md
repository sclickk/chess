# About this game

This JavaScript implementation of chess was created by Eric Villarreal. To start a game, just click the button above.

Chess is not the easiest game to create a program out of, but it's been a while since I've done anything big with JavaScript so I thought this could be a good refresher for me. One of the main difficulties in creating this game was figuring out how each piece should move. Determining when a piece is blocked by another.

Every piece you see on the board is a Unicode character from code points U+2654 to U+265F, the specification of which can be found <a href="https://www.unicode.org/charts/PDF/U2600.pdf" target="_blank">here</a>. A goal I had in mind when making the game was to use as few words as possible when making the game, as icons are a universal languange in designing interfaces.

## How to play (for n00bs)

Chess is a two-player game played on an eight-by-eight board. The end goal is to "checkmate" the opponents king. This is achieved by moving a variety of pieces on the board, capturing the opponent's pieces, and supporting your pieces. Checkmate happens when a player's king is in direct line of attack of an opposing piece and no action can be taken by the player to defend itself. The game can end in a draw through stalemate, whereby a player has no avaliable moves to make, but their king is not in check.

## Useful sources

* [Wikipedia](https://en.wikipedia.org/wiki/Chess)
* [FIDE Laws of Chess](https://www.fide.com/FIDE/handbook/LawsOfChess.pdf)

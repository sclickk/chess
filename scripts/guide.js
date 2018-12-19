/**
 * Manages the guides at the top and sides of the board. The guides show the
 * coordinates of every tile on the board.
 */
class Guide {
  constructor()
  {
    this.topGuide = $('#top-guide')[0];
    this.sideGuide = $('#side-guide')[0];
  }
  /**
   * Check if the HTML for the guides exist.
   */
  exists() {
    if (this.topGuide.getAttribute("created")
     && this.sideGuide.getAttribute("created")) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Create the HTML for the guides.
   */
  create() {
    if (!this.exists()) {
      for (var i = 1; i < 9; i++) {
        this.topGuide.innerHTML += "<td>" + toLetter(i) + "</td>\n";
      }
      for (var i = 8; i > 0; i--) {
        this.sideGuide.innerHTML += "<tr><td>" + i + "</td></tr>\n";
      }
      this.topGuide.setAttribute("created", "true");
      this.sideGuide.setAttribute("created", "true");
    } else {
      console.warn("The guides already exist.");
    }
  }
  /**
   * Show the guides with CSS
   */
  show() {
    this.topGuide.style = "display: table-row;";
    this.sideGuide.style = "display: table-row;";
  }
  /**
   * Hide the guides with CSS.
   */
  hide() {
    this.topGuide.style = "display: none;";
    this.sideGuide.style = "display: none;";
  }
}

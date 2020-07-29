class Guide
{
  /**
   * Manages the guides at the top and sides of the board. The guides show the
   * coordinates of every tile on the board.
   */
  constructor()
  {
    this.topGuide = $('#top-guide');
    this.sideGuide = $('#side-guide');
  }

  /**
   * Check if the HTML for the guides exist.
   */
  exists() {
    return ((this.topGuide[0].getAttribute("created")
          && this.sideGuide[0].getAttribute("created")) ? true : false);
  }

  /**
   * Create the HTML for the guides.
   */
  create() {
    if (!this.exists()) {
      for (var i = 1; i < 9; i++) {
        this.topGuide.append('<td>' + toLetter(i) + '</td>\n');
      }
      for (var i = 8; i > 0; i--) {
        this.sideGuide.append('<tr><td>' + i + '</td></tr>\n');
      }
      this.topGuide.attr("created", "true");
      this.sideGuide.attr("created", "true");
    } else {
      console.warn("The guides already exist.");
    }
  }

  /**
   * Set the CSS `display` setting of the guides
   * @param style The CSS `display` of the guides.
   */
  setGuideDisplay(style) {
    this.topGuide.css('display', style);
    this.sideGuide.css('display', style);
  }

  /**
   * Show the guides.
   */
  show() { this.setGuideDisplay('table-row'); }

  /**
   * Hide the guides.
   */
  hide() { this.setGuideDisplay('none'); }
}

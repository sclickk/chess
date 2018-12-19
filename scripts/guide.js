/*
 * Manages the guides at the top and sides of the board. The guides show the
 * coordinates of every tile on the board.
 */
function Guide() {
  this.topGuide = $('#top-guide')[0];
  this.sideGuide = $('#side-guide')[0];
  this.exists = function () {
    if (this.topGuide.getAttribute("created")
     && this.sideGuide.getAttribute("created")) {
      return true;
    } else {
      return false;
    }
  }
  this.create = function () {
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
  this.show = function () {
    this.topGuide.style = "display: table-row;";
    this.sideGuide.style = "display: table-row;";
  }
  this.hide = function () {
    this.topGuide.style = "display: none;";
    this.sideGuide.style = "display: none;";
  }
}
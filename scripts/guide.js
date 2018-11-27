/*
 * Manages the guides at the top and sides of the board. The guides show the
 * coordinates of every tile on the board.
 */
function Guide() {
  var topGuide = document.getElementById("top-guide");
  var sideGuide = document.getElementById("side-guide");
  this.exists = function () {
    if (topGuide.getAttribute("created")
     && sideGuide.getAttribute("created")) {
      return true;
    } else {
      return false;
    }
  }
  this.create = function () {
    if (!this.exists()) {
      for (var i = 1; i < 9; i++) {
        topGuide.innerHTML += "<td>" + toLetter(i) + "</td>\n";
      }
      for (var i = 8; i > 0; i--) {
        sideGuide.innerHTML += "<tr><td>" + i + "</td></tr>\n";
      }
      topGuide.setAttribute("created", "true");
      sideGuide.setAttribute("created", "true");
    } else {
      console.warn("The guides already exist.");
    }
  }
  this.show = function () {
    topGuide.style = "display: table-row;";
    sideGuide.style = "display: table-row;";
  }
  this.hide = function () {
    topGuide.style = "display: none;";
    sideGuide.style = "display: none;";
  }
}
function UserInput() {
  var userInputScope = this;
  this.userInputHTML = document.getElementById("userInput");
  this.get = function () {
    return this.userInputHTML.value;
  }
  this.clear = function () {
    this.userInputHTML.value = "";
  }

  // The mini keyboard makes it easier to play the game using a touchscreen.
  this.miniKeyboard = document.getElementById("miniKeyboard");

  this.createMiniKeyboard = function () {
    var keys = [
      ["Q", "K", "B", "N", "R", "x"],
      ["a", "b", "c", "d", "e", "f", "g", "h"],
      ["1", "2", "3", "4", "5", "6", "7", "8"],
      ["O-O", "O-O-O", "←"]
    ];

    this.miniKeyboard.innerHTML += "<hr/>";
    for (var i = 0; i < keys.length; i++) {
      var c = keys[i];
      for (var j = 0; j < c.length; j++) {
        var d = c[j];
        this.miniKeyboard.innerHTML += "<button class=\"mk-key\">" + d + "</button>";
      }
      this.miniKeyboard.innerHTML += "<br/>";
    }
  }
  
  this.miniKeyboard.onclick = function () {
    var c = userInputScope.userInputHTML;
    if (event.srcElement.className == "mk-key") {
      if (event.srcElement.innerHTML != "←") {
        c.value += event.srcElement.innerHTML;
      } else {
        c.value = c.value.substr(0, c.value.length - 1);
      }
    }
  }
}
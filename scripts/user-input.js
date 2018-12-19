class UserInput {
  constructor() {
    var userInputScope = this;
    this.userInput = $('#userInput')[0];
    
    // The mini keyboard makes it easier to play the game using a touchscreen.
    this.miniKeyboard = $('#miniKeyboard');
    // Event listener.
    this.miniKeyboard.on('click', function (event) {
      var c = userInputScope.userInput;
      /*
       * Insead of listening for individual keys, we listen for
       * the entire keyboard, then get what the source element was.
       */
      if (event.target.className == "mk-key") {
        if (event.target.innerHTML != "←") {
          c.value += event.target.innerHTML;
        } else {
          c.value = c.value.substr(0, c.value.length - 1);
        }
      }
    });
  }

  /**
   * Get the user's input.
   */
  get() {
    return this.userInput.value;
  }

  /**
   * Clear the user input field.
   */
  clear() {
    this.userInput.value = "";
  }

  /**
   * Sets up the mini keyboard
   */
  createMiniKeyboard() {
    var keys = [
      ["Q", "K", "B", "N", "R", "x"],
      ["a", "b", "c", "d", "e", "f", "g", "h"],
      ["1", "2", "3", "4", "5", "6", "7", "8"],
      ["O-O", "O-O-O", "←"]
    ];
    this.miniKeyboard.append("<hr/>");
    for (var i = 0; i < keys.length; i++) {
      var c = keys[i];
      for (var j = 0; j < c.length; j++) {
        var d = c[j];
        this.miniKeyboard.append('<button class="mk-key">' + d + '</button>');
      }
      this.miniKeyboard.append("<br/>");
    }
  }
}

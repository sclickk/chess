function UserInput() {
  this.userInputHTML = document.getElementById("userInput");
  this.get = function () {
    return this.userInputHTML.value;
  }
  this.clear = function () {
    this.userInputHTML.value = "";
  }
  this.miniKeyboard = document.getElementById("miniKeyboard");
  
}
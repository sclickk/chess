/*
 * These functions deal with game settings.
 */
function Settings() {
  var settingsScope = this;

  this.settingsMenu = document.getElementById("settings");
  this.settingsButton = document.getElementById("settingsButton");
  /*
   * Show the settings button at the start of the game.
   */
  this.showSettingsButton = function () {
    this.settingsButton.style = "display: inline-block;";
  }
  this.settingsButton.onclick = function () {
    var c = settingsScope.settingsMenu.style,
        d = settingsScope.settingsButton;
    c.display = (c.display == "none" ? "block" : "none");
    d.innerHTML = (c.display == "none" ? "Show" : "Hide") + " Settings";
  }

  this.showCoordinates = document.getElementById("showCoordinates");
  this.showCoordinates.onclick = function () {
    var guideToggle = new Guide()
        option = settingsScope.showCoordinates;
    option.checked ? guideToggle.show() : guideToggle.hide();
  }

  this.overrideFonts = document.getElementById("overrideFonts");
  this.overrideFonts.onclick = function () {
    var body = document.getElementsByTagName("body")[0],
      option = settingsScope.overrideFonts;
    body.style = (option.checked ? "font-family: sans-serif;" : "");
  }

  this.themeSelector = document.getElementById("themeSelector");
  for (var i = 0; i < themes.length; i++) {
    this.themeSelector.innerHTML += "<option>" + themes[i][0] + "</option>";
  }
  this.themeSelector.onchange = function () {
    var selectedTheme = settingsScope.themeSelector.value;
    for (var i = 0; i < themes.length; i++) {
      var c = themes[i];
      if (c[0] == selectedTheme) {
        document.getElementById("themeCSS").href = c[1];
      }
    }
  }

  this.showMiniKeyboard = document.getElementById("showMiniKeyboard");
  this.showMiniKeyboard.onchange = function () {
    var miniKeyboard = document.getElementById("miniKeyboard"),
        option = settingsScope.showMiniKeyboard;
    miniKeyboard.style = "display: " + (option.checked ? "block;" : "none;");
  }
}
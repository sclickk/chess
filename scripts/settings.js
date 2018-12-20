/*
 * These functions deal with game settings.
 */
function Settings() {
  var settingsScope = this;

  this.settingsMenu = $('#settings')[0];
  this.settingsButton = $('#settingsButton')[0];
  /*
   * Show the settings button at the start of the game.
   */
  this.showSettingsButton = function () {
    $('#settingsButton').css("display", "inline-block");
  }
  this.settingsButton.onclick = function () {
    $('#settings').css(
      'display', ($('#settings').css('display') == 'none' ? 'block' : 'none')
    );
    $('#settingsButton').text(
      ($('#settings').css('display') == 'none' ?
      'Show' : 'Hide') + ' Settings'
    );
  }

  this.showCoordinates = $('#showCoordinates');
  this.showCoordinates.on('click', function () {
    var guideToggle = new Guide();
    this.checked ? guideToggle.show() : guideToggle.hide();
  });

  $('#overrideFonts').on('click', function (event) {
    $('body').css(
      "font-family", (this.checked ? "sans-serif" : "")
    );
  });

  /**
   * Set up the theme selector
   */
  this.themeSelector = $('#themeSelector');

  for (var i = 0; i < themes.length; i++) {
    this.themeSelector.append('<option>' + themes[i][0] + '</option>');
  }

  this.themeSelector.on('change', function () {
    var selectedTheme = this.value;
    for (var i = 0; i < themes.length; i++) {
      var c = themes[i];
      if (c[0] == selectedTheme) {
        $('#themeCSS').attr('href', c[1]);
      }
    }
  });

  /**
   * Set up the mini keyboard.
   */
  this.showMiniKeyboard = $('#showMiniKeyboard');
  this.showMiniKeyboard.on('change', function () {
    $('#miniKeyboard').css(
      'display', (this.checked ? "block" : "none")
    );
  });
}
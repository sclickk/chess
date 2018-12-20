
/*
 * These functions deal with game settings.
 */
class Settings {
  constructor() {
    var settingsScope = this;
    /** @var settingsMenu The menu that shows settings for the game. */
    this.settingsMenu = $('#settings');
    /** @var settingsButton The button that expands the settings menu. */
    this.settingsButton = $('#settingsButton');
    this.settingsButton.on('click', function () {
      settingsScope.settingsMenu.css(
        'display', (
          (settingsScope.settingsMenu.css('display') == 'none' ?
          'block' : 'none')
        )
      );
      settingsScope.settingsButton.text(
        (settingsScope.settingsMenu.css('display') == 'none' ?
        'Show' : 'Hide') + ' Settings');
    });

    /** @var showCoordinates whether or not to show coordinates on the board. */
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
      $('#miniKeyboard').css('display', (this.checked ? "block" : "none"));
    });
  }
  /*
   * Show the settings button at the start of the game.
   */
  showSettingsButton() {
    this.settingsButton.css("display", "inline-block");
  };
}

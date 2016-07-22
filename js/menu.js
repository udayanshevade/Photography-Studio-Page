var app = app || {};

(function(global, app) {

  var utils = app.utilities;

  /* -------
   * Model
   * -------
   */
  var Menu = function() {

    var self = this;

    this.init = function() {

      this.setDimensions();

      this.header = document.getElementsByTagName('header');
      this.menubar = document.getElementById('menubar');
      this.exploreIcon = document.getElementById('explore-icon');
      this.connectIcon = document.getElementById('connect-icon');
      this.exploreLabel = document.getElementById('explore-label');
      this.connectLabel = document.getElementById('connect-label');
      this.explore = document.getElementById('explore');
      this.connect = document.getElementById('connect');

      this.exploring = false;
      this.connecting = false;

      this.addListeners();

      global.setTimeout(function() {
        if (!self.exploring
          && !self.connecting) {
          self.clickExplore();
        }
      }, 8500);
    };



    this.setDimensions = function() {
      this.screenWidth = document.body.clientWidth;
      this.screenHeight = document.body.clientHeight;
    };



    this.addListeners = function() {
      window.addEventListener('resize', self.setDimensions.bind(self));
      // clicking the menu icon (contact, blog)
      var toExplore = [this.exploreIcon, this.exploreLabel];
      for (var e = 0; e < toExplore.length; e++) {
        toExplore[e].addEventListener('click', self.clickExplore.bind(self));
      }
      // clicking the more icon (more works)
      var toConnect = [this.connectIcon, this.connectLabel];
      for (var c = 0; c < toConnect.length; c++) {
        toConnect[c].addEventListener('click', self.clickConnect.bind(self));
      }
    };



    this.clickExplore = function() {
      if (this.screenWidth < 500) {
        utils.toggleClass(this.exploreIcon, 'explore-icon-active');
        utils.addClass(this.exploreLabel, 'explore-label-active');
        if (this.exploreIcon.innerText != '+') {
          this.exploreIcon.innerText = '+';
          this.connectIcon.innerText = '+';
          utils.removeClass(this.connectIcon, 'connect-icon-active');
          utils.removeClass(this.connectLabel, 'connect-label-active');
        } else {
          this.exploreIcon.innerText = '☰';
        }
        utils.toggleClass(this.explore, 'collapsed');
        if (!utils.hasClass(this.connect, 'collapsed')) {
          utils.addClass(this.connect, 'collapsed');
        }
      }
    };



  // when user clicks on more-icon
  this.clickConnect = function() {
    if (this.screenWidth) {
      utils.toggleClass(this.connectIcon, 'connect-icon-active');
      utils.toggleClass(this.connectLabel, 'connect-label-active');
      if (this.screenWidth < 500
          && !utils.hasClass(this.explore, 'collapsed')) {
          this.exploreIcon.innerText = '☰';
          utils.removeClass(this.exploreIcon, 'explore-icon-active');
          utils.removeClass(this.exploreLabel, 'explore-label-active');
          utils.addClass(this.explore, 'collapsed');
      }
      utils.toggleClass(this.connect, 'collapsed');
    }
  };


    this.init();

  };

  app.menu = new Menu();

})(this, app);
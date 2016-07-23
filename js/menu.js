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
      this.queryElements();
      this.exploring = false;
      this.connecting = false;

      this.setDimensions();
      this.addListeners();

      global.setTimeout(function() {
        if (!self.exploring
          && !self.connecting) {
          self.clickExplore();
        }
      }, 8500);

      this.initScroll();
    };



    this.queryElements = function() {
      this.header = document.getElementsByTagName('header')[0];
      this.menubar = document.getElementById('menubar');
      this.exploreIcon = document.getElementById('explore-icon');
      this.connectIcon = document.getElementById('connect-icon');
      this.exploreLabel = document.getElementById('explore-label');
      this.connectLabel = document.getElementById('connect-label');
      this.exploreToggle = document.getElementById('explore-toggle');
      this.connectToggle = document.getElementById('connect-toggle');
      this.explore = document.getElementById('explore');
      this.connect = document.getElementById('connect');
    };



    this.initScroll = function() {
      // vars for hasScrolled() - header retract function
      this.lastScrollTop = 0;
      this.delta = 5;
      this.navbarHeight = this.header.offsetHeight;
      this.hovering = false;
      this.st = 0;
      this.didScroll = false;
    };



    this.setDimensions = function() {
      this.screenWidth = document.body.clientWidth;
      this.screenHeight = document.body.clientHeight;
      this.reflowMenu();
    };



    this.addListeners = function() {
      global.addEventListener('resize', self.setDimensions.bind(self));
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

      global.addEventListener('scroll', self.scroll.bind(self));
    };



    this.scroll = function() {
      global.requestAnimationFrame(self.hasScrolled.bind(self));
    };



    this.hasScrolled = function() {
      this.st = (global.pageYOffset !== undefined) ? global.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (Math.abs(this.lastScrollTop - this.st) <= this.delta){
        return;
      }
      if (this.st > this.lastScrollTop && this.st > this.navbarHeight) {
        //scroll down
        utils.addClass(this.header, 'header-collapse');
      }
      else {
      //scroll up
        if (this.st + global.innerHeight < this.screenHeight) {
          utils.removeClass(this.header, 'header-collapse');

        }
      }
      this.lastScrollTop = this.st;
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


  this.reflowMenu = function() {
    if (this.screenWidth < 500) {
      this.header.appendChild(this.explore);
      utils.addClass(this.explore, 'menu-overlay');

      if (this.lastWidth >= 500) {
        utils.addClass(this.explore, 'collapsed');
      }
      this.lastWidth = this.screenWidth;
    }
    if (this.screenWidth >= 500) {
      this.exploreToggle.appendChild(this.explore);
      utils.removeClass(this.explore, 'collapsed');
      utils.removeClass(this.explore, 'menu-overlay');
      this.lastWidth = this.screenWidth;
    }
    if (this.screenWidth < 750) {
      this.splitMenus();
      utils.addClass(this.connect, 'collapsed');
      utils.addClass(this.connect, 'menu-overlay');
      utils.removeClass(this.connectIcon, 'connect-icon-active');
      utils.removeClass(this.connectLabel, 'connect-label-active');
    }
    if (this.screenWidth >= 750) {
      this.mergeMenus();
      utils.removeClass(this.connect, 'collapsed');
      utils.removeClass(this.connect, 'menu-overlay');
      this.lastWidth = this.screenWidth;
    }
    if (this.screenWidth < 1200) {
      utils.removeClass(this.header, 'collapsed');
    }
  };

  this.mergeMenus = function() {
    var items = document.getElementsByClassName('connect-item');
    for (var i = 0; i < items.length; i++) {
      this.explore.appendChild(items[i]);
    }
  }

  this.splitMenus = function() {
    var items = document.getElementsByClassName('connect-item');
    for (var i = 0; i < items.length; i++) {
      this.connect.appendChild(items[i]);
    }
  };


    this.init();

  };

  app.menu = new Menu();

})(this, app);
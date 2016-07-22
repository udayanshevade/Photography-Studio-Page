var app = app || {};

(function(global, app) {

  var utils = app.utilities;

  /* -------
   * View
   * -------
   */
  var Slideshow = function() {

    var self = this;

    // Variables for tracking the slideshow state
    this.init = function() {

      this.slideTemplate = _.template(document.getElementById('slide-template').innerHTML);

      this.props = {
        indices: {
          currentImage: 0,
          nextImage: 1,
          nextAfterImage: 2
        },
        i: 1,
        fading: false,
        duration: 8000,
        loaded: 0,
        loading: true
      };

      this.container = document.getElementById('slide-container');
      this.leftCtrl = document.getElementById('left-control');
      this.rightCtrl = document.getElementById('right-control');

      this.addListeners();
    };



    this.addListeners = function() {
      this.leftCtrl.addEventListener('click', function() {
        global.clearInterval(self.slidesPlaying);
        self.rewindSlides();
        self.startSlideshow();
      });
      this.rightCtrl.addEventListener('click', function() {
        global.clearInterval(self.slidesPlaying);
        self.playSlides();
        self.startSlideshow();
      });
      this.container.addEventListener('click', function() {
        global.clearInterval(self.slidesPlaying);
        self.playSlides();
        self.startSlideshow();
      });
    };


    // Create slide for each images
    this.createSlides = function(slides) {

      this.images = slides;

      // Set array.length dependent properties
      this.props.indices.prevImage = slides.length - 1;
      this.props.indices.prevBeforeImage = slides.length - 2;

      var data;
      for (var i = 0, len = slides.length; i < len; i++) {
        data = {
          i: i,
          image: slides[i]
        };
        // Create and display each slide
        this.createSlide(data);
      }
    };



    // Create and insert the slideshow image
    this.createSlide = function(slide) {
      var preloadImage = new Image();
      preloadImage.onload = function() {
        var compiled = self.slideTemplate(slide);
        var temp = document.createElement('div');
        temp.innerHTML = compiled;
        var el = temp.childNodes[1];
        self.container.insertBefore(el, self.container.firstChild);
        self.props.loaded++;
        self.checkReady();
      };
      preloadImage.src = slide.image;
    };



    this.checkReady = function() {
      console.log(this.props.loaded);
      if (this.props.loaded === this.images.length) {
        this.props.loaded = true;
      }
      if (this.props.loaded === true) {
        this.props.loading = false;
        this.prepSlides();
        var loader = document.getElementById('loader-spinner');
        global.setTimeout(function() {
          loader.style = "display: none";
        }, 500);
      }
    };



    // Prepare initial slides
    this.prepSlides = function() {
      this.slides = document.getElementsByClassName('img-panel');

      var first = this.slides[this.props.indices.currentImage];
      utils.addClass(first, 'front'); utils.removeClass(first, 'rear');
      var second = this.slides[this.props.indices.nextImage];
      utils.addClass(second, 'rear'); utils.removeClass(second, 'front');

      this.startSlideshow();

    };



    // Kick off the slideshow
    this.startSlideshow = function() {
      this.slidesPlaying = global.setInterval(function() {
        return self.playSlides();
      }, this.props.duration);
    };



    // Loop through the slides
    this.playSlides = function(backwards) {
      if (!this.props.fading) {
        var next, nextAfter;
        if (backwards === 'backwards') {
          next = this.props.indices.prevImage;
          nextAfter = this.props.indices.prevBeforeImage;
          this.props.i = -1;
        } else {
          next = this.props.indices.nextImage;
          nextAfter = this.props.indices.nextAfterImage;
          this.props.i = 1;
        }

        var current = this.slides[this.props.indices.currentImage];
        var next = this.slides[next];
        utils.addClass(next, 'back');
          utils.removeClass(next, 'front');
            utils.removeClass(next, 'rear');
        var nextAfter = this.slides[nextAfter];
        utils.addClass(nextAfter, 'rear');
          utils.removeClass(nextAfter, 'front')
            utils.removeClass(nextAfter, 'back');

        this.props.fading = true;

        // Animate current slide
        global.requestAnimationFrame(function() {
          utils.addClass(current, 'fadeOut');

          self.endSlide(current, next, nextAfter);
        });
      }
    };



    this.rewindSlides = function() {
      this.cycleIndices();
      this.playSlides('backwards');
    };



    // Set 1s timeout to launch the change in slides
    this.endSlide = function(current, next, nextAfter) {
      global.setTimeout(function() {
        self.props.fading = false;

        for (var index in self.props.indices) {
          if (self.props.indices.hasOwnProperty(index)) {
            self.increment(index);
          }
        }

        // Change the current/next/previous indices
        self.cycleIndices();

        utils.addClass(current, 'rear'); utils.removeClass(current, 'front');
        utils.addClass(next, 'front'); utils.removeClass(next, 'back');
        utils.addClass(nextAfter, 'back'); utils.removeClass(nextAfter, 'rear');

        // Stop animating the current slide
        utils.removeClass(current, 'fadeOut');

      }, 1000);
    };



    this.increment = function(prop) {
      // Increment the particular index
      this.props.indices[prop] += this.props.i;
    };



    this.cycleIndices = function() {
      for (var index in this.props.indices) {
        if (this.props.indices.hasOwnProperty(index)) {
          this.cycleIndex(index);
        }
      }
    };



    this.cycleIndex = function(prop) {
      if (this.props.indices[prop] >= this.images.length) {
        this.props.indices[prop] = 0;
      }
      if (this.props.indices[prop] < 0) {
        this.props.indices[prop] = this.images.length - 1;
      }
    };


    this.init();

  };

  app.slideshow = new Slideshow();

})(this, app);
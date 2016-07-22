var app = app || {};

(function(global, app) {

  /* Utility functions - from You Might Not Need jQuery */
  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }
  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
  function toggleClass(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }

      el.className = classes.join(' ');
    }
  }





  /*
   * Model
   */
  var Slides = function() {

    // Slide images
    this.images = [
      'img/field.jpg',
      'img/cliffs.jpg',
      'img/waterfall.jpg',
      'img/camping.jpg'
    ];

  };





  /*
   * View
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
        duration: 5000
      };

      this.container = document.getElementById('slide-container');
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
      this.prepSlides();
    };

    // Create and insert the slideshow image
    this.createSlide = function(slide) {
      var compiled = this.slideTemplate(slide);
      var temp = document.createElement('div');
      temp.innerHTML = compiled;
      var el = temp.childNodes[1];
      this.container.insertBefore(el, this.container.firstChild);
    };

    // Prepare initial slides
    this.prepSlides = function() {
      this.slides = document.getElementsByClassName('img-panel');

      var first = this.slides[this.props.indices.currentImage];
      addClass(first, 'front'); removeClass(first, 'rear');
      var second = this.slides[this.props.indices.nextImage];
      addClass(second, 'rear'); removeClass(second, 'front');

      this.startSlideshow();

    };


    // Kick off the slideshow
    this.startSlideshow = function() {
      global.setInterval(function() {
        return self.playSlides();
      }, this.props.duration);
    };



    // Loop through the slides
    this.playSlides = function() {
      var current = this.slides[this.props.indices.currentImage];
      var next = this.slides[this.props.indices.nextImage];
      addClass(next, 'back');
        removeClass(next, 'front');
          removeClass(next, 'rear');
      var nextAfter = this.slides[this.props.indices.nextAfterImage];
      addClass(nextAfter, 'rear');
        removeClass(nextAfter, 'front')
          removeClass(nextAfter, 'back');

      this.props.fading = true;

      // Animate current slide
      addClass(current, 'fadeOut');

      this.endSlide(current, next, nextAfter);

    };

    // Set 1s timeout to launch the change in slides
    this.endSlide = function(current, next, nextAfter) {
      global.setTimeout(function() {
        self.props.fading = false;

        for (var index in self.props.indices) {
          if (self.props.indices.hasOwnProperty(index)) {
            self.props.indices[index] += self.props.i;
          }
        }

        // Change the current/next/previous indices
        self.cycleIndices();

        addClass(current, 'rear'); removeClass(current, 'front');
        addClass(next, 'front'); removeClass(next, 'back');
        addClass(nextAfter, 'back'); removeClass(nextAfter, 'rear');

        // Stop animating the current slide
        removeClass(current, 'fadeOut');

      }, 1000);
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





  /*
   * Controller
   */
  var SlideshowControl = function() {

    // Initialize the model and the view
    this.init = function() {
      app.slides = new Slides();
      app.slideshow = new Slideshow();
      this.populate();
    };



    // Populate the slides
    this.populate = function() {
      var data;
      var images = app.slides.images;
      app.slideshow.createSlides(images);
    };


    // Start the slideshow
    this.init();

  };

  // Initialize the Slideshow Controller
  app.slideshowControl = new SlideshowControl();


})(this, app);
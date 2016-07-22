var app = app || {};

(function(window, app) {

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

    // Variables for tracking the slideshow state
    this.props = {
      currentImage: 0,
      nextImage: 1,
      nextAfterImage: 2,
      prevImage: this.images.length - 1,
      prevBeforeImage: this.images.length - 2,
      i: 1,
      fading: false,
    };

  };





  /*
   * View
   */
  var Slideshow = function() {

    this.init = function() {
      this.slideTemplate = _.template(document.getElementById('slide-template').innerHTML);

      this.container = document.getElementById('slide-container');
    };

    // Create slide for each images
    this.createSlides = function(slides) {
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
      var compiled = this.slideTemplate(slide);
      var temp = document.createElement('div');
      temp.innerHTML = compiled;
      var el = temp.childNodes[1];
      this.container.insertBefore(el, this.container.firstChild);
    };

    // Prepare initial slides
    this.prepSlides = function() {
      this.slides = document.getElementsByClassName('img-panel');

      var first = this.slides[app.slideshowControl.currentImage()];
      addClass(first, 'front'); removeClass(first, 'rear');
      var second = this.slides[app.slideshowControl.nextImage()];
      addClass(second, 'rear'); removeClass(second, 'front');

      this.startSlideshow();

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



    /*
     * Model property accessors
     */
    this.currentImage = function() {
      return app.slides.props.currentImage;
    }
    this.nextImage = function() {
      return app.slides.props.nextImage;
    }
    this.nextAfterImage = function() {
      return app.slides.props.nextAfterImage;
    }
    this.prevImage = function() {
      return app.slides.props.prevImage;
    }
    this.prevBeforeImage = function() {
      return app.slides.props.prevBeforeImage;
    }



    // Start the slideshow
    this.init();

  };

  // Initialize the Slideshow Controller
  app.slideshowControl = new SlideshowControl();


})(this, app);
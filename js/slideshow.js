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
        currentImage: 0,
        nextImage: 1,
        nextAfterImage: 2,
        i: 1,
        fading: false,
        duration: 8000
      };

      this.container = document.getElementById('slide-container');
    };

    // Create slide for each images
    this.createSlides = function(slides) {
      // Set array.length dependent properties
      this.props.prevImage = slides.length - 1;
      this.props.prevBeforeImage = slides.length - 2;

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

      var first = this.slides[this.props.currentImage];
      addClass(first, 'front'); removeClass(first, 'rear');
      var second = this.slides[this.props.nextImage];
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
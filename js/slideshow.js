var app = app || {};

(function(window, app) {

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

    this.slideTemplate = _.template(document.getElementById('slide-template').innerHTML);

    this.container = document.getElementById('slide-container');

    // Create and insert the slideshow images
    this.createSlide = function(slide) {
      var compiled = this.slideTemplate(slide);
      var temp = document.createElement('div');
      temp.innerHTML = compiled;
      var el = temp.childNodes[1];
      this.container.insertBefore(el, this.container.firstChild);
    };

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
      for (var i = 0, len = images.length; i < len; i++) {
        data = {
          i: i,
          image: images[i]
        };
        // Create and display the slides
        app.slideshow.createSlide(data);
      }
    }

    // Start the slideshow
    this.init();

  };

  // Initialize the Slideshow Controller
  app.slideshowControl = new SlideshowControl();


})(this, app);
var app = app || {};

(function(app) {

  /* ----------
   * Controller
   * ----------
   */
  var SlideshowControl = function() {

    // Initialize the model and the view
    this.init = function() {
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


})(app);
var app = app || {};

(function(app) {

  /* -------
   * Model
   * -------
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

  app.slides = new Slides();

})(app);
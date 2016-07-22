var app = app || {};

(function(app) {

  app.utilities = {};

  /* --------------------------------------------------
   * Utility functions - from You Might Not Need jQuery
   * --------------------------------------------------
   */
  app.utilities.hasClass = function(el, className) {
    console.log(el, className);
    if (el.classList) {
      el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  };
  app.utilities.addClass = function(el, className) {
    console.log(el, className);
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };
  app.utilities.removeClass = function(el, className) {
    console.log(el, className);
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };
  app.utilities.toggleClass = function(el, className) {
    console.log(el, className);
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
  };


})(app);
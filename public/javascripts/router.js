(function() {
  var loadTemplate;

  this.Router = Backbone.Router.extend({
    routes: {
      "": "index",
      about: "about",
      help: "help",
      "search/:query": "search",
      "search/:query/p:page": "search"
    },
    index: function() {
      var $app;
      $app = $('#app');
      return $app.fadeOut(100, function() {
        clientsView.initialize();
        return $app.fadeIn(100);
      });
    },
    about: function() {
      return loadTemplate('about');
    },
    help: function() {
      return loadTemplate('help');
    }
  }, loadTemplate = function(templateId) {
    var $app;
    $app = $('#app');
    return $app.fadeOut(100, function() {
      $app.html(_.template($('#' + templateId + '-template').html()));
      return $app.fadeIn(100);
    });
  });

}).call(this);

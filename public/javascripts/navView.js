(function() {
  this.NavView = Backbone.View.extend({
    el: $("#mainNav")[0],
    events: {
      "click a": "navClick"
    },
    navClick: function(ev) {
      this.$("ul.nav a").removeClass("active");
      return $(ev.target).addClass("active");
    }
  });

}).call(this);

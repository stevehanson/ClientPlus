(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  _.templateSettings = {
    interpolate: /\{\{([\s\S]+?)\}\}/g
  };

  root.ClientView = Backbone.View.extend({
    tagName: "div",
    clientTemplate: _.template($("#client-template").html()),
    initialize: function() {
      return this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.clientTemplate(this.model.toJSON()));
      return this;
    }
  });

}).call(this);

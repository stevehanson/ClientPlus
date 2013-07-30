(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.ClientsView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.collection, "reset", this.onReset);
      return this.onReset();
    },
    events: {
      "click .client-box": "clientBoxClick"
    },
    render: function() {
      var that;
      that = this;
      $(this.el).empty();
      return _(this._clientViews).each(function(cv) {
        console.log("appending cv: ");
        console.log(cv.model.toJSON());
        return $("#app").append(cv.render().$el.html());
      });
    },
    onReset: function() {
      var that;
      that = this;
      this._clientViews = [];
      this.collection.each(function(client) {
        console.log("adding client ");
        console.log(client.toJSON());
        return that._clientViews.push(new ClientView({
          model: client
        }));
      });
      return this.render();
    },
    clientBoxClick: function(ev) {
      var $clientBox, $target, url;
      $target = $(ev.target);
      $clientBox = ($target.hasClass("client-box") ? $target : $target.parents(".client-box"));
      url = "/clients/" + $clientBox.attr("data-href");
      console.log("url: " + url);
      return window.location.href = url;
    }
  });

}).call(this);

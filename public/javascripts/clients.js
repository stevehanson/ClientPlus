(function() {
  this.Clients = Backbone.Collection.extend({
    model: Client,
    url: '/clients.json'
  });

}).call(this);

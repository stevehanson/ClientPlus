/*
  Add your application's coffee-script code here
*/


(function() {
  var clients, navView, root, router;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  console.log('starting the app!');

  navView = new NavView();

  clients = new Clients();

  this.clientsView = new ClientsView({
    collection: clients,
    el: $('#app')[0]
  });

  clients.fetch({
    reset: true
  });

  router = new Router();

  Backbone.history.start();

}).call(this);

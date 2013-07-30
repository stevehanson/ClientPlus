###
  Add your application's coffee-script code here
###

root = exports ? this


console.log 'starting the app!'

    
navView = new NavView()


clients = new Clients()

this.clientsView = new ClientsView(
  collection : clients
  el : $('#app')[0]
);

clients.fetch( reset: true );

router = new Router();
Backbone.history.start();



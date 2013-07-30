 _.templateSettings = {
        interpolate : /\{\{([\s\S]+?)\}\}/g
      };

var Client = Backbone.Model.extend({
    defaults: {
        name: '',
        description: ''
    }
});

var Clients = Backbone.Collection.extend({
	model: Client,
	url: '/clients.json'
});

//console.log(clients.toJSON());

//var client = new Client({name:'Steve', description:'description'});
				//new CLient({name:'Decorators Warehouse', description:'description'})];

var ClientView = Backbone.View.extend({
	
	tagName: 'div',

	clientTemplate: _.template( $('#client-template').html() ),

	// Called when the view is first created
	initialize: function () {
		//this.$el = $('#app');
		this.listenTo(this.model, "change", this.render);
		// this.listenTo(someCollection, 'all', this.render);
	},

	// Re-render the titles of the todo item.
	render: function() {
		this.$el.html( this.clientTemplate( this.model.toJSON() ) );
		return this;
	},

  

});


 var ClientsView = Backbone.View.extend({
  
  initialize : function() {
    this.listenTo(this.collection, 'reset', this.onReset);
    this.onReset();
  },

  events: {
    'click .client-box': 'clientBoxClick'
  },
 
  render : function() {
    var that = this;
    // Clear out this element.
    $(this.el).empty();
 
    // Render each sub-view and append it to the parent view's element.
    _(this._clientViews).each(function(cv) {
    	console.log('appending cv: ');
    	console.log(cv.model.toJSON());
      //$(that.el).append(cv.render().$el);
      $('#app').append(cv.render().$el.html());
    });
  },

  onReset: function() {
    var that = this;
    this._clientViews = [];

    this.collection.each(function(client) {
      console.log('adding client ');
      console.log(client.toJSON());
        that._clientViews.push(new ClientView({
        model : client
      }));
    });
    this.render();
  },

  clientBoxClick: function(ev) {
    var $target = $(ev.target);
    var $clientBox = $target.hasClass('client-box') ? $target : $target.parents('.client-box');
    var url = '/clients/' + $clientBox.attr('data-href');
    console.log('url: ' + url);
    window.location.href = url;
  }

});

var NavView = Backbone.View.extend({

  el: $('#mainNav')[0],

  events: {
    'click a': 'navClick'
  },

  navClick: function(ev) {
    this.$('ul.nav a').removeClass('active');
    $(ev.target).addClass('active');
  }

});

var navView = new NavView();


var clients = new Clients();

var clientsView = new ClientsView({
  collection : clients,
  el : $('#app')[0]
});

clients.fetch({ reset: true });

// create a view for a todo
// var clientView = new ClientView({model: client});
// appView.render();


var Workspace = Backbone.Router.extend({

  routes: {
    '': 'index',
    "about":                 "about",    // #help
    'help': 'help',
    "search/:query":        "search",  // #search/kiwis
    "search/:query/p:page": "search"   // #search/kiwis/p7
  },

  index: function() {
    clientsView.initialize();
  },

  about: function() {
    $('#app').fadeOut(100, function() {
      $('#app').html(_.template( $('#about-template').html()));
      $('#app').fadeIn(100);
    });
  },

  help: function() {
    $('#app').fadeOut(100, function() {
      $('#app').html(_.template( $('#help-template').html()));
      $('#app').fadeIn(100);
    });
  },
});

var router = new Workspace();
Backbone.history.start();


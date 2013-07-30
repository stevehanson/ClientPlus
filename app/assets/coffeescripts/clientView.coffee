root = exports ? this

_.templateSettings = 
    interpolate : /\{\{([\s\S]+?)\}\}/g

root.ClientView = Backbone.View.extend(
  tagName: "div"
  clientTemplate: _.template($("#client-template").html())
  
  # Called when the view is first created
  initialize: ->
    
    #this.$el = $('#app');
    @listenTo @model, "change", @render

  
  # this.listenTo(someCollection, 'all', this.render);
  
  # Re-render the titles of the todo item.
  render: ->
    @$el.html @clientTemplate(@model.toJSON())
    this
)
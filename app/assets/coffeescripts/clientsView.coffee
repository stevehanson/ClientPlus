root = exports ? this

root.ClientsView = Backbone.View.extend(
  initialize: ->
    @listenTo @collection, "reset", @onReset
    @onReset()

  events:
    "click .client-box": "clientBoxClick"

  render: ->
    that = this
    
    # Clear out this element.
    $(@el).empty()
    
    # Render each sub-view and append it to the parent views element.
    _(@_clientViews).each (cv) ->
      console.log "appending cv: "
      console.log cv.model.toJSON()
      
      #$(that.el).append(cv.render().$el);
      $("#app").append cv.render().$el.html()


  onReset: ->
    that = this
    @_clientViews = []
    @collection.each (client) ->
      console.log "adding client "
      console.log client.toJSON()
      that._clientViews.push new ClientView(model: client)

    @render()

  clientBoxClick: (ev) ->
    $target = $(ev.target)
    $clientBox = (if $target.hasClass("client-box") then $target else $target.parents(".client-box"))
    url = "/clients/" + $clientBox.attr("data-href")
    console.log "url: " + url
    window.location.href = url
)


this.Router = Backbone.Router.extend(
  routes:
    "": "index"
    about: "about" # #help
    help: "help"
    "search/:query": "search" # #search/kiwis
    "search/:query/p:page": "search" # #search/kiwis/p7

  index: ->
    $app = $('#app')
    $app.fadeOut 100, ->
        clientsView.initialize()
        $app.fadeIn 100    

  about: ->
    loadTemplate 'about'


  help: ->
    loadTemplate 'help'


  loadTemplate = (templateId) ->
    $app = $('#app')
    $app.fadeOut 100, ->
        $app.html _.template($('#'+templateId+'-template').html())
        $app.fadeIn 100    

)
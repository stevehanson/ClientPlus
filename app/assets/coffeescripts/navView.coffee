
this.NavView = Backbone.View.extend(
  el: $("#mainNav")[0]
  events:
    "click a": "navClick"

  navClick: (ev) ->
    @$("ul.nav a").removeClass "active"
    $(ev.target).addClass "active"
)
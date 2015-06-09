BillOrganizer.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.thml(view.rener().$el);
  },

  routes: {
    "": "index",
    "api/bills/:id": "show"
  },

  index: function() {
    var view = new BillOrganizer.Views.BillIndex({collection: this.collection});
    this._swapView(view);
  },

  show: function() {
    var bill = this.collection.getOrFetch(id);
    var view = new BillOrganizer.Views.BillShow({model: bill});
    this._swapView(view);
  }
});

BillOrganizer.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  routes: {
    "": "index",
    "bills": "index",
    "bills/new": "new",
    "bills/:id": "show",
    "bills/:id/edit": "edit"
  },

  index: function() {
    this.collection.sort();
    var view = new BillOrganizer.Views.BillsIndex({collection: this.collection});
    this._swapView(view);
  },

  new: function(){
    var newBill = new BillOrganizer.Models.Bill();
    var view = new BillOrganizer.Views.BillForm({
      model: newBill,
      collection: this.collection,
      formType: "Create"
    });
    this._swapView(view);
  },

  show: function(id) {
    var bill = this.collection.getOrFetch(id);
    var view = new BillOrganizer.Views.BillShow({model: bill});
    this._swapView(view);
  },

  edit: function(id) {
    var bill = this.collection.getOrFetch(id);
    var view = new BillOrganizer.Views.BillForm({
      model: bill,
      collection: this.collection,
      formType: "Edit"
    });
    this._swapView(view);
  },

});

BillOrganizer.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
    this.taggedBills = options.taggedBills;
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
    "(?#)bills/:id": "show",
    "bills/:id/edit": "edit"
  },


  index: function() {
    view = new BillOrganizer.Views.Dashboard({ collection: this.collection,
      taggedBills: this.taggedBills
    });
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
    var bill = new BillOrganizer.Models.Bill({id: id});
    bill.fetch({
      success: function(){
        var view = new BillOrganizer.Views.BillShow({model: bill});
        this._swapView(view);
      }.bind(this),
      error: function(){
        alert("Bill not found!");
        Backbone.history.navigate("", {trigger: true});
      }
    });
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

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
    "bills/?:searchString": "search",
    "(?#)bills/:id": "show",
    "bills/:id/edit": "edit"
  },


  index: function() {
    var view = new BillOrganizer.Views.Dashboard({ collection: this.collection,
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

  search: function(searchString){
    var reg = new RegExp(searchString, "i");
    var searchCollection = new BillOrganizer.Collections.Bills();
    var searchedBills = this.collection.filter(function(bill){
      return bill.escape("title").match(reg);
    });
    searchedBills.forEach(function(bill){
      searchCollection.add(bill);
    })
    var searchTaggedCollection = new BillOrganizer.Collections.Bills();
    var searchedTaggedBills = this.taggedBills.filter(function(bill){
      return bill.escape("title").match(reg);
    })
    searchedTaggedBills.forEach(function(bill){
      searchTaggedCollection.add(bill);
    });
    if (searchTaggedCollection.length + searchCollection.length === 0){
      alert("Bill not found!");
      window.history.back();
    } else if (searchTaggedCollection.length + searchCollection.length === 1){
      if (searchTaggedCollection.length === 1){
        var bill = searchTaggedCollection.pop();
        Backbone.history.navigate("#bills/"+bill.escape("id"), { trigger: true });
      } else {
        var bill = searchCollection.pop();
        Backbone.history.navigate("#bills/"+bill.escape("id"), { trigger: true });
      }
    } else {
      var view = new BillOrganizer.Views.Dashboard({ collection: searchCollection,
        taggedBills: searchTaggedCollection
      });
      this._swapView(view);
    }
  }

});

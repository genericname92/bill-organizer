BillOrganizer.Views.Dashboard = Backbone.View.extend({
  template: JST["bills/dashboard"],
  className: "group",
  initialize: function(options){
    this.taggedBills = options.taggedBills;
  },
  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.renderSubView();
    return this;
  },

  renderSubView: function(){
    this.indexView && this.indexView.remove();
    if (this.filteredCollection || this.filteredTaggedCollection){
      this.indexView = new BillOrganizer.Views.BillsIndex({collection: this.filteredCollection,
        taggedBills: this.filteredTaggedBills,
      });
    } else {
      this.indexView = new BillOrganizer.Views.BillsIndex({
        collection: this.collection,
        taggedBills: this.taggedBills
        });
    }
    this.$el.append(this.indexView.render().$el);
  },

  events: {
    "keyup .dynamicSearch": "findBills"
  },

  remove: function(){
    this.indexView.remove();
    Backbone.View.prototype.remove.call(this);
  },

  findBills: function(event){
    var queryString = new RegExp(event.currentTarget.value, "i");
    var filteredCollection = new BillOrganizer.Collections.Bills();
    var filteredBills = this.collection.filter(function(bill){
      return bill.escape("title").match(queryString);
    });
    filteredBills.forEach(function(bill){
      filteredCollection.add(bill);
    });
    var filteredTaggedCollection = new BillOrganizer.Collections.Bills();
    var filteredTaggedBills = this.taggedBills.filter(function(bill){
      return bill.escape("title").match(queryString);
    });
    filteredTaggedBills.forEach(function(bill){
      filteredTaggedCollection.add(bill);
    });
    this.filteredCollection = filteredCollection;
    this.filteredTaggedBills = filteredTaggedCollection;
    this.renderSubView();
  }
});

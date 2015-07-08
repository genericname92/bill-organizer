BillOrganizer.Views.NavView = Backbone.CompositeView.extend({
  template: JST["_navbar"],
  initialize: function(options){
    this.router = options.router;
    this.followBills = new BillOrganizer.Collections.Bills();
    this.followBills.fetch({ data: {unseenTaggedBills: true } });
    this.listenTo(this.followBills, "sync remove", this.render);
    this.listenTo(this.followBills, 'add', this.addBill);

    this.followBills.each(function(bill){
      this.addBill(bill);
    }.bind(this));
  },

  addBill: function(bill) {
    var view = new BillOrganizer.Views.Notifications({model: bill, collection: this.followBills});
    this.addSubview('.notifications', view);
  },

  events: {
    "submit .searchBar": "search"
  },
  render: function(){
    var content = this.template({followBills: this.followBills});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  search: function(event){
    event.preventDefault();
    var form = $(event.currentTarget).serializeJSON();
    $(event.currentTarget).find("input").val("");
    var searchString = form.searchString;
    var reg = /^\d+$/;
    if (searchString.match(reg)){
      Backbone.history.navigate("#bills/"+searchString, { trigger: true });
    } else {
      Backbone.history.navigate("#bills/?"+searchString, { trigger: true});
    }
  }
});

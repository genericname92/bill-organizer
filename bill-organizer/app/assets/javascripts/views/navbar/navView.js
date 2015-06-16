BillOrganizer.Views.NavView = Backbone.CompositeView.extend({
  template: JST["_navbar"],
  initialize: function(options){
    this.router = options.router;
    this.followBills = new BillOrganizer.Collections.FollowBills();
    this.followBills.fetch();
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

  render: function(){
    var content = this.template({followBills: this.followBills});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});

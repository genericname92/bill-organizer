BillOrganizer.Views.NavView = Backbone.CompositeView.extend({
  template: JST["_navbar"],
  initialize: function(options){
    this.router = options.router;
    this.notifications = new BillOrganizer.Collections.Notifications();
    this.notifications.fetch();
    this.listenTo(this.notifications, "sync remove", this.render);
    this.listenTo(this.notifications, 'add', this.addBill);

    this.notifications.each(function(bill){
      this.addBill(bill);
    }.bind(this));
  },

  addBill: function(bill) {
    if ()
    var view = new BillOrganizer.Views.Notifications({model: bill, collection: this.notifications});
    this.addSubview('.notifications', view);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});

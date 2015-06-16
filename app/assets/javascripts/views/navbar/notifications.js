BillOrganizer.Views.Notifications = Backbone.View.extend({
  template: JST["navbars/notifications"],
  tagName: "li",
  className: "notification",
  events: {
    "click": "removeNotification"
  },

  render: function(){
    var content = this.template({bill: this.model});
    this.$el.html(content);
    return this;
  },

  removeNotification: function(){
    var bill = this.collection.remove(this.model);
    var notification = bill.notifications().first();
    notification.set({"viewed": true});
    notification.save({});
    this.remove();
  }
});

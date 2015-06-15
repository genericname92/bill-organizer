BillOrganizer.Views.Notifications = Backbone.View.extend({
  template: JST["navbars/notifications"],
  tagName: "li",
  className: "notification",
  events: {
    "click": "removeNotification"
  },

  render: function(){
    var content = this.template({notification: this.model});
    this.$el.html(content);
    return this;
  },

  removeNotification: function(){
    var notification = this.collection.remove(this.model);
    notification.set({"viewed": true});
    notification.save({});
  }
});

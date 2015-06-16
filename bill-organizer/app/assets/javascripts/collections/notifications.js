BillOrganizer.Collections.Notifications = Backbone.Collection.extend({
  url: "api/follows",
  model: BillOrganizer.Models.Notification
});

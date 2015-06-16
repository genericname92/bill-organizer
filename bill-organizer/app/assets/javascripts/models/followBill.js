BillOrganizer.Models.FollowBill = Backbone.Model.extend({
  urlRoot: 'api/bills',
  parse: function(response) {
  this.notifications().set(response.notifications, {parse: true});
  delete response.notifications;
  return response;
},


notifications: function(){
  if (!this._notifications){
    this._notifications = new BillOrganizer.Collections.Notifications([], {bill: this});
  }
  return this._notifications;
}
});

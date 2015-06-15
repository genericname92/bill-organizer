BillOrganizer.Models.FollowBill = Backbone.Model.extend({
  urlRoot: 'api/bills',
  parse: function(response) {
  this.roommates().set(response.roommates);
  delete response.roommates;
  this.notifications().set(response.notifications);
  delete response.notifications;
  return response;
},

roommates: function(){
  if (!this._roommates){
    this._roommates = new BillOrganizer.Collections.Roommates([], { bill: this });
  }
  return this._roommates;
},

notifications: function(){
  if (!this._notifications){
    this._notifications = new BillOrganizer.Collections.Notifications([], {bill: this});
  }
  return this._notifications;
}
});

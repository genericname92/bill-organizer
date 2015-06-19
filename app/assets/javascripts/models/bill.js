BillOrganizer.Models.Bill = Backbone.Model.extend({
  urlRoot: 'api/bills',
  parse: function(response) {
  if (response.roommates){
    this.roommates().set(response.roommates, {parse: true});
    delete response.roommates;
  }
  if (response.notifications){
    this.notifications().set(response.notifications, {parse: true});
    delete response.notifications;
  }
  if (response.comments){
    this.comments().set(response.comments, {parse: true});
    delete response.comments;
  }
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
},
comments: function(){
  if (!this._comments){
    this._comments = new BillOrganizer.Collections.Comments([], { bill: this });
  }
  return this._comments;
},
});

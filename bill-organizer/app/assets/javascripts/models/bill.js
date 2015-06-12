BillOrganizer.Models.Bill = Backbone.Model.extend({
  urlRoot: 'api/bills',
  parse: function(response) {
  this.roommates().set(response.roommates);
  delete response.roommates;
  return response;
},

roommates: function(){
  if (!this._roommates){
    this._roommates = new BillOrganizer.Collections.Roommates([], { bill: this });
  }
  return this._roommates;
}
});

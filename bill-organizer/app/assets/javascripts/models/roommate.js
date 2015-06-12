BillOrganizer.Models.Roommate = Backbone.Model.extend({
  urlRoot: 'api/roommates',
  initialize: function(options){
    this.bill = options.bill;
  }
});

BillOrganizer.Models.Notification = Backbone.Model.extend({
  urlRoot: 'api/comment',
  initialize: function(options){
    this.bill = options.bill;
  }
});

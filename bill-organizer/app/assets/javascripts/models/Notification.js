BillOrganizer.Models.Notification = Backbone.Model.extend({
  urlRoot: 'api/follows',
  initialize: function(options){
    this.bill = options.bill;
  }
});

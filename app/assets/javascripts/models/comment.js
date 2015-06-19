BillOrganizer.Models.Comment = Backbone.Model.extend({
  urlRoot: 'api/comments',
  initialize: function(options){
    this.bill = options.bill;
  }
});

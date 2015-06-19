BillOrganizer.Collections.Roommates = Backbone.Collection.extend({
  url: "api/comments",
  model: BillOrganizer.Models.Comment,
  initialize: function(models, options){
    this.bill = options.bill;
  }

});

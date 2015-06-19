BillOrganizer.Collections.Comments = Backbone.Collection.extend({
  url: "api/comments",
  model: BillOrganizer.Models.Comment,
  initialize: function(models, options){
    this.bill = options.bill;
  },
  comparator: function(comment){
    var created = new Date(comment.escape("created_at"));
    return created.getTime();
  }

});

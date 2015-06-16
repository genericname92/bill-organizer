BillOrganizer.Collections.Roommates = Backbone.Collection.extend({
  url: "api/roommates",
  model: BillOrganizer.Models.Roommate,
  initialize: function(models, options){
    this.bill = options.bill;
    this.memento = new Backbone.Memento(this);
    _.extend(this, this.memento);

    }

});

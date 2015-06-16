BillOrganizer.Models.Roommate = Backbone.Model.extend({
  urlRoot: 'api/roommates',
  initialize: function(options){
    this.bill = options.bill;
    var memento = new Backbone.Memento(this);
    _.extend(this, memento);
  }
});

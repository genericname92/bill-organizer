BillOrganizer.Collections.Bills = Backbone.Collection.extend({
  url: 'api/bills',
  model: BillOrganizer.Models.Bill

});

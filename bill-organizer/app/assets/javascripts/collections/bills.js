BillOrganizer.Collections.Bills = Backbone.Collection.extend({
  url: 'api/bills',
  model: BillOrganizer.Models.Bill,

  comparator: function(bill){
    return bill.escape('updated_at');
  },

  getOrFetch: function(id){
    var collection = this;
    var bill = collection.get(id);
    if (bill){
      bill.fetch();
    } else {
      bill = new BillOrganizer.Models.Bill({ id: id });
      bill.fetch({
        success: function() {
          collection.add(bill);
        }
      });
    }
    return bill;
  }

});

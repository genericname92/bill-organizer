BillOrganizer.Collections.Bills = Backbone.Collection.extend({
  url: 'api/bills',
  model: BillOrganizer.Models.Bill,

  comparator: function(bill){
    var dateObject = new Date(bill.escape('end_date'));
    return -dateObject.getTime();
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

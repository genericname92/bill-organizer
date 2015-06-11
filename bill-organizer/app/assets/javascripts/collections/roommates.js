BillOrganizer.Collections.Roommates = Backbone.Collection.extend({
  url: "api/roommates",
  model: BillOrganizer.Models.Roommate,
  getOrFetch: function(id){
    var collection = this;
    var roommate = collection.get(id);
    if (roommate){
      roommate.fetch();
    } else {
      roommate = new BillOrganizer.Models.Roommate({ id: id });
      roommate.fetch({
        success: function() {
          collection.add(roommate);
        }
      });
    }
    return roommate;
  }

});

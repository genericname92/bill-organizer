BillOrganizer.Collections.FollowBills = Backbone.Collection.extend({
  url: "api/bills/unseen_tagged_bills",
  model: BillOrganizer.Models.FollowBill
});
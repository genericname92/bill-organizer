window.BillOrganizer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    BillOrganizer.bills = new BillOrganizer.Collections.Bills();
    BillOrganizer.bills.fetch();
    BillOrganizer.taggedBills = new BillOrganizer.Collections.Bills();
    BillOrganizer.taggedBills.fetch({data: {taggedBills: true} });
    var router = new BillOrganizer.Routers.Router({
      $rootEl: $('#main'),
      collection: BillOrganizer.bills,
      taggedBills: BillOrganizer.taggedBills
    });
    var navbar = new BillOrganizer.Views.NavView({
      router: router,
    });
    $('#navbar').html(navbar.render().$el);
    Backbone.history.start();
  }
};

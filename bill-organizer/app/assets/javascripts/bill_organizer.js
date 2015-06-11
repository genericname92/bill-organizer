window.BillOrganizer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    BillOrganizer.bills = new BillOrganizer.Collections.Bills();
    BillOrganizer.bills.fetch();
    var router = new BillOrganizer.Routers.Router({
      $rootEl: $('#main'),
      collection: BillOrganizer.bills
    });
    var navbar = new BillOrganizer.Views.NavView({
      router: router,
      collection: BillOrganizer.bills
    });
    $('#navbar').html(navbar.render().$el);
    Backbone.history.start();
  }
};

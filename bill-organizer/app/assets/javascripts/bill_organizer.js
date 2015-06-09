window.BillOrganizer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new BillOrganizer.Routers.Router($this.el: $('.main'));

  }
};

$(document).ready(function(){
  BillOrganizer.initialize();
});

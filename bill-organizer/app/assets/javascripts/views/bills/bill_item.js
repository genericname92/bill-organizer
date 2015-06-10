BillOrganizer.Views.BillItem = Backbone.View.extend({
  template: JST["bills/bill_item"],
  tagName: "li",
  className: "billItem",

  events: {
    "click .deleteBill": "destroyBill"
  },

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({bill: this.model});
    this.$el.html(content);
    return this;
  },

  destroyBill: function(){
    var confirmation = confirm("Are you sure you want to delete this bill?");
    if (confirmation) {
      this.model.destroy();
      this.remove();
    }
  }


});

BillOrganizer.Views.BillItem = Backbone.View.extend({
  template: JST["bills/bill_item"],
  tagName: "li",
  className: "billItem",

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({bill: this.model});
    this.$el.html(content);
    return this;
  }


});

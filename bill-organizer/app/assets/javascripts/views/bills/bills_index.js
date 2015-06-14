BillOrganizer.Views.BillsIndex = Backbone.CompositeView.extend({

  template: JST['bills/index'],
  className: "billIndex col-md-6 col-md-offset-3",

  initialize: function(){
    this.listenTo(this.collection, 'delete sync', this.render);
    this.listenTo(this.collection, 'add', this.addBill);
    this.collection.each(function(bill){
      this.addBill(bill);
    }.bind(this));
  },

  addBill: function(bill) {
    var view = new BillOrganizer.Views.BillItem({model: bill});
    this.addSubview('.billList', view);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


});

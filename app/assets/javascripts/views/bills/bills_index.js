BillOrganizer.Views.BillsIndex = Backbone.CompositeView.extend({

  template: JST['bills/index'],
  className: "billIndex",

  initialize: function(options){
    this.taggedBills = options.taggedBills;
    this.listenTo(this.collection, 'delete sync', this.render);
    this.listenTo(this.taggedBills, 'delete sync', this.render);
    if (this.collection.length === 0){
      this.listenToOnce(this.collection,
         'sync',
         function(){
            this.collection.each(this.addBill.bind(this))
         });
    }

    if (this.taggedBills.length === 0){
      this.listenToOnce(this.taggedBills,
        'sync',
        function(){
          this.taggedBills.each(this.addTaggedBill.bind(this))
        });
    }
    this.collection.each(this.addBill.bind(this));
    this.taggedBills.each(this.addTaggedBill.bind(this));
  },

  addBill: function(bill) {
    var view = new BillOrganizer.Views.BillItem({model: bill});
    this.addSubview('.billList', view);
  },

  addTaggedBill: function(bill){
    var view = new BillOrganizer.Views.BillItem({model: bill});
    this.addSubview('.taggedBills', view);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});

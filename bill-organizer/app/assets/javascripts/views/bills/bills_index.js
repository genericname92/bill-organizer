BillOrganizer.Views.BillsIndex = Backbone.View.extend({

  template: JST['bills/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add reset delete sync', this.render);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(bill){
        var billItem = new BillOrganizer.Views.BillItem({model: bill});
        $(this.$el).find('ul').append(billItem.render().$el);
    }.bind(this));
    return this;
  }

});

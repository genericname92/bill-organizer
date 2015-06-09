BillOrganizer.Views.NavView = Backbone.View.extend({
  template: JST["_navbar"],
  initialize: function(){
    this.listenTo(this.collection, 'reset add remove', this.render)
  },
  render: function(){
    var content = this.template({bills: this.collection});
    this.$el.html(content);
    return this;
  }
});

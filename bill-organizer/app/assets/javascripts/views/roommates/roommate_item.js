BillOrganizer.Views.RoommateItem = Backbone.View.extend({
  template: JST["roommates/item"],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({roommate: this.model});
    this.$el.html(content);
    return this;
  }
});

BillOrganizer.Views.RoommatesNew = Backbone.View.extend({
  template: JST["roommates/form"],
  initialize: function(options){
    this.formType = options.formType;
    this.listenTo(this.model, 'change sync', this.render);
  },

  render: function(){
    var content = this.template({roommate: this.model, formType: this.formType});
    this.$el.html(content);
    return this;
  }
});

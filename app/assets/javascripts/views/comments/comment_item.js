BillOrganizer.Views.CommentItem = Backbone.View.extend({
  template: JST["comments/item"],
  classname: "commentItem group",
  initialize: function(options){
    this.bill = options.bill;
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    "click .killComment": "killComment"
  },
  render: function(){
    var content = this.template({comment: this.model, bill: this.bill});
    this.$el.html(content);
    return this;
  },

  killComment: function(event){
    event.preventDefault();
    this.model.destroy();
    this.remove();
  }
});

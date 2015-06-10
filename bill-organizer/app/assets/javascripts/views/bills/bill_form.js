BillOrganizer.Views.BillForm = Backbone.View.extend({
  template: JST["bills/form"],

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render);
  },
  events: {
    "submit form": "submit"
  },

  render: function(){
    var content = this.template({bill: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(){
    event.preventDefault();
    console.log("got there");
  }
});

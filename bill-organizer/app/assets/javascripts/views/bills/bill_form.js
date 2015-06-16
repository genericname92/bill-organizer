BillOrganizer.Views.BillForm = Backbone.View.extend({
  template: JST["bills/form"],

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
    this.formType = options.formType;
  },
  events: {
    "submit form": "submit",
    "click .type_buttons button": "fillType"
  },

  render: function(){
    var content = this.template({bill: this.model, formType: this.formType});
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    attrs.owner_id = window.CURRENT_USER_ID;
    this.model.set(attrs);
    this.model.save({}, {
      wait: true,
      success: function(){
        this.collection.add(this.model, {merge: true});
        Backbone.history.navigate("bills/"+this.model.id, {trigger: true});
      }.bind(this),
      error: function(model, response){
        $('.errors').empty();
        response.responseJSON.forEach(function(el){
          var $li = $('<li></li>');
          $li.text(el);
          $('.errors').append($li);
        }.bind(this));
      }
    });
  },

  fillType: function(event){
    var value = event.currentTarget.value;
    $('.bill_type').val(value);
  }
});

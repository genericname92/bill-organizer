BillOrganizer.Views.RoommatesNew = Backbone.View.extend({
  template: JST["roommates/form"],
  initialize: function(options){
    this.formType = options.formType;
    this.listenTo(this.model, 'change sync', this.render);
  },

  events: {
    "submit form": "submit"
  },

  render: function(){
    var content = this.template({roommate: this.model, formType: this.formType});
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    var bill = this.model.bill;
    this.model.set(attrs);
    this.model.save({},
      {
        wait: true,
        success: function(){
          this.collection.add(this.model, {merge: true});
          this.model = new BillOrganizer.Models.Roommate({bill: bill});
          this.render();
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
    }
});

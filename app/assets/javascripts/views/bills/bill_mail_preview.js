BillOrganizer.Views.MailPreview = Backbone.View.extend({
  template: JST["bills/mail"],

  events: {
    'click .close': 'remove',
    'click .m-backdrop': 'remove',
    "click .sendMail": "submit"
  },

  render: function(){
    var content = this.template({bill: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "api/bills/"+this.model.id+"/mail_to_people",
      dataType: 'json',
      success: function(){
        alert("Mail sent!");
      }.bind(this)
    });
    this.remove();
  }

});

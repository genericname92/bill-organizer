BillOrganizer.Views.BillItem = Backbone.View.extend({
  template: JST["bills/bill_item"],
  tagName: "li",
  className: "billItem",

  events: {
    "click .deleteBill": "destroyBill",
    "click .next": "turnPage"
  },

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var updatedAt = new Date(this.model.escape("updated_at"));
    var date = monthNames[parseInt(updatedAt.getMonth())] +
      " " + updatedAt.getDate() + ", " + updatedAt.getFullYear();
    var content = this.template({bill: this.model, date: date});
    this.$el.html(content);
    return this;
  },

  destroyBill: function(){
    var confirmation = confirm("Are you sure you want to delete this bill?");
    if (confirmation) {
      this.model.destroy();
      this.remove();
    }
  },

  turnPage: function(event){
    $(event.currentTarget.parentElement).attr('id', 'turnPage');
  }


});

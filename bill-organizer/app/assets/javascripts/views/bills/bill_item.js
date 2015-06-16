BillOrganizer.Views.BillItem = Backbone.View.extend({
  template: JST["bills/bill_item"],
  tagName: "li",
  className: "billItem group",

  events: {
    "click .deleteBill": "destroyBill",
    "click .turnPage": "turnPage",
  },

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var updatedAt = new Date(this.model.escape("updated_at"));
    var from_date = new Date(this.model.escape("from_date"));
    var end_date = new Date(this.model.escape("end_date"));
    var date = monthNames[parseInt(updatedAt.getMonth())] +
      " " + updatedAt.getDate() + ", " + updatedAt.getFullYear();
    var fdate = monthNames[parseInt(from_date.getMonth())] +
      " " + from_date.getDate() + ", " + from_date.getFullYear();
    var edate = monthNames[parseInt(end_date.getMonth())] +
      " " + end_date.getDate() + ", " + end_date.getFullYear();
    var content = this.template({bill: this.model, date: date, from_date: fdate, end_date: edate});
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
    console.log("got there");
    $(event.currentTarget.parentElement).addClass('activePage');
  },


});

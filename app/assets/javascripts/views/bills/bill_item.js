BillOrganizer.Views.BillItem = Backbone.View.extend({
  template: JST["bills/bill_item"],
  tagName: "li",
  className: "billItem group",

  events: {
    "click .deleteBill": "destroyBill",
  },

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  parseDate: function(date){
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[parseInt(date.getUTCMonth())] +
      " " + date.getUTCDate() + ", " + date.getUTCFullYear();

  },

  render: function(){
    var updatedAt = new Date(this.model.escape("updated_at"));
    var from_date = new Date(this.model.escape("from_date"));
    var end_date = new Date(this.model.escape("end_date"));
    var date = this.parseDate(updatedAt);
    var fdate = this.parseDate(from_date);
    var edate = this.parseDate(end_date);
    var content = this.template({bill: this.model, date: date, from_date: fdate, end_date: edate});
    this.$el.html(content);
    if (this.model === this.collection.last()){
      this.$el.css({"border-bottom": "1px solid black"});
    }
    return this;
  },

  destroyBill: function(){
    var confirmation = confirm("Are you sure you want to delete this bill?");
    if (confirmation) {
      this.model.destroy();
      this.remove();
    }
  },



});

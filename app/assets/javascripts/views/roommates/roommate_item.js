BillOrganizer.Views.RoommateItem = Backbone.View.extend({
  template: JST["roommates/item"],
  className: "SingleRoommate group",
  initialize: function (options) {
    this.listenTo(this.model, 'change sync', this.render);
    this.listenTo(this.model.collection.bill, 'sync', this.render);
    this.calculator = options.calculator;
  },

  events: {
    "change .paidBox": "getPaid",
    "click .editRoommate": "editRoommate",
    "click .killRoommate": "killRoommate"
  },

  render: function () {
    var checked = "";
    if (this.model.escape("paid") === "true"){
      checked = "checked";
      this.$el.addClass("paidRoommate").removeClass("unpaidRoommate");
    } else {
      this.$el.addClass("unpaidRoommate").removeClass("paidRoommate");
    }
    var days = this.calculator.relevantDays(this.model);
    var owedAmount = this.calculator.owedAmount(this.model);
    var content = this.template({
      roommate: this.model,
      checked: checked,
      days: days,
      owedAmount: owedAmount
    });
    this.$el.html(content);
    return this;
  },

  getPaid: function (event) {
    this.togglePaid();
    this.model.save( {},
    {
      wait: true,
      success: function () {
        this.model.collection.bill.roommates().add(this.model, {merge: true});
      }.bind(this)
    });
  },

  togglePaid: function () {
    if (this.model.escape("paid") === "true"){
      this.model.set({"paid": "false"});
    } else {
      this.model.set({"paid": "true"});
    }
  },

  editRoommate: function(event){
    var modal = new BillOrganizer.Views.RoommatesNew({
      model: this.model,
      formType: "Edit",
      collection: this.model.collection
    });
    $('body').prepend(modal.render().$el);
  },

  killRoommate: function(){
    this.model.destroy();
    this.remove();
  },
});

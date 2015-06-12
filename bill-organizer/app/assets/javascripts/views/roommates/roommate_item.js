BillOrganizer.Views.RoommateItem = Backbone.View.extend({
  template: JST["roommates/item"],
  className: "SingleRoommate group",
  initialize: function () {
    this.listenTo(this.model, 'change sync', this.render);
  },

  events: {
    "change .paidBox": "getPaid",
    "click .editRoommate": "editRoommate"
  },

  render: function () {
    var checked = "";
    if (this.model.escape("paid") === "true"){
      checked = "checked";
      this.$el.addClass("paidRoommate").removeClass("unpaidRoommate");
    } else {
      this.$el.addClass("unpaidRoommate").removeClass("paidRoommate");
    }
    var content = this.template({roommate: this.model, checked: checked});
    this.$el.html(content);
    return this;
  },

  getPaid: function (event) {
    this.togglePaid();
    this.model.save({}
    ,{
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

  editRoommate: function(){
    var bd = $('<div class="modal-backdrop"></div>');
    bd.appendTo(document.body);
    setTimeout(function(){
      bd.remove();
    }, 2000);
  }
});

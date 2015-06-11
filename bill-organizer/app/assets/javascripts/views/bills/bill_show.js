BillOrganizer.Views.BillShow = Backbone.CompositeView.extend({
  template: JST["bills/show"],
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.roommates(), "add", this.addRoommate);
    this.listenTo(this.model.roommates(), "remove", this.removeRoommate);
    this.model.roommates().each(function(roommate){
      this.addRoommate(roommate);
    }.bind(this));
    this.addRoommateForm();
  },
  addRoommate: function(roommate){
    var view = new BillOrganizer.Views.RoommateItem({model: roommate});
    this.addSubview('.roommateContainer', view, true);
  },

  removeRoommate: function(){

  },

  addRoommateForm: function(){
    var roommate = new BillOrganizer.Models.Roommate({bill: this});
    var view = new BillOrganizer.Views.RoommatesNew({model: roommate});
    this.addSubview('.roommateContainer', view);
  },
  events: {
    "click .editBill": "edit",
    "click .deleteBill": "destroyBill"
  },
  render: function(){
    var date = "";
    if (this.model.created_at !== this.model.updated_at){
      date = this.parseDate(this.model.escape("updated_at"));
    } else {
      date = this.parseDate(this.model.escape("created_at"));
    }
    var content = this.template({bill: this.model, date: date});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  parseDate: function(date){
    if (date === "undefined"){
      return 0;
    } else {
      var searchString = "T";
      var c = date.indexOf(searchString);
      if (c >= 0){
        return date.substring(0, c);
      }
    }
  },

  edit: function(){
    Backbone.history.navigate("bills/"+this.model.id+"/edit", {trigger: true});
  },

  destroyBill: function(){
    //note: this will have subviews later, kill them with inpugnity
    var confirmation = confirm("Are you sure you want to delete this bill?");
    if (confirmation) {
      this.model.destroy();
      this.remove();
      Backbone.history.navigate("", {trigger: true});
    }
  }
});

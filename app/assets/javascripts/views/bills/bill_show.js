BillOrganizer.Views.BillShow = Backbone.CompositeView.extend({
  template: JST["bills/show"],
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.roommates(), "add", this.addRoommate);
    this.listenTo(this.model.roommates(), "remove", this.removeRoommate);
    this.listenTo(this.model.roommates(), 'sync change remove add', this.renderSubviews);
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), 'sync remove add', this.renderSubviews);
    this.listenTo(this.model.comments(), 'remove', this.removeComment);
    this.calculator = new BillOrganizer.Calculator(this.model);
    this.model.roommates().each(function(roommate){
      this.addRoommate(roommate);
    }.bind(this));
    this.model.comments().each(function(comment){
      this.addComment(comment);
    }.bind(this));
  },
  addRoommate: function(roommate){
    var view = new BillOrganizer.Views.RoommateItem({
      model: roommate,
      calculator: this.calculator
    });
    this.addSubview('.roommateContainer', view);
  },

  removeRoommate: function(roommate){
    this.removeModelSubview(".roommateContainer", roommate);
  },
  addComment: function(comment){
    var view = new BillOrganizer.Views.CommentItem({
      model: comment,
      bill: this.model
    });
    this.addSubview('.comments', view, true);
  },

  removeComment: function(comment){
    this.removeModelSubview(".comments", comment);
  },

  addRoommateForm: function(){
    var roommate = new BillOrganizer.Models.Roommate({bill: this.model});
    var modal = new BillOrganizer.Views.RoommatesNew({
      model: roommate,
      formType: "Create",
      collection: this.model.roommates(),
      bill: this.model
    });
    $('body').prepend(modal.render().$el);
  },
  events: {
    "click .editBill": "edit",
    "click .deleteBill": "destroyBill",
    "click .roommateNew": "addRoommateForm",
    "click .invoice": "sendMail",
    "submit .newComment": "makeComment"
  },
  render: function(){
    var date = "";
    if (this.model.created_at !== this.model.updated_at){
      date = this.parseDate(this.model.escape("updated_at"));
    } else {
      date = this.parseDate(this.model.escape("created_at"));
    }
    var content = this.template({bill: this.model, date: date, validUser: this.validCommenters()});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  validCommenters: function(){
    var validUserIds = [parseInt(this.model.escape("owner_id"))];
    this.model.attributes.taggedUsers.forEach(function(user){
      validUserIds.push(parseInt(user.id));
    });
    if (validUserIds.indexOf(window.CURRENT_USER_ID) === -1){
      return false;
    } else {
      return true;
    }
  },

  renderSubviews: function(){
    this.eachSubview(function(subview){
      subview.render();
    });
    this.render();
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
    var confirmation = confirm("Are you sure you want to delete this bill?");
    if (confirmation) {
      this.collection.remove(this.model);
      this.model.destroy();
      this.remove();
      Backbone.history.navigate("", {trigger: true});
    }
  },

  sendMail: function(){
    var modal = new BillOrganizer.Views.MailPreview({
      model: this.model
    });
    $('body').prepend(modal.render().$el);
  },

  makeComment: function(event){
    event.preventDefault();
    var newComment = new BillOrganizer.Models.Comment({bill: this.model });
    var attr = $(event.currentTarget).serializeJSON();
    newComment.set(attr);
    newComment.set({user: window.CURRENT_USER_EMAIL });
    newComment.save({}, {
      wait: true,
      success: function(){
        this.model.comments().add(newComment);
        this.model.comments().sort();
      }.bind(this),
      error: function(response){
        $('.errors').empty();
        response.responseJSON.forEach(function(el){
          var $li = $('<li></li>');
          $li.text(el);
          $('.errors').append($li);
        });
      }
    });
  }

});

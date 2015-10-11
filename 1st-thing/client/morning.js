Template.morningPage.helpers({
  posterUrl: function() {
    return Session.get("posterUrl");
  },
  todos: function() {
    return todos.find();
  }
});

Template.morningPage.events({
  'click #remtodo': function() {
    todos.remove(this._id);
  }
});

Meteor.call("posterUrl", function(error, url) {
  console.log("posterUrl", url);
  Session.set("posterUrl", url);
});

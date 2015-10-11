Template.morningPage.helpers({
  todos: function() {
    return todos.find();
  }
});

Template.morningPage.events({
  'click #remtodo': function() {
    todos.remove(this._id);
  }
});

    Meteor.call("posterUrl", function(error, results) {
      console.log('posterUrl', results);
    });

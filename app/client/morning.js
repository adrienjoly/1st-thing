Template.morningPage.helpers({
  firstName: function() {
    return (settings.findOne({key: "firstName"}) || {}).value;
  },
  posterUrl: function() {
    return Session.get("posterUrl");
  },
  todos: function() {
    return todos.find().fetch().reverse();
  }
});

Template.morningPage.rendered = function(){
  console.log('morningPage running on cordova');
};

Template.morningPage.events({
  'click paper-checkbox': function() {
    todos.remove(this._id);
  }
});

Meteor.call("posterUrl", function(error, url) {
  console.log("posterUrl", url);
  Session.set("posterUrl", url);
});

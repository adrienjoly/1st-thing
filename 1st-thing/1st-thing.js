todos = new Mongo.Collection('todos');
if (Meteor.isClient) {  
  Session.setDefault('counter', 0);
  Template.planTomorrow.helpers({
    todos: function() {
      return todos.find();
    }
  });
  Template.planTomorrow.events({
    'click #addtodo': function() {
      var todo = document.getElementById("todo").value;
      todos.insert({todo: todo});
    },
    'click #remtodo': function() {
      todos.remove(this._id);
    }
  });
  Template.oneTimeSetup.helpers({
    morningTime: function() {
      return document.getElementById("dialog").hour();
    },
    nightTime: function() {
      return document.getElementById("dialog1").time();
    }
  });
  Template.oneTimeSetup.events({
    'click .time': function() {
      var dialog = document.getElementById("dialog");
      dialog.open();
    },
    'click .time1': function() {
      var dialog = document.getElementById("dialog1");
      dialog.open();
    },
    'click .name': function() {
      document.getElementById("nametext").setFocused(true);
    },
  });
  }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

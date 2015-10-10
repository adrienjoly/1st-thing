if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    
  });

  Template.body.events({
    'click .time': function() {
      var dialog = document.getElementById("dialog");
      dialog.open();
    }
  });

  }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

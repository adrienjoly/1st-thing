todos = new Mongo.Collection('todos');

if (Meteor.isClient) {  
  Session.setDefault('counter', 0);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

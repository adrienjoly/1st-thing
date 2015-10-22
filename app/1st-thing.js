todos = new Mongo.Collection('todos');
settings = new Mongo.Collection('settings');

if (Meteor.isCordova) {
  console.log('running on cordova');
}

if (Meteor.isClient) {  
  Session.setDefault('counter', 0);
}

if (Meteor.isServer) {
  if (!settings.findOne({ key: "morningTime" })) {
    settings.insert({ key: "morningTime", value: "08:00" });
  }
  if (!settings.findOne({ key: "nightTime" })) {
    settings.insert({ key: "nightTime", value: "20:00" });
  }
  Meteor.methods({
    "setFirstName": function(name) {
      settings.upsert({key: "firstName"}, {$set: {value: name}});
    },
    "setMorningTime": function(time) {
      settings.upsert({key: "morningTime"}, {$set: {value: time}});
    },
    "setNightTime": function(time) {
      settings.upsert({key: "nightTime"}, {$set: {value: time}});
    },
    "toggleNotif": function(checked) {
      settings.upsert({key: "notif"}, {$set: {value: checked}});
    }
  });
}

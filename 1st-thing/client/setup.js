Template.oneTimeSetup.helpers({
  morningTime: function() {
    return (settings.findOne({key: "morningTime"}) || {}).value;
    //return document.getElementById("dialog").hour();
  },
  nightTime: function() {
    return (settings.findOne({key: "nightTime"}) || {}).value;
    //return document.getElementById("dialog1").time();
  },
  "notif": function() {
    return (settings.findOne({key: "notif"}) || {}).value;
  },
});

Template.oneTimeSetup.events({
  /*
  'click .time': function() {
    var dialog = document.getElementById("dialog");
    dialog.open();
  },
  'click .time1': function() {
    var dialog = document.getElementById("dialog1");
    dialog.open();
  },
  */
  'input #morning-time-selector': function(evt) {
    console.log(evt.target.value);
    Meteor.call("setMorningTime", evt.target.value);
  },
  'input #night-time-selector': function(evt) {
    console.log(evt.target.value);
    Meteor.call("setNightTime", evt.target.value);
  },
  'change #notifications-switch': function(evt) {
    console.log("notifications", evt.target.checked);
    Meteor.call("toggleNotif", evt.target.checked);
  },
  'click .name': function() {
    document.getElementById("nametext").setFocused(true);
  },
});

Template.oneTimeSetup.helpers({
  morningTime: function() {
    return (settings.findOne({key: "morningTime"}) || {}).value;
    //return document.getElementById("dialog").hour();
  },
  nightTime: function() {
    return (settings.findOne({key: "nightTime"}) || {}).value;
    //return document.getElementById("dialog1").time();
  }
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
  'click .name': function() {
    document.getElementById("nametext").setFocused(true);
  },
});

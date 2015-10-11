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
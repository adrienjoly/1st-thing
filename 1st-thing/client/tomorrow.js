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
Template.planTomorrow.helpers({
  todos: function() {
    return todos.find();
  }
});

Template.planTomorrow.events({
  'click #addtodo': function() {
    var todo = document.getElementById("todo").value;
    todos.insert({todo: todo});
    document.getElementById("todo").updateValueAndPreserveCaret("");
  },
  'click paper-checkbox': function() {
    todos.remove(this._id);
  }
});

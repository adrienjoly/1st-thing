Template.planTomorrow.helpers({
  todos: function() {
    return todos.find();
  }
});

function addTodo() {
  var todo = document.getElementById("todo");
  todos.insert({todo: todo.value});
  todo.updateValueAndPreserveCaret("");
}

Template.planTomorrow.events({
  'click #addtodo': addTodo,
  'keyup #todo': function(evt) {
    if (evt.keyCode == 13) addTodo();
  },
  'click paper-checkbox': function() {
    todos.remove(this._id);
  }
});

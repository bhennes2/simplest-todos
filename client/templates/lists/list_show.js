Template.listShow.events({

  "submit .new-task": function (event) {
    event.preventDefault();
    var text = event.target.text.value,
        listId = event.target.listId.value;

    Tasks.insert({
      text: text,
      listId: listId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    event.target.text.value = "";
  }

});

Template.listShow.helpers({
  tasks: function () {
    if (Session.get("hideCompleted")) {
      return Tasks.find({checked: {$ne: true}, listId: this._id}, {sort: {createdAt: -1}});
    } else {
      return Tasks.find({listId: this._id}, {sort: {createdAt: -1}});
    }
  },
  hideCompleted: function () {
    return Session.get("hideCompleted");
  },
  incompleteCount: function () {
    return Tasks.find({checked: {$ne: true}, listId: this._id}).count();
  },
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
  }
});

Template.task.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    Tasks.remove(this._id);
  }
});

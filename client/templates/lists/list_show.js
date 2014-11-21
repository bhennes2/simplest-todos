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
  },
  "click .hide-completed": function (event) {
    event.preventDefault();
    var $el = $(event.target),
        checked = $el.data('checked');
    Session.set("hideCompleted", !checked);
    $el.data('checked', !checked);
  }
});

Template.listShow.helpers({
  tasks: function () {
    if (Session.get("hideCompleted")) {
      return Tasks.find({checked: {$ne: true}, listId: this._id}, {sort: { checked: 1, createdAt: -1 }});
    } else {
      return Tasks.find({listId: this._id}, {sort: { checked: 1, createdAt: -1  }});
    }
  },
  hideCompleted: function () {
    return Session.get("hideCompleted");
  },
  incompleteCount: function () {
    return Tasks.find({checked: {$ne: true}, listId: this._id}).count();
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

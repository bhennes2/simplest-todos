Template.listNew.events({

  "submit .new-list": function (event) {
    event.preventDefault();
    var text = event.target.text.value;

    Lists.insert({
      text: text,
      createdAt: new Date(),
      updatedAt: new Date()
    }, function(error, id){
      Router.go('/lists/:_id', {_id: id});
    });

    event.target.text.value = "";
  }

});



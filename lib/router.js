Router.configure({
  notFoundTemplate: 'notFound'
});

NewListsController = RouteController.extend({
  template: 'listNew'
});

Router.route('/', {
  name: 'home',
  controller: NewListsController
});

Router.route('/lists/:_id', function () {
  var list = Lists.findOne({_id: this.params._id});
  this.render('ShowList', {data: list});
});



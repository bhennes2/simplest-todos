Router.configure({
  notFoundTemplate: 'notFound'
});

Router.route('/', function(){
  this.render('listNew');
});

Router.route('/lists/:_id', {
  name: 'listPage',
  template: 'listShow',
  data: function() {
    var list = Lists.findOne({_id: this.params._id});
    return list;
  }
});

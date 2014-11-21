Router.configure({
  layoutTemplate: 'layout',
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

var flip = function (){
  setTimeout(function(){
    $('#main').addClass('hover');
  },0);
  this.next();
};

Router.onBeforeAction(flip, {only: 'listPage'});

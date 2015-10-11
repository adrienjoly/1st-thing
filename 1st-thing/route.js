Router.route('/', function () {
  this.render('oneTimeSetup');
});
 
Router.route('/tomorrow', function () {
  this.render('planTomorrow');
});
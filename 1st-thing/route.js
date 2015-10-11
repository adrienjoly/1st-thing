Router.route('/', function () {
  this.render('oneTimeSetup');
});

Router.route('/tomorrow', function () {
  this.render('planTomorrow');
});

Router.route('/morning', function () {
  this.render('morningPage');
});

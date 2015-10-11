Router.route('/', 'iphone');

Router.route('/setup', function () {
  this.render('oneTimeSetup');
});

Router.route('/tomorrow', function () {
  this.render('planTomorrow');
});

Router.route('/morning', function () {
  this.render('morningPage');
});

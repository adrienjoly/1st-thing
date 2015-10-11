var _ = lodash;

var posters = (function getPosterUrls() {
  var result = HTTP.get('http://pinterest.com/explore/motivational-posters/');
  var $ = cheerio.load(result.content);
  return $('.pinImg').map(function(i){
    return $(this).attr('src')
  });
})();

Meteor.methods({
  posterUrl: function () {
    //this.unblock();
    return _.sample(posters);
  }
});

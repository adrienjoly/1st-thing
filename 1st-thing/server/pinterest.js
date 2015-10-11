var _ = lodash;

function getPosterUrls() {
  var result = HTTP.get('http://pinterest.com/explore/motivational-posters/');
  var $ = cheerio.load(result.content);
  return $('.pinImg').map(function(i){
    console.log(i, $(this).attr('src'));
    return $(this).attr('src')
  });
}

var posters = getPosterUrls();

Meteor.methods({
  posterUrl: function () {
    this.unblock();
    return _.sample(posters);
  }
});

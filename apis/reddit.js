var _ = require('lodash');
var reddit = require('redwrap');

function isAnImage(url){
  return /imgur/.test(url);
}

reddit.r('getmotivated', function(err, data, res){

  var images = _(data.data.children)
    .pluck('data.url')
    .filter(isAnImage)
    .value();

  console.log(images);

});

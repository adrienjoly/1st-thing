// PIN APP ID  4795130381374333090
// PIN APP SEC 57ce043bca19aee467e966c5f685de841fda387e86c4e2dea08d531b84ed9d90

/*
var _ = require('lodash');
var PDK = require('node-pinterest');
var pinterest = PDK.init('57ce043bca19aee467e966c5f685de841fda387e86c4e2dea08d531b84ed9d90');
pinterest.api('rolytyler').then(console.log);

//pinterest.api('explore/motivational-posters/').then(console.log);
*/

var request = require('request');
var cheerio = require('cheerio');

request('http://pinterest.com/explore/motivational-posters/', function(error, response, html){

  if (error) return error.printStack();

  var $ = cheerio.load(html);
  $('.pinImg').each(function(i){
    console.log(i, $(this).attr('src'));
  });

});

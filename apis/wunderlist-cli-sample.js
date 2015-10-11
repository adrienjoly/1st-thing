var _ = require('lodash');
var wunderlist = require('./wunderlist-client');

var APP_CLIENT_ID_PROD = '74d6e387fbcc9755f9e5';
var APP_CLIENT_ID_LOCAL = '904c48fa9152044d6476';
var APP_CLIENT_SEC_PROD = '1ed8769dc87ce3c374f5d78911ac680523d53c627cd29979cf936d42539d';
var APP_CLIENT_SEC_LOCAL = '3f23bba6264f68fe384c426211a83f2f3ccca0dfdfe3a1cadd7f0c8740f3';

var clientId = APP_CLIENT_ID_LOCAL; // APP_CLIENT_ID_PROD
var clientSec = APP_CLIENT_SEC_LOCAL; // APP_CLIENT_SEC_PROD

function onError(err) {
  console.error('Wunderlist API error:', err);
}

// open a web page asking for user's permissions for connecting to their wunderlist account
wunderlist.askUserToken(clientId, clientSec, function(accessToken){
  // once accepted by user, connecting to wunderlist API
  wunderlist.getWunderlistFromToken(clientId, accessToken, function onAuth(wunderlistAPI){
    // count user's lists
    wunderlistAPI.http.lists.all().fail(onError).done(function (lists) {
      console.log('user has', lists.length, 'lists');
      process.exit();
    });
  });
});

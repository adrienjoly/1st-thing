var Evernote = require('evernote').Evernote;
require('dotenv').load();

// Remember to set your APP_URL variable inside .env
var callbackUrl;
if(process.env.APP_URL.indexOf("azk.io") != -1) {
  callbackUrl = process.env.APP_URL + ':' + '/oauth_callback';
} else {
  callbackUrl = process.env.APP_URL + ':' + process.env.PORT + '/oauth_callback';
}

// home page
exports.index = function(req, res) {
  console.log('[index] oauthAccessToken:', req.session.oauthAccessToken);
  if (req.session.oauthAccessToken) {
    var token = req.session.oauthAccessToken;
    console.log('[index] instanciating client...');
    var client = new Evernote.Client({
      token: token,
      sandbox: process.env.SANDBOX || false
    });
    console.log('[index] listing notebooks...');
    var noteStore = client.getNoteStore();
    noteStore.listNotebooks(function(err, notebooks) {
      console.log('[index] =>', err || notebooks);
      req.session.notebooks = notebooks;
      res.render('index');
    });
  } else {
    res.render('index');
  }
};

// OAuth
exports.oauth = function(req, res) {
  console.log('[oauth] instanciating client with:', process.env.API_CONSUMER_KEY, process.env.API_CONSUMER_SECRET);
  var client = new Evernote.Client({
    consumerKey: process.env.API_CONSUMER_KEY,
    consumerSecret: process.env.API_CONSUMER_SECRET,
    sandbox: process.env.SANDBOX || false
  });
  console.log('[oauth] get request token with callbackUrl:', callbackUrl);
  client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret, results) {
    console.log('[oauth] =>', error || results);
    if (error) {
      req.session.error = JSON.stringify(error);
      res.redirect('/');
    }
    else {
      // store the tokens in the session
      req.session.oauthToken = oauthToken;
      req.session.oauthTokenSecret = oauthTokenSecret;
      // redirect the user to authorize the token
      res.redirect(client.getAuthorizeUrl(oauthToken));
    }
  });

};

// OAuth callback
exports.oauth_callback = function(req, res) {
  console.log('[oauth_callback] instanciating client with:', process.env.API_CONSUMER_KEY, process.env.API_CONSUMER_SECRET);
  var client = new Evernote.Client({
    consumerKey: process.env.API_CONSUMER_KEY,
    consumerSecret: process.env.API_CONSUMER_SECRET,
    sandbox: process.env.SANDBOX || false
  });
  console.log('[oauth_callback] get access token with:', req.session.oauthToken, req.session.oauthTokenSecret);
  client.getAccessToken(
    req.session.oauthToken,
    req.session.oauthTokenSecret,
    req.param('oauth_verifier'),
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      console.log('[oauth_callback] =>', error || results);
      if (error) {
        console.log('error');
        console.log(error);
        res.redirect('/');
      } else {
        // store the access token in the session
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTtokenSecret = oauthAccessTokenSecret;
        req.session.edamShard = results.edam_shard;
        req.session.edamUserId = results.edam_userId;
        req.session.edamExpires = results.edam_expires;
        req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
        req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
        res.redirect('/');
      }
    });
};

// Clear session
exports.clear = function(req, res) {
  console.log('[clear] destroying session...');
  req.session.destroy();
  res.redirect('/');
};

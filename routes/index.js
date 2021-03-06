var Evernote = require('evernote').Evernote;
require('dotenv').load();

// Remember to set your APP_URL variable inside .env
var callbackUrl = process.env.APP_URL;
if (callbackUrl.indexOf("azk.io") == -1 &&
    callbackUrl.indexOf("herokuapp.com") == -1) {
  callbackUrl = callbackUrl + ':' + process.env.PORT;
}
callbackUrl += '/oauth_callback';

function fetchNotes(noteStore, notebookGuid, callback){
  var filter = new Evernote.NoteFilter();
  filter.notebookGuid = notebookGuid;
  var resultSpec = new Evernote.NotesMetadataResultSpec();
  resultSpec.includeTitle = true;
  noteStore.findNotesMetadata(filter, 0, 100, resultSpec, function(err, notesMeta) {
    //console.log('findNotesMetadata =>', notesMeta);
    callback(err, (notesMeta || {}).notes);
  });
}

function getNotesAndFirstImageURL(client, notebookGuid, callback) {
  var noteStore = client.getNoteStore();
  var userStore = client.getUserStore();
  fetchNotes(noteStore, notebookGuid, function(err, notes) {
    if (err) return callback(err);
    var firstNoteGuid = notes[0].guid;
    //console.log('[index] => notes:', err || notes);
    userStore.getUser(function(err, user) {
      if (err) return callback(err);
      userStore.getPublicUserInfo(user.username, function (err, userInfo) {
        if (err) return callback(err);
        var userUrl = userInfo.webApiUrlPrefix;
        noteStore.getNote(firstNoteGuid, false, false, false, false, function(err, note) {
          if (err) return callback(err);
          var firstResourceGuid = note.resources[0].guid;
          callback(null, {
            notes: notes,
            firstImageURL: userUrl + 'res/' + firstResourceGuid,
          });
        });
      });
    });
  });
}

// home page
exports.index = function(req, res) {
  console.log('[index] oauthAccessToken:', req.session.oauthAccessToken);
  if (req.session.oauthAccessToken) {
    console.log('[index] instanciating client...');
    var client = new Evernote.Client({
      token: req.session.oauthAccessToken,
      sandbox: process.env.SANDBOX || false
    });
    console.log('[index] listing notebooks...');
    var noteStore = client.getNoteStore();
    noteStore.listNotebooks(function(err, notebooks) {
      console.log('[index] =>', err || notebooks);
      req.session.notebooks = notebooks;
      getNotesAndFirstImageURL(client, notebooks[0].guid, function(err, result){
        console.log('getFirstImageURL =>', err || result);
        res.render('index', result);
      });
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

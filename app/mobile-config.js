// from http://docs.meteor.com/#/full/mobileconfigjs

// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.adrienjoly.1st-thing',
  name: '1st Thing In The Morning',
  description: 'Get motivated to do your taks, every morning.',
  author: [ 'Adrien Joly', 'Osman Abdelnasir' ],
  email: 'contact@adrienjoly.com',
  website: 'http://devpost.com/software/1st-thing-in-the-morning'
});

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'icons/ios/Icon-60.png',
  'iphone_2x': 'icons/ios/AppIcon.appiconset/Icon-60@2x.png',
  // ... more screen sizes and platforms ...
});
/*
App.launchScreens({
  'iphone': 'splash/Default~iphone.png',
  'iphone_2x': 'splash/Default@2x~iphone.png',
  // ... more screen sizes and platforms ...
});
*/
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
/*
// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});
*/

var FB = require('fb');
var config = require('./config.json');

var accessToken;
FB.options({version: 'v2.8'});
// var app = FB.extend({appId: config.appId, appSecret: config.appSecret});
//
// app.setAccessToken();
//
// app.api('me', function (res) {
//   if(!res || res.error) {
//    console.log(!res ? 'error occurred' : res.error);
//    return;
//   }
//   console.log(res.id);
//   console.log(res.name);
// });

// To generate an App access token
FB.api(`oauth/access_token?client_id=${config.appId}&client_secret=${config.appSecret}&grant_type=client_credentials`, function(res) {

  if (!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }

  accessToken = res.access_token;
  console.log('access token: ', accessToken);

})
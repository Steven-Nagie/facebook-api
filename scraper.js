var FB = require('fb');
var config = require('./config.json');

var accessToken;
FB.options({version: 'v2.8'});
var app = FB.extend({appId: config.appId, appSecret: config.appSecret});

// Default response for appId endpoint contains category, link, name, and id
getApp = () => {
  app.api(`${config.appId}`, function (res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    console.log(res);

  });
}

// The 'fields' query paramters determine what the response contains.
getAppEmail = () => {
  app.api(`${config.appId}?fields=contact_email`, function (res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    console.log(res);

  });
}

getPagePhotoLikes = (photoId) => {
  app.api(`${photoId}/likes`, function(res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    console.log(res);
    var totalLikes = res.data.length;
    console.log("total likes: ", totalLikes);
  });
}

// Grabbing a page's photos, using an album id that we get from getPage();
getPagePhotos = (albumId) => {
  app.api(`${albumId}/photos`, function(res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    // console.log(res);
    getPagePhotoLikes(res.data[0].id)
  });
}

// Grabbing a page based on id, then grabbing their albums
getPage = () => {
  app.api(`19292868552/albums`, function(res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    // console.log(res);
    getPagePhotos(res.data[1].id)
  });
}

// To generate an App access token
FB.api(`oauth/access_token?client_id=${config.appId}&client_secret=${config.appSecret}&grant_type=client_credentials`, function(res) {

  if (!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }

  accessToken = res.access_token;
  console.log("access token: ", accessToken);
  app.setAccessToken(accessToken);
  // getApp();
  // getAppEmail();
  getPage();
})

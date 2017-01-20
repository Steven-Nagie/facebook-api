var FB = require('fb');
var config = require('./config.json');

var accessToken;
FB.options({version: 'v2.8'});
var app = FB.extend({appId: config.appId, appSecret: config.appSecret});

var site = "https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater"

var user;
var startSlice = 0;
var endSlice = 0;
var flag = false;
for (var i = 0; i < site.length; i++) {
  if (site.charAt(i) === 'c' && site.charAt(i+1) === 'o' && site.charAt(i+2) === 'm') {
    startSlice = i + 4;
    console.log(startSlice)
  }

  if (site.charAt(i) === '/' && startSlice !== 0 && startSlice < i && !flag) {
    console.log("Making endslice", i);
    endSlice = i;
    flag = true;
  }
}
user = site.slice(startSlice, endSlice);
console.log(user);


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

// The id is in the URL, but formatted differently there than they want it here.
getPost = () => {
  app.api(`839057202881028_1144637245656354`, function(res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    console.log(res);
    // var totalLikes = res.data.length;
    // console.log("total likes: ", totalLikes);
  });
}

// Use id to get more info on user
// Turns out we get the same information whether we use an id or username, so no real need to keep this.
/*
getPublicProfileID = (id) => {
  app.api(`${id}`, function(res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    console.log(" within id ", res);
  });
}
*/

// Try to get a person's public page
// Hitting /likes will show us what they like, not how many likes they have.
// ?fields=fan_count gets us how many likes they have.
getPublicProfile = () => {
  app.api(`brandonmikesell23/feed`, function(res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    console.log(res);
    // var totalLikes = res.data.length;
    // console.log("total likes: ", totalLikes);
  });
}

// Getting likes for a specific photo from the page. Have to access the page
getPagePhotoLikes = (photoId) => {
  app.api(`${photoId}/likes?limit=3000`, function(res) {
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
// FB.api(`oauth/access_token?client_id=${config.appId}&client_secret=${config.appSecret}&grant_type=client_credentials`, function(res) {
//
//   if (!res || res.error) {
//     console.log(!res ? 'error occurred' : res.error);
//     return;
//   }
//
//   accessToken = res.access_token;
//   console.log("access token: ", accessToken);
//   app.setAccessToken(accessToken);
//   // getPage();
//   // getPublicProfile();
//   getPost();
// })

// const passport = require('passport')
// import SpotifyWebApi from "spotify-web-api-js";
// const spotify = new SpotifyWebApi();
// const User = require('../models/user')

// export const authEndpoint = "https://accounts.spotify.com/authorize";

// //set previously on Spotify
// const redirectUri = "http://localhost:3000/";

// //login id
// const clientId = "901e38936e814b059dba2e2c008dd65a"

// const scopes = [
//     "user-read-currently-playing",
//     "user-read-recently-played",
//     "user-read-playback-state",
//     "user-top-read",
//     "user-modify-playback-state",
//     "streaming", 
//     "user-read-email", 
//     "user-read-private"
// ]; 

// export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

// app.get('/login', function(req, res) {

//     res.redirect(loginUrl);
//     });


//     /* Some express.js setup here */
// /* Some spotify-web-api-node setup here */

// /* Handle authorization callback from Spotify */
// app.get('/callback', function(req, res) {

//     /* Read query parameters */
//     var code  = req.query.code; // Read the authorization code from the query parameters
//     var state = req.query.state; // (Optional) Read the state from the query parameter
  
//     /* Get the access token! */
//     spotifyApi.authorizationCodeGrant(code)
//       .then(function(data) {
//         console.log('The token expires in ' + data['expires_in']);
//         console.log('The access token is ' + data['access_token']);
//         console.log('The refresh token is ' + data['refresh_token']);
  
//         /* Ok. We've got the access token!
//            Save the access token for this user somewhere so that you can use it again.
//            Cookie? Local storage?
//         */
  
//         /* Redirecting back to the main page! :-) */
//         res.redirect('/');
  
//       }, function(err) {
//         res.status(err.code);
//         res.send(err.message);
//       }
//     });
//   });
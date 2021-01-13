module.exports = (app, passport) => {
require('dotenv').config();
var request = require('request');

var headers = {
    'Authorization': 'Bearer BQBEr3K6UprdWh_DgEvrqkmGiAUup8A2LBgnpheScKFnO3AwDUo9H_reb9Y5H7k_LjbrjEHJasx9RKynody3WJok6vvWdig_ocirgDHPe11lXCQFAiCujE5LxfEWsAhUcbzmYjdd4iQdUlIisigfWgnBs4xMNw1EnaHPcuVcCo3jU0dsRZZVFpMVeStrYfc'
};

var options = {
    url: 'https://api.spotify.com/v1/me',
    headers: headers
};

function callback(err, res, body) {
    if (!err && res.statusCode == 200) {
        console.log(body);
    }
}

    
var SpotifyWebApi = require('spotify-web-api-node');

//lets spotify take care of API stuff
const authEndpoint = "https://accounts.spotify.com/authorize";

//set previously on Spotify
//urlencoded
const redirectUri = "http%3A%2F%2Flocalhost%3A3000%2Flogged";

//login id
const clientId = "3df631b3b2aa48ccb68f10acfdc8a359"


var spotifyApi = new SpotifyWebApi({
    clientID: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: redirectUri,
  });

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "playlist-read-private",
    "user-top-read",
    "user-modify-playback-state",
    "user-read-private",
    "user-read-email",
]; 

const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

app.get('/login', (req, res) => {
    res.redirect(loginUrl);
});


app.get('/auth/spotify/callback', async (req,res) => {
    const { access_token } = req.query;
    console.log('acces token:', access_token)
    try {
      var data = await spotifyApi.authorizationCodeGrant(access_token)
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
  
      res.redirect('/dashboard');
    } catch(err) {
      res.redirect('/#/error/invalid token');
    }
  });

app.get('/logged', async (req,res) =>{

      res.json({
          is:"LOGGED IN",
      })
});

app.get('/aboutme', (req,res) => {
  request(options, callback);
    // spotifyApi.getMe()
    //     .then(user =>{
    //         console.log(user)
    //     })
});

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect("/")
  });

};
/* GET home page. */
// auth.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
//   });
  
// auth.get('/login', (req,res) => {
//     var html = spotifyApi.createAuthorizeURL(scopes)
//     console.log(html)
//     res.redirect(html+"&show_dialog=true")  
//   })
  
// auth.get('/callback', async (req,res) => {
//     const { code } = req.query;
//     console.log(code)
//     try {
//       var data = await spotifyApi.authorizationCodeGrant(code)
//       const { access_token, refresh_token } = data.body;
//       spotifyApi.setAccessToken(access_token);
//       spotifyApi.setRefreshToken(refresh_token);
  
//       res.redirect('http://localhost:3000/home');
//     } catch(err) {
//       res.redirect('/#/error/invalid token');
//     }
//   });
  

//   auth.get('/playlists', async (req,res) => {
//     try {
//       var result = await spotifyApi.getUserPlaylists();
//       console.log(result.body);
//       res.status(200).send(result.body);
//     } catch (err) {
//       res.status(400).send(err)
//     }
  
//   });

//   auth.get('/aboutme', async (req,res) => {
//     try {
//       var result = await spotifyApi.getMe();
//       console.log(result.body);
//       res.status(200).send(result.body);
//     } catch (err) {
//       res.status(400).send(err)
//     }
  
//   });
require('dotenv').config();
module.exports = (app, passport) => {
    
var SpotifyWebApi = require('spotify-web-api-node');

//lets spotify take care of API stuff
const authEndpoint = "https://accounts.spotify.com/authorize";

//set previously on Spotify
const redirectUri = "http://localhost:3000/logged";

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
    "user-top-read",
    "user-modify-playback-state",
    "user-read-private",
    "user-read-email"
]; 


const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

app.get('/login', (req, res) => {
    res.redirect(loginUrl);
});


app.get('/auth/spotify/callback', async (req,res) => {
            const { code } = req.query;
            console.log(code)
            try {
              var data = await spotifyApi.authorizationCodeGrant(code)
              const { access_token, refresh_token } = data.body;
              spotifyApi.setAccessToken(access_token);
              spotifyApi.setRefreshToken(refresh_token);
          
              res.redirect('/dashboard');
            } catch(err) {
              res.redirect('/#/error/invalid token');
            }
          });
          

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect("/")
  });


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
};
 


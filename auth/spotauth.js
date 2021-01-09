const express = require('express');
const auth = express();

//lets spotify take care of API stuff
const authEndpoint = "https://accounts.spotify.com/authorize";

//set previously on Spotify
const redirectUri = "http://localhost:3000/logged";

//login id
const clientId = "3df631b3b2aa48ccb68f10acfdc8a359"


const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
]; 

const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

auth.get('/', (req, res) => {
    res.redirect(loginUrl);
});

module.exports = auth;
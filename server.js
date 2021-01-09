require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fetch = require('node-fetch');
const cors = require('cors')
const passport = require('passport');

const db = require('./models');

const ensureAuthenticated = require('./middleware/ensureAuthenticated');
const spotifyStrategy = require('./config/spotifyStrategy');
const heartbeat = require("./router/heartBeat");
const login = require('./auth/spotauth')
const dashBoard = require('./api/dashboard')

const gitHubStrategy = require('./config/gitHubStrategy');
const gitAuth = require('./auth/gitAuth')

const app = express();

// // attach passport to express and sessions
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'super-secret',
    cookie: { maxAge: 60000 }
}))

app.use(passport.initialize());
app.use(passport.session());

// passport.use(spotifyStrategy);
passport.use(gitHubStrategy);

app.use('/', express.static(__dirname + '/public'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/css', express.static(__dirname + '/css'))

app.get('/', (req,res) => {
    res.json({
        is:"MAIN PAGE"
    })
});

app.get('/logged', (req,res) => {
    res.json({
        is:"LOGGED IN"
    })
});

heartbeat(app);
// login(app,passport);
gitAuth(app,passport);
dashBoard(app, ensureAuthenticated);


app.listen(3000, () => {
  console.log(`The server is listening...`);
});

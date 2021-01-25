require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fetch = require('node-fetch');
const cors = require('cors');
const passport = require('passport');

const db = require('./models');
var Sequelize = require('sequelize'), sequelize = null
const http = require('http')

const ensureAuthenticated = require('./middleware/ensureAuthenticated');
const spotifyStrategy = require('./config/spotifyStrategy');
const heartbeat = require('./router/heartBeat');
const login = require('./auth/spotauth');
const dashBoard = require('./api/dashboard');
const spotifyToken = require('./api/spotifyToken');
const leaderboard = require('./router/leaderboard');

const gitHubStrategy = require('./config/gitHubStrategy');
const gitAuth = require('./auth/gitAuth');
// checks if env is Heroku, if so, sets sequelize to utilize the database hosted on heroku
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres'
  })
}
const app = express();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
// `const { Pool } = require('pg'); 
// const pool = new Pool({ 
//   connectionString: process.env.DATABASE_URL, 
//   ssl: { 
//     rejectUnauthorized: false 
//   } 
// }); `
// attach passport to express and sessions
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'super secret',
    keys: ['key1', 'key2'],
    cookie: { maxAge: 60000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(spotifyStrategy);
// passport.use(gitHubStrategy);

app.use('/', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', (req, res) => {
  res.json({
    is: 'MAIN PAGE',
  });
});

heartbeat(app);
login(app, passport);
// gitAuth(app,passport);
dashBoard(app, ensureAuthenticated);
spotifyToken(app, fetch);
leaderboard(app);

app.listen(process.env.PORT, () => {
  console.log(`The server is running at port ${process.env.PORT}`);
});

// at the bottom of your script, this sets your server to listen for requests, after sequelize has been synced.
// so if you already have your server listening for requests, maybe delete that code. I think, IDK i just copied this
// off of documentation
// db.  is assuming you already set sequelize on db
db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
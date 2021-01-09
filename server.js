require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const fetch = require('node-fetch');
const pgp = require('pg-promise')();
const Sequelize = require('sequelize');
const ejs = require('ejs');
var cors = require('cors')
const app = express();
const db = require('./models');
const heartbeat = require("./router/heartBeat");
const login = require('./auth/spotauth')
const logged = require('./router/login')

require('./config/passport');
// // attach passport to express and sessions
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.use(passport.initialize());
// app.use(passport.session());

app.get('/', (req,res) => {
    res.json({
        is:"MAIN PAGE"
    })
});

app.use("/heartbeat", heartbeat);
app.use("/login", login);
app.use("/", logged);

app.listen(3000, () => {
  console.log(`The server is listening...`);
});

// const authRouter = require('./router/auth')
// const mainRouter = require('./router/main')
// const landingPage = require('./router/landingPage')
// const { Users, Jobs, userJobs } = require('./models');
// var cors = require('cors')


// // require('./auth/passport-setup');


// // const sync = () => {
// //   return db.sequelize.sync({force: true});
// // };

// // sync()
// // .then( () => console.log('synched!'))
// // .catch( e => console.log(e));


// // const seed = () => {
// //   return db.sequelize.seed({force: true});
// // };

// // seed()
// // .then( () => console.log('seeded!'))
// // .catch( e => console.log(e));



// userJobs.belongsTo(Jobs);
// userJobs.belongsTo(Users);


// const {
//   DB_LOCAL,
//   DB_PASSWORD,
//   DB_NAME,
//   DB_USER,
//   PORT,
// } = require("./envConfig");



// const test = require("./router/apiTest");
// const { router: jobsRouter } = require("./router/jobs");
// const { router: userJobsRouter } = require("./router/userJobs")
// const { BelongsTo } = require('sequelize');
// const { response } = require('express');

// app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // setup sessions with cookies
// app.use(
//   session({
//     secret: "super secret",
//     cookie: { maxAge: 60000 },
//   })
// );


// // Attach routes

// app.use('/auth', authRouter);
// app.use('/', mainRouter);
// app.use('/landingPage', landingPage);

// app.use('/', express.static(__dirname + '/public'));
// app.use('/js', express.static(__dirname + '/js'));

// // Below is setting the view to look for an ejs file
// app.set("view engine", "ejs");



// app.use("/test", test);
// app.use("/jobs", jobsRouter);
// app.use("/userJobs", userJobsRouter);

// const MYPORT = 3000

// app.listen(process.env.PORT || MYPORT, () => {
//   console.log(`The server is listening...`);
// });

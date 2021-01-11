require('dotenv').config();
const GitHubStrategy = require('passport-github').Strategy
const passport = require('passport')
const User = require('../models').User;

const gitHubStrategy = new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.GH_CALLBACK,
    },
  async function(accessToken, refreshToken, profile, cb) {

    let user = await User.findOne({where: { userId: profile.id }})

    if(!user) {
      user = await User.build({
        firstName: null,
        lastName: null,
        userId: profile.id,
        totalScore: null,
        userName: profile.username,
        country: null,
        spotifyRefreshToken: null,
        spotifyAccessToken:  null, 
        createAt: new Date(),
        updatedAt: new Date()
      })
      await user.save();
    }
    cb(null, user)
  });

passport.serializeUser(function(user, done) {
      /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
      /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
  // const user = await User.findByPk(id)
  done(null, user);
});

module.exports = gitHubStrategy;
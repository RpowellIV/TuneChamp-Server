require('dotenv').config();
const GitHubStrategy = require('passport-github').Strategy
const passport = require('passport')
const User = require('../models').User;

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: '3278d00a3850356ad8d6',
    clientSecret: '3ba4610abefb954fee322700c67990da336303d6',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, cb) {
    // check to see if user already exists in the database
    let user = await User.findOne({where: { userId: parseInt(profile.id) }})

    if(!user) {
      user = await User.build({
        userId: parseInt(profile.id),
        userName: profile.username,
        createAt: new Date(),
        updatedAt: new Date()
      })
      await user.save();
    }
    cb(null, user)
  }
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const user = await User.findByPk(id)
  done(null, user);
});

module.exports = gitHubStrategy;
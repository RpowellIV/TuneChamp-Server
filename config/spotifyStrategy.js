require('dotenv').config();
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport')
const User = require('../models').Users;

const spotifyStrategy = new SpotifyStrategy (
    {
        clientID: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET,
        callbackURL: process.env.SPOTIFY_CALLBACK,
    },
      async function (accessToken, refreshToken, profile, done) {

        let user = await User.findOne({ where: { userId: profile.id } })

        if (!user) {
            user = await User.build({
                firstName: profile.email,
                lastName: null,
                userId: profile.id,
                totalScore: null,
                userName:  profile.username,
                country: profile.country,
                spotifyRefreshToken: refreshToken,
                spotifyAccessToken: accessToken,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            await user.save()
        }
        done(null, user)
    });

passport.serializeUser(function (user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
//    const user = await User.findByPk(id)
   done(null, user);
});

module.exports = spotifyStrategy;
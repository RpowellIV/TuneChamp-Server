const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport')
const User = require('../models').Users;

console.log(User)

const spotifyStrategy = new SpotifyStrategy (
      {
        clientID: "3df631b3b2aa48ccb68f10acfdc8a359",
        clientSecret: '7525ccd7f9fc4ff5884e333def1c8575',
        callbackURL: 'http://localhost:3000/auth/spotify/callback'
      },
      async function (accessToken, refreshToken, profile, done) {

        let user = await User.findOne({ where: { userId: profile.id } })

        if (!user) {
            // if User doesn't exist then make a new database entry
            user = await User.build({
                firstName: profile.emaill,
                lastName: null,
                userId: profile.id,
                totalScore: null,
                userName:  profile.username,
                country: profile.country,
                spotifyRefreshToken: refreshToken,
                spotifyAccessToken: accessToken,
                createdAt: new Date(),
                updatedAt: new Date(),

                })
                await user.save()
            }
    
            done(null, user)
            console.log(profile)
        }
    );

passport.serializeUser(function (user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
   
   done(null, id)

    // User.findByPk(id, function (err, user) {
    //     done(null, id)
    // })


});

module.exports = spotifyStrategy;
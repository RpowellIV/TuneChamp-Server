module.exports = (app, fetch) => {
  const models = require('../models');

    app.post('/user', async (req, res) => {
      const { user, token } = req.body;
      console.log(user,token); 
      console.log(req.body); 


      let newUser = await models.User.findOne({ where: { userId: user.id } })

        if (!newUser) {
            newUser = await models.User.build({
                firstName: user.email,
                lastName: null,
                userId: user.id,
                totalScore: null,
                userName:  user.username,
                country: user.country,
                spotifyRefreshToken: null,
                spotifyAccessToken: token,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            await newUser.save()
            return newUser;
        } else {
          return 'USER ALREADY EXIST'
        }
      
      });
    
      
};
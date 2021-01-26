// const { all } = require('sequelize/types/lib/operators');

module.exports = (app) => {
  const db = require('../models');

  // Display all users on the leaderboard
  app.get('/leaderboard', async (req, res) => {
    console.log(`HERE`);
    let allUsers = await db.User.findAll({
      attributes: ['userId', 'totalScore'],
    });

    //sorts users by their score from greatest to least
    allUsers.sort((a, b) => (a.totalScore < b.totalScore ? 1 : -1));

    res.json({
      is: 'working',
      allUsers,
    });
  });
};

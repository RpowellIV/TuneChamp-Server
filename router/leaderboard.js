module.exports = (app) => {
  const db = require('../models');

  // Display all users on the leaderboard
  app.get('/leaderboard', async (req, res) => {
    let allUsers = await db.User.findAll({
      attributes: ['userId', 'totalScore'],
    });
    res.json({
      is: 'working',
      allUsers,
    });
  });
};

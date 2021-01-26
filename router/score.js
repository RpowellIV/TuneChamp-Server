module.exports = (app) => {
  const db = require('../models');

  app.put('/userScore', async (req, res) => {
    const { id } = req.body.user;

    try {
      const updatedUser = await db.User.update(
        {
          totalScore: req.body.totalScore,
        },
        {
          where: {
            userId: id,
          },
        }
      );
      res.send(updatedUser);
    } catch (err) {
      return res.status(500).json();
    }
  });
};

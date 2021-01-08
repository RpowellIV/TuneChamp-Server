'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      totalScore: {
        type: Sequelize.INTEGER
      },
      userName:  {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      spotifyRefreshToken: {
        type: Sequelize.STRING
      },
      spotifyAccessToken:  {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
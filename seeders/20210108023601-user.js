'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{ 
      firstName: "test@rmail.com",
      lastName: null,
      userId: "12345",
      totalScore: 0,
      userName:  "testUser",
      country: "USA",
      spotifyRefreshToken: "xyz123",
      spotifyAccessToken:  "123xyz", 
      createdAt: new Date(), 
      updatedAt: new Date() 
        }], {}); 
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {}) 
  } 
  }
};

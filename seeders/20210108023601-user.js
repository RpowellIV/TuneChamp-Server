'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [];
    let amount = 50;

    while (amount--) {
      data.push({
        firstName: faker.internet.email(),
        lastName: null,
        userId: faker.finance.routingNumber(),
        totalScore: faker.random.number(),
        userName:  faker.internet.userName(),
        country: faker.address.country(),
        spotifyRefreshToken: faker.internet.password(),
        spotifyAccessToken:  faker.internet.password(),  
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('Users', [{ 
      firstName: "test@email.com",
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
};

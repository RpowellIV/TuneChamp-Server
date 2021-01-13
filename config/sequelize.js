require('dotenv').config()
const { Sequelize } = require('sequelize');

// 1. Setting up my Sequelize here
const sequelize = new Sequelize(process.env.DB_LIB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_LOCAL,
    dialect: 'postgres'
});

// // Check that the database can connect 
// sequelize.authenticate().then(() => {
//     console.log("Database connected !")
// }).catch((err) => {
//     console.log(err)
// })

// creates the table if it doesn't exist
sequelize.sync()

module.exports = sequelize
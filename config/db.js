const Sequelize = require('sequelize');
require('dotenv').config();


// Connection with database. For connection, you will need .env file.
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  // gimme postgres, please!
  dialect: 'postgres',
  host: 'postgres',
  logging:false,
})
const dbconnection = async() => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
dbconnection()


// Connection database with models

const db = {};
db.connection = connection;
db.User = require(`../models/User.js`)(connection);

 
// Relations User-News


module.exports = dbconnection;

module.exports = db;

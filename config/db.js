const Sequelize = require('sequelize');
require('dotenv').config();


// Connection with database. For connection, you will need .env file.
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
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
db.Question = require("../models/Question.js")(connection)
db.Comment = require("../models/Comment.js")(connection)
db.Like = require("../models/Like.js")(connection)

// Relations 
db.User.hasMany(db.Question);
db.Question.belongsTo(db.User);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

db.Question.hasMany(db.Comment);
db.Comment.belongsTo(db.Question);

db.User.hasMany(db.Like);
db.Like.belongsTo(db.User);

db.Question.hasMany(db.Like);
db.Like.belongsTo(db.Question);

db.Comment.hasMany(db.Like);
db.Like.belongsTo(db.Comment);


module.exports = db;
const Sequelize = require('sequelize');

// Question model

module.exports = (sequelize) =>
  sequelize.define(
    "question",
    {
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT, 
      },
    },
   
  );
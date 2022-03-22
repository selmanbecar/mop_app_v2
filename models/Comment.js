const Sequelize = require('sequelize');

// Comment model

module.exports = (sequelize) =>
  sequelize.define(
    "comment",
    {
      comment: {
        allowNull: false,
        type: Sequelize.TEXT, 
      },
    },
   
  );
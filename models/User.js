const Sequelize = require('sequelize');

// Comment model

module.exports = (sequelize) =>
  sequelize.define(
    "user",
    {
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
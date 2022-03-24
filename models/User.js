const Sequelize = require('sequelize');

// User model

module.exports = (sequelize) =>
  sequelize.define(
    "user",
    {
      first_name: {
      allowNull: true,
      type: Sequelize.STRING,
     
    },
    last_name: {
      allowNull: true,
      type: Sequelize.STRING,
     
    },
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
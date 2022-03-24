const Sequelize = require('sequelize');

// Like/Dislike model

module.exports = (sequelize) =>
  sequelize.define(
    "like",
    {
      isLike: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      isQuestion: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    },
   
  );

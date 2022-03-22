const { Like } = require('../config/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get count for Question
const getNumberOfLikeForQuestion = async (questionId) => {
    
        return await Like.count({ where:{questionId, isLike:true} });
};
// Get count Comments
const getNumberOfLikeForComment = async (commentId) => {
    
    return await Like.count({ where:{commentId} });
};

// Get last top user
const getTopQuestion = async () => {
    return await Like.findAll({where:{isLike:true}});
};


// Add new Comment
const addLike = async (like) => {
    return Like.create(like).catch((err) => {
        throw err.message || 'Error creating new like/dislike!';
    });
}  


module.exports = {
    getNumberOfLikeForQuestion,
    getNumberOfLikeForComment,
    addLike,
    getTopQuestion
};
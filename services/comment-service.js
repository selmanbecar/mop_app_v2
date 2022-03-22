const { Comment } = require('../config/db');
const Sequelize = require("sequelize")

// Get all comments by Question
const getComments = async (questionId) => {
    
        return await Comment.findAll({ where:{questionId} });
};

// Get last top user
const getTopUser = async () => {
    return await Comment.findAll();
};


// Get single Comment
const getComment = async (id) => {
   
        return await Comment.findByPk(id);
        
};


// Add new Comment
const addComment = async (comment) => {
    return Comment.create(comment).catch((err) => {
        throw err.message || 'Error creating new comment!';
    });
}  


//Edit Comment by id
const editComment = async (id, comment) => {
        
        return await Comment.update(
                  { ...comment },
                {
                  where: {
                    id,
                  },
                }
              ).catch((err) => {
                throw err.message || 'Error updating Comment!';
              });
    }

// Delete Comment by id
const deleteComment = async (id) => {

        return await Comment.destroy({ where: { id } }).catch((err) => {
        throw err || 'Error deleting Comment!';
        });       
   
};

module.exports = {
    getComments,
    getComment,
    addComment,
    editComment,
    deleteComment,
    getTopUser
};
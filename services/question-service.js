const { Question } = require('../config/db');
const bcrypt = require('bcrypt');

// Get last 20 questions
const getQuestions = async (offset) => {
    
        return await Question.findAll({ offset, limit: 20 });
};

// Get last 20 questions by user
const getQuestionsByUser = async (offset,userId) => {
    
    return await Question.findAll({where:{userId}, offset, limit: 20 });
};


// Get single Question
const getQuestion = async (id) => {
   
        return await Question.findByPk(id);
        
};

const doesQuestionExist = async (email) => {

  return await Question.findOne({where:{email}});

};

// Add new Question
const addQuestion = async (question) => {
    return Question.create(question).catch((err) => {
        throw err.message || 'Error creating new question!';
    });
}  


//Edit Question by id
const editQuestion = async (id, question) => {
        
        return await Question.update(
                  { ...question },
                {
                  where: {
                    id,
                  },
                }
              ).catch((err) => {
                throw err.message || 'Error updating Question!';
              });
    }

// Delete Question by id
const deleteQuestion = async (id) => {

        return await Question.destroy({ where: { id } }).catch((err) => {
        throw err || 'Error deleting Questions!';
        });       
   
};

module.exports = {
    getQuestions,
    getQuestion,
    addQuestion,
    editQuestion,
    deleteQuestion,
    doesQuestionExist,
    getQuestionsByUser
};
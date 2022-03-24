const { Question } = require('../config/db');

// Get last 20 questions
const getQuestions = async (limit) => {
    
        return await Question.findAll({ offset:0, limit: limit,
           order: [
          ['createdAt', 'DESC'],
      ],});
};

// Get last 20 questions by user
const getQuestionsByUser = async (limit,userId) => {
    
    return await Question.findAll({where:{userId}, offset:0, limit });
};


// Get single Question
const getQuestion = async (id) => {
   
        return await Question.findByPk(id);
        
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
    getQuestionsByUser
};
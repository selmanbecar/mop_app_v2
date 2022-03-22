const questionService = require("../services/question-service");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validateOwner = (userId, token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user.id.toString() === userId.toString()
  };

  //Get last 20 questions
const getQuestions = async (req, res) => {
   
    try {
        const offset = req.query.offset

        const questions = await questionService.getQuestions(offset);
        res.status(200).json(questions.reverse());
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

 //Get last 20 questions by User
 const getQuestionsByUser = async (req, res) => {
   
    try {
        const token = req.header('x-auth-token');
        const offset = req.query.offset
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id
        const questions = await questionService.getQuestionsByUser(offset, userId);
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getQuestion = async (req, res) => {
    try {
        const questions = await questionService.getQuestion(req.params.id);
        if(!questions){
            throw new Error("Question does not exist!")
        }
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const addQuestion = async (req, res) => {
    const questions = req.body;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const newQuestion = await questionService.addQuestion(questions);
        res.status(201).send(newQuestion);
      } catch (e) {
        res.status(500).send({ message: e.message }).end();
      }
    } 
  };

const editQuestion = async (req, res) => {
    const { id } = req.params;
  const newQuestion = req.body;
  const token = req.header('x-auth-token');

  try {
    
    const questions = await questionService.getQuestion(id);
    if (!questions) {
      res.status(404).send({ message: "Question doesn't exist!" }).end();
    }
    if (validateOwner(questions.userId, token)) {

      await questionService.editQuestion(id, newQuestion);

      const editedQuestion = await questionService.getQuestion(id);
      res.send(editedQuestion).end();
    } else {
      res
        .status(403)
        .send({ message: 'You are not owner of this questions!' })
        .end();
    }
  } catch (e) {
    res.status(500).send({ message: e.message }).end();
  }
};

const deleteQuestion = async (req, res) => {
    try {
      const questions = await questionService.deleteQuestion(req.params.id);
      if (!questions) {
        res.status(404).send({ message: 'Question not found!' }).end();
        return;
      }
      res.send({ message: 'Question is deleted!' }).end();
    } catch (e) {
        res.status(500).send({ message: e.message }).end();
    }
  };

module.exports = {
    getQuestions,
    getQuestion,
    addQuestion,
    editQuestion,
    deleteQuestion,
    getQuestionsByUser
};
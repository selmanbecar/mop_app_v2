const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const questionController = require('../controllers/question-controllers');

// user routes /api/users

router.get('/', questionController.getQuestions);
router.get('/user',auth, questionController.getQuestionsByUser);
router.get('/:id', questionController.getQuestion);
router.post('/',auth, questionController.addQuestion);
router.patch('/:id', auth, questionController.editQuestion);
router.delete('/:id',auth, questionController.deleteQuestion);

module.exports = router;
const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const commentController = require('../controllers/comment-controllers');

// user routes /api/users

router.get('/question/:id', commentController.getComments);
router.get('/users', commentController.getTopUser);
router.get('/:id', commentController.getComment);
router.post('/',auth, commentController.addComment);
router.patch('/:id', auth, commentController.editComment);
router.delete('/:id',auth, commentController.deleteComment);

module.exports = router; 
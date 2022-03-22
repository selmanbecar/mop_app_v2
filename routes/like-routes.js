const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const likeController = require('../controllers/like-controllers');

// user routes /api/likes,
   

router.get('/question', likeController.getTopQuestion);
router.get('/question/:id', likeController.getNumberOfLikeForQuestion);
router.get('/comment/:id', likeController.getNumberOfLikeForComment);
router.post('/',auth, likeController.addLike);


module.exports = router;  
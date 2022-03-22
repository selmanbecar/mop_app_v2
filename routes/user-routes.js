const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const userController = require('../controllers/user-controllers');

// user routes /api/users

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.addUser);
router.patch('/:id',auth, userController.editUser);
router.delete('/:id',auth, userController.deleteUser);

module.exports = router;
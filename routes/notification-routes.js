const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const notificationController = require('../controllers/notification-controllers');

// notification routes /api/notification

router.get('/:id', notificationController.getNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router; 
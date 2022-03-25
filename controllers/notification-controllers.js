const notificationService = require("../services/notification-service");
const jwt = require('jsonwebtoken');

  //Get notification by userId
const getNotification = async (req, res) => {
   
    try {
        const userId = req.params.id
        const notification = await notificationService.getNotification(userId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// delete notification
const deleteNotification = async (req, res) => {
    try {
      const notification = await notificationService.deleteNotificationsByUser(req.params.id);
      if (!notification) {
        res.status(404).send({ message: 'Notification not found!' }).end();
        return;
      }
      res.send({ message: 'Notification is deleted!' }).end();
    } catch (e) {
        res.status(500).send({ message: e.message }).end();
    }
  };

module.exports = {
    deleteNotification,
    getNotification,
};
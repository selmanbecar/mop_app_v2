const { Notification } = require('../config/db');

// Get Notification by userId
const getNotification = async (userId) => {
        return await Notification.findOne({ where:{userId} });
};


// Add new Notification
const addNotification = async (notification) => {
    return Notification.create(notification).catch((err) => {
        throw err.message || 'Error creating new notification!';
    });
}  

// Delete Notification by user id
const deleteNotificationsByUser = async (userId) => {
    return await Notification.destroy({ where: { userId } }).catch((err) => {
    throw err || 'Error deleting Notification!';
    });       

};


module.exports = {
    addNotification,
    deleteNotificationsByUser,
    getNotification
    
};
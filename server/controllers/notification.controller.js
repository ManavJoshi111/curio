const Notification = require("../models/Notification");
const sendResponse = require("../handlers/response.handler");

// Get all notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ userId, isRead: false });
    return sendResponse(
      res,
      200,
      true,
      "Fetched notifications successfully!",
      notifications
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal Server Error, please try again after some time!"
    );
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;
  const { _id: userId } = req.user;
  try {
    const notification = await Notification.findOne({
      _id: notificationId,
      userId,
    });
    if (!notification) {
      return sendResponse(res, 404, false, "Notification not found");
    }
    notification.isRead = true;
    await notification.save();
    return sendResponse(
      res,
      200,
      true,
      "Notification marked as read successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal Server Error, please try again after some time!"
    );
  }
};

// Mark all notifications as read
exports.markAllNotificationsAsRead = async (req, res) => {
  const { _id: userId } = req.user;
  try {
    await Notification.updateMany({ userId }, { isRead: true });
    return sendResponse(
      res,
      200,
      true,
      "All notifications marked as read successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal Server Error, please try again after some time!"
    );
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  const { notificationId } = req.params;
  const { _id: userId } = req.user;
  try {
    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      userId,
    });
    if (!notification) {
      return sendResponse(res, 404, false, "Notification not found");
    }
    return sendResponse(res, 200, true, "Notification deleted successfully");
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal Server Error, please try again after some time!"
    );
  }
};

// Delete all notifications
exports.deleteAllNotifications = async (req, res) => {
  const { _id: userId } = req.user;
  try {
    await Notification.deleteMany({ userId });
    return sendResponse(
      res,
      200,
      true,
      "All notifications deleted successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal Server Error, please try again after some time!"
    );
  }
};

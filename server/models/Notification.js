const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }, // ID of the entity being acted upon
    entityType: {
      type: String,
      required: true,
    }, // Type of the entity (e.g., 'question', 'answer')
    message: {
      type: String,
    }, // Custom message for the notification
    isRead: {
      type: Boolean,
      default: false,
    }, // Flag for notification status (read/unread)
    link: {
      type: String,
    }, 
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

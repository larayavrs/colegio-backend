const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  global: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
});

module.exports = model('Notification', notificationSchema);

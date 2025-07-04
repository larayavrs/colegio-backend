const { Schema, model } = require('mongoose');

const announceSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  importance: {
    type: String,
    enum: ['info', 'warning', 'critical'],
    default: 'info',
  },
  visible: { type: Boolean, default: true },
});

module.exports = model('Announce', announceSchema);

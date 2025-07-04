const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stage: {
    type: String,
    enum: ['basica', 'media'],
    required: true,
  },
  capacity: { type: Number, default: 0, required: true },
  supervisorId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // profesor jefe
    required: true,
  },
});

module.exports = model('Course', courseSchema);

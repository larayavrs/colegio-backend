const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  level: { type: Number, required: true },
  stage: {
    type: String,
    enum: ['basica', 'media'],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  supervisorId: {
    // profesor jefe
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = model('Course', courseSchema);

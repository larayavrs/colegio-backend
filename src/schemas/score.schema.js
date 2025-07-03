const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  value: {
    type: Number,
    required: true,
    min: 1.0,
    max: 7.0,
  },
  type: {
    type: String,
    enum: [
      'exam',
      'assignment',
      'oral',
      'practical',
      'other',
    ],
    default: 'assignment',
  },
  description: { type: String },
  studentId: {
    // estudiante que obtuvo el puntaje
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  subjectId: {
    // materia a la que pertenece el puntaje
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Subject',
  },
  teacherId: {
    // profesor que impartio la materia
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  courseId: {
    // curso al que pertenece el puntaje
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
});

module.exports = model('Score', scoreSchema);

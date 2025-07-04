const { Schema, model } = require('mongoose');

const attendanceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: { type: Date, required: true },
  present: { type: Boolean, required: true },
  courseId: {
    // curso del estudiante al que pertenece la asistencia
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  subjectId: {
    // materia a la que pertenece la asistencia
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
});

module.exports = model('Attendance', attendanceSchema);

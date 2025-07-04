const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  value: { type: Number, required: true },
  type: { type: String, required: true }, // por ejemplo: examen, trabajo, evaluacion, etc.
  date: { type: Date, default: Date.now },
  studentId: {
    // alumno al que pertenece la calificacion
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subjectId: {
    // materia a la que pertenece la calificacion
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  teacherId: {
    // profesor que dio la calificacion
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    // curso al que pertenece la calificacion
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
});

scoreSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = model('Score', scoreSchema);

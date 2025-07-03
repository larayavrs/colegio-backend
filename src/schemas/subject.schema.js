const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
  name: { type: String, required: true, unique: true },
  teachers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Subject', subjectSchema);

const { Schema, model } = require('mongoose');

const crypterService = require('../services/crypter.service');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  address: { type: String },
  avatar: { type: String },
  // only for students this fields
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await crypterService.hash(user.password);
  next();
});

userSchema.methods.comparePassword = async function (
  password,
) {
  const user = this;
  return await crypterService.compare(
    password,
    user.password,
  );
};

userSchema.set('toJSON', {
  transform: (doc, ret, _) => {
    delete ret.password;
    delete ret.__v;
    delete ret._id;
    ret.id = doc._id;
    return ret;
  },
});

module.exports = model('User', userSchema);

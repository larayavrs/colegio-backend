const Course = require('../schemas/course.schema');

module.exports = {
  create: (payload) => Course.create(payload),
  findAll: () =>
    Course.find().populate(
      'supervisorId',
      'firstname lastname',
    ),
  findById: (id) =>
    Course.findById(id).populate(
      'supervisorId',
      'firstname lastname',
    ),
  update: (id, payload) =>
    Course.findByIdAndUpdate(id, payload, {
      new: true,
    }),
  delete: (id) => Course.findByIdAndDelete(id),
};

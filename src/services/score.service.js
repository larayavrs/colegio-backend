const Score = require('../schemas/score.schema');

// servicio para calificaciones de alumnos
module.exports = {
  create: async (payload) => await Score.create(payload),
  createMany: async (payload) =>
    await Score.insertMany(payload),
  find: async (payload) => await Score.find(payload),
};

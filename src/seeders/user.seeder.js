const mongoose = require('mongoose');
const config = require('../config');
const User = require('../schemas/user.schema');

const userSeed = async () => {
  await mongoose.connect(config.database.url);

  await User.create([
    {
      username: 'admin',
      firstname: 'Admin',
      lastname: 'Principal',
      email: 'admin@gmail.com',
      password: 'test123',
      role: 'admin',
      rut: '12345678-9',
      phone: '987654321',
    },
    {
      username: 'profe',
      firstname: 'Profesor',
      lastname: 'Profesor',
      email: 'profe@gmail.com',
      password: 'test123',
      role: 'teacher',
      rut: '98765432-1',
      phone: '123456789',
    },
    {
      username: 'estudiante',
      firstname: 'Estudiante',
      lastname: 'Estudiante',
      email: 'estudiante@gmail.com',
      password: 'test123',
      role: 'student',
      rut: '56789012-3',
      phone: '456789012',
    },
  ]);

  console.log('Users seed success');
  await mongoose.disconnect();
};

userSeed().catch((error) => {
  console.error(error);
  process.exit(1);
});

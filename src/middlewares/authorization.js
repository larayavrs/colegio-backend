const GlobalError = require('../helpers/errors');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // Asumiendo que ya paso por el middleware de autenticación

    if (!user || !user.role)
      return GlobalError({
        message:
          'No tienes permiso para acceder a este recurso',
        code: 403,
      });

    const role = user.role;
    const isAllowed = allowedRoles.flat().includes(role);

    if (!isAllowed)
      return GlobalError({
        message:
          'El acceso esta denegado. Tu rol no es permitido',
        code: 403,
      });

    next(); // Si el rol es permitido, pasa al siguiente middleware
  };
};

module.exports = (req, res, next) =>
  res.status(404).json({
    status: 'Not Found',
    code: 404,
    message: 'The requested resource could not be found.',
  });

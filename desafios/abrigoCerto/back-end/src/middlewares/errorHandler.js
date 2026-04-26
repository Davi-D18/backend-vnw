export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const payload = {
    message: err.message || 'Erro interno do servidor.',
  };

  if (err.details) {
    payload.errors = err.details;
  }

  if (statusCode >= 500) {
    console.error(err);
  }

  return res.status(statusCode).json(payload);
}

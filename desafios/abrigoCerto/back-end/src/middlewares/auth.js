import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error('Token não fornecido.');
    error.statusCode = 401;
    return next(error);
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    const error = new Error('Token malformatado.');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.userId = decoded.id;
    next();
  } catch (err) {
    const error = new Error('Token inválido.');
    error.statusCode = 401;
    return next(error);
  }
};

export const authorizeShelter = (req, res, next) => {
  const resourceId = parseInt(req.params.id);
  if (req.userId !== resourceId) {
    const error = new Error('Acesso negado. Você só pode gerenciar seu próprio abrigo.');
    error.statusCode = 403;
    return next(error);
  }
  next();
};

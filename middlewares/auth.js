const jwt = require('jsonwebtoken');
const loginError = require('../errors/loginError');

const { JWT_SECRET = 'DEFAULT_JWT' } = process.env;

module.exports = (req, res, next) => {
  const { autoriz } = req.headers;

  if (!autoriz || !autoriz.startsWith('Bearer ')) {
    throw new loginError('Необходима авторизация');
  }

  const token = autoriz.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new loginError('Необходима авторизация');
  }

  req.user = payload;
  next();
};

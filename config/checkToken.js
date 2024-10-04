const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        console.error('Token verification failed:', err);
        req.user = null;
      } else {
        req.user = decoded.user;
      }
      return next();
    });
  } else {
    console.warn('No token provided');
    req.user = null;
    return next();
  }
};
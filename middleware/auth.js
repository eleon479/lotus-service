const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access Denied - Missing token.');

  try {
    const decoded = jwt.verify(token, process.env.LOTUS_JWTPK);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Bad token!');
  }
}

module.exports = auth;

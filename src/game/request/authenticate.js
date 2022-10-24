const jwt = require("jsonwebtoken");
function authenticate(req, res, next) {
  const authHeader =
    req.body.token ||
    req.query.token ||
    req.headers["authorization"] ||
    req.params;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) throwErrorNext("Your access token is incorrect", 401);
    req.user = user;

    next();
  });
  function throwErrorNext(message, status) {
    const err = new Error(message);
    err.status = status;
    return next(err);
  }
}
module.exports = authenticate;

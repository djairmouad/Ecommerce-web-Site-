const jwt=require("jsonwebtoken");
const fs=require("fs");
const privatkey="hello world";

function authJWT(req, res, next) {

 const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, privatkey, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = decoded;
    next();
  });
}

module.exports = { authJWT };

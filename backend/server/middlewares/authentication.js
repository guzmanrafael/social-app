const jwt = require("jsonwebtoken");

//=================
// Token verification
//==================

let tokenVerification = (req, res, next) => {
  var token;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    token = bearerToken;
  } else {
    res.send(403);
  }

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no válido",
        },
      });
    }

    req.user = decoded.user;
    next();
  });
};

module.exports = {
  tokenVerification,
};

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization || req.headers.Authorization;

  if (!bearerToken?.startsWith("Bearer ")) {
    return res.status(403).send("A token is required for authentication!!");
  }

  token = bearerToken.split(" ")[1];
  try {
    jwt.verify(token, config.TOKEN_KEY, async (err, decodedData) => {
      if (err) {
        return res.status(403).send({ err, data: `User not Authenticated!!` });
      }
      req.user = decodedData.user_info;
      req.roles = decodedData.roles;
      next();
    });
  } catch (err) {
    return res.status(401).send("Invalid Token!!");
  }
};

module.exports = verifyToken;

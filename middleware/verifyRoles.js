const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).send({ message: `User not Authorized!!` });
    }

    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) {
      return res.status(401).send({ message: `User not Authorized!!` });
    }
    next();
  };
};

module.exports = verifyRoles;

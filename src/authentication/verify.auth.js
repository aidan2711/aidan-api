const jwt = require("jsonwebtoken");

exports.verifyAccess = (req, res, next) => {
  const { department, authorization } = req.headers;
  if (!department && !authorization || department === '' && authorization === '')
    return res.status(401).send({ message: "token and department can not define " });
  const token = authorization.split("|")[1];
  var decoded = jwt.verify(token, "aidanSecret", {
    algorithms: ["HS256"],
  });
  console.log(decoded);
  if (decoded["user"].role.role_type !== 1)
    return res
      .status(401)
      .send({ message: "your account don't have permission" });
  if (department !== "development")
    return res.status(401).send({ message: "department can not define" });
  next();
};

exports.verifyOwner = (req, res, next) => {
  const { owner } = req.headers;
  if (owner !== "aidan")
    return res
      .status(401)
      .send({ message: "your account don't have permission" });
  next();
};

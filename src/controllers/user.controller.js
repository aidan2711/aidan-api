const { User } = require("@models/user.model");
const { Role } = require("@models/role.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HandlerUtils = require("@utils/handler.utils");

exports.authentication = async (req, res) => {
  try {
    User.findOne({ username: req.body.username }, function (error, user) {
      if (error) return res.send(error);
      if (user == null) return res.json({ message: `user's not exist` });
      if (user.role.role_type !== 1)
        return res.json({ message: `user doesn't have permission` });
      if (!bcrypt.compareSync(req.body.password, user.password))
        return res.sendStatus(403);
      jwt.sign({ user }, "aidanSecret", (err, token) => {
        if (err) return res.send(err);
        res.json({ "access-token": `aidan|${token}` });
      });
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({
        message: "fields can not empty",
      });
    const role = await Role.findOne({ role_type: 1 }).catch((err) =>
      HandlerUtils.errorHandler(res, err)
    );

    const { username, email, fullname, password } = req.body;

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const newUser = {
          email: email,
          username: username,
          fullname: fullname,
          role: role,
          password: hash,
        };
        const user = await User.create(newUser).catch((err) =>
          HandlerUtils.errorHandler(res, err)
        );
        return HandlerUtils.responseHandler(res, user);
      });
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: `${username}` } : null;

  const users = await User.find({ condition }).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, users);
};

exports.findOne = async (req, res) => {
  const username = req.params.username;
  const userId = req.params.userId;
  const condition = null;
  if (username) {
    condition = { username: username };
  } else if (userId) {
    condition = { userId: userId };
  }
  const user = await User.findOne(condition).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, user);
};

exports.update = async (req, res) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId }).then((data) => {
    if (!data) return res.status(500).json({ message: `user's not exist` });
    data.username =
      req.body.username !== undefined ? req.body.username : data.username;
    data.fullname =
      req.body.fullname !== undefined ? req.body.fullname : data.fullname;
    data.email = req.body.email !== undefined ? req.body.email : data.email;
    if (req.body.password !== undefined) {
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          data.password = hash;
        });
      });
    }
    data.save((err, data) => {
      if (err)
        return res.status(500).send(err).json({ message: "something wrong" });
      return res.status(200).json({ message: "task updated", data: data });
    });
  });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  const isDeleted = await User.destroy({
    where: { id: id },
  }).catch((err) => HandlerUtils.errorHandler(res, err));
  if (isDeleted == 1) {
    res.status(200).send({
      message: "delete data successfully!",
    });
  } else {
    res.status(500).send({
      message: `cannot delete data with id=${id}.`,
    });
  }
};

// exports.findAllActive = async (req, res) => {
//   const users = await User.findAll({ where: { activated: true } }).catch(
//     (err) => HandlerUtils.errorHandler(res, err)
//   );
//   return HandlerUtils.responseHandler(res, users);
// };

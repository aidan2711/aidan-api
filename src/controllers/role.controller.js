const {Role} = require("@models/role.model");
const HandlerUtils = require("@utils/handler.utils");

exports.create = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({
        message: "fields can not empty",
      });
    const { role_type, name, description } = req.body;
    const role = await Role.create({ role_type, name, description }).catch((err) =>
      HandlerUtils.errorHandler(res, err)
    );
    return HandlerUtils.responseHandler(res, role);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const role = await Role.find().catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, role);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const role = await Role.findOne(id).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, role);
};

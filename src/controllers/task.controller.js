const Task = require("@models/task.model");
const HandlerUtils = require("@utils/handler.utils");

exports.findAll = async (req, res) => {
  const task = await Task.find().catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, task);
};

exports.create = async (req, res) => {
  if (!req.body)
    return res.status(400).send({
      message: "fields can not empty",
    });
  const task = await Task.create(req.body).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, task);
};

exports.findOne = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id }).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, task);
};

exports.deleteOne = async (req, res) => {
  const task = await Task.deleteOne({ _id: req.params.id }).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, task);
};

exports.deleteAll = async (req, res) => {
  const task = await Task.delete().catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, task);
};

exports.update = async (req, res) => {
  Task.findOne({ _id: req.params.id }).then((data) => {
    if (!data) return res.status(500).json({ message: `task's not exist` });
    data.task = req.body.task !== undefined ? req.body.task : data.task;
    data.note = req.body.note !== undefined ? req.body.note : data.note;
    data.deadline =
      req.body.deadline !== undefined ? req.body.deadline : data.deadline;
    data.save((err, data) => {
      if (err)
        return res.status(500).send(err).json({ message: "something wrong" });
      return res.status(200).json({ message: "task updated", data: data });
    });
  });
};

exports.updateStatus = async (req, res) => {
  Task.findOne({ _id: req.params.id }).then((data) => {
    if (!data) return res.status(500).json({ message: `task's not exist` });
    data.complete = !data.complete;
    data.save((err, data) => {
      if (err)
        return res.status(500).send(err).json({ message: "something wrong" });
      return res
        .status(200)
        .json({ message: "task status updated", data: data });
    });
  });
};

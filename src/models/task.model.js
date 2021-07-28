const mongoose = require("mongoose");
const { UserSchema } = require("@models/user.model");

const TaskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  complete: {
    type: Boolean,
    required: true,
    default: false,
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;

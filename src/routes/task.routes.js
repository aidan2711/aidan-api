const tasks = require("@controllers/task.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.post("/tasks", auth.verifyAccess, tasks.create);

router.get("/tasks", auth.verifyAccess, tasks.findAll);

router.get("/tasks/id=:id", auth.verifyAccess,tasks.findOne);

router.post("/tasks/id=:id", auth.verifyAccess, tasks.update);

router.post("/tasks/status/id=:id", auth.verifyAccess, tasks.updateStatus);

router.delete("/tasks/id=:id", auth.verifyAccess, tasks.deleteOne);

router.delete("/tasks/all", auth.verifyAccess, tasks.deleteAll);

module.exports = router;

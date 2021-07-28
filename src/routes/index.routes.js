const express = require('express');
const router = express.Router();
const userRoutes = require("@routes/user.routes");
const roleRoutes = require("@routes/role.routes");
const taskRoutes = require("@routes/task.routes");

router.get((req, res) => {
  res.json({ message: "Welcome to Aidan API" });
})

router.use(express.json());

router.use(userRoutes);
router.use(roleRoutes);
router.use(taskRoutes);


module.exports = router;
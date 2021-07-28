const users = require("@controllers/user.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.post("/auth", users.authentication);

router.post(
  "/users/register",
  users.create
);

module.exports = router;

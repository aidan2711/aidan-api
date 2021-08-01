const users = require("@controllers/user.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.post("/auth", users.authentication);

router.post("/users/register", users.create);

router.get("/users", auth.verifyAccess, auth.verifyOwner, users.findAll);

router.get(
  "/users/userId=:userId",
  auth.verifyAccess,
  auth.verifyOwner,
  users.findOne
);

router.put(
  "/users/username=:usename",
  auth.verifyAccess,
  auth.verifyOwner,
  users.findAll
);

router.delete(
  "/users/userId=:id",
  auth.verifyAccess,
  auth.verifyOwner,
  users.delete
);

module.exports = router;

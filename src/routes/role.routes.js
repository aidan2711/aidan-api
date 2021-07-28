const roles = require("@controllers/role.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.get("/roles", auth.verifyAccess, roles.findAll);

router.post("/roles", auth.verifyOwner, roles.create);

router.get("/roles/id=:id", auth.verifyAccess, roles.findOne);

module.exports = router;

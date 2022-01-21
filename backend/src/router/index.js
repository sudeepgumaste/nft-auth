const { Router } = require("express");

const protectedResource = require("../controller/protectedResource");
const login = require("../controller/login");

const verifyJWT = require("../middleware/verifyJWT");

const router = Router();

router.use("/protected", verifyJWT, protectedResource);
router.use("/login", login);

module.exports = router;

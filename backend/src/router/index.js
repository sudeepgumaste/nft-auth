const { Router } = require("express");

const protectedResource = require("../controller/protectedResource");
const login = require("../controller/login");

const verifyWallet = require("../middleware/verifyWallet");

const router = Router();

router.use("/protected", verifyWallet, protectedResource);
router.use("/login", login);

module.exports = router;

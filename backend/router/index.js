const { Router } = require("express");

const protectedResource = require("../controller/protectedResource");
const verifyWallet = require("../middleware/verifyWallet");

const router = Router();

router.use("/protected", verifyWallet, protectedResource);

module.exports = router;

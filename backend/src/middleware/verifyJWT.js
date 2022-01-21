const jwt = require("jsonwebtoken");

const verifyWallet = async (req, res, next) => {
  let token = req.header("Authorization");
  token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "JWT is required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Token verification failed",
      error: error.message,
    });
  }
};

module.exports = verifyWallet;

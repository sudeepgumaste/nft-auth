const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const nfKeyABI = require("../assets/NFKey.json").abi;

const nfKeyContract = new ethers.Contract(
  process.env.CONTRACT_ADDY,
  nfKeyABI,
  provider
);

const verifyWallet = async (req, res, next) => {
  try {
    const signature = req.headers.signature;
    if (!signature) {
      return res.status(400).json({
        message: "Signature is required",
      });
    }

    const hashMessage = ethers.utils.hashMessage("Sign me in!");
    const pk = ethers.utils.recoverPublicKey(hashMessage, signature);
    const recoveredAddress = ethers.utils.computeAddress(pk);

    const nfts = await nfKeyContract.getNftsByAddress(recoveredAddress);
    if (nfts.length !== 0) {
      req.address = recoveredAddress;
      next();
    } else {
      res.status(401).json({
        message: "Buy NFKey to access this resource",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = verifyWallet;

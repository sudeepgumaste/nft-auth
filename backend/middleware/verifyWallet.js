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
    const hashMessage = ethers.utils.hashMessage("Sign me in!");
    const signature = req.body.signature;

    const recoveredAddress = await ethers.utils.verifyMessage(
      hashMessage,
      signature
    );
    console.log(recoveredAddress);

    const nfts = await nfKeyContract.getNftsByAddress(recoveredAddress);
    if (nfts.length !== 0) {
      next();
    } else {
      res.status(401).json({
        message: "Buy NFKey to access this resource",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = verifyWallet;

const ethers = require("ethers");
const jwt = require("jsonwebtoken");

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const nfKeyABI = require("../assets/NFKey.json").abi;

const nfKeyContract = new ethers.Contract(
  process.env.CONTRACT_ADDY,
  nfKeyABI,
  provider
);

const login = async (req, res) => {
  const { message, signature } = req.body;

  //extract timestamp from message
  const [addressElement, timestampElement] = message.split("\n\n").slice("-2");
  const timestamp = timestampElement.split(":")[1];
  const address = addressElement.split(":")[1];

  // verify timestamp not older than 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (now - timestamp > 300) {
    return res.status(401).json({
      message: "Bro... this time stamp old af",
    });
  }

  const hashMessage = ethers.utils.hashMessage(message);
  const pk = ethers.utils.recoverPublicKey(hashMessage, signature);
  const recoveredAddress = ethers.utils.computeAddress(pk);

  if (recoveredAddress !== address) {
    return res.status(401).json({
      message: "Bro... this signature is not for you",
    });
  }

  const nfts = await nfKeyContract.getNftsByAddress(recoveredAddress);
  if (nfts.length === 0) {
    res.status(401).json({
      message: "Buy NFKey to access this resource",
    });
  }

  // construct jwt token
  const accessToken = jwt.sign(
    { address, nftCount: nfts.length },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res.json({
    jwt: accessToken,
  });
};

module.exports = login;

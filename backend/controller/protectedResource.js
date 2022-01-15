const protectedResource = (req, res) => {
  res.json({
    message: "Ahhh! I'm protected",
  });
};

module.exports = protectedResource;

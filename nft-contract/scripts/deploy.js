const main = async () => {
  const contractCreator = await hre.ethers.getContractFactory("NFKey");
  const nftContract = await contractCreator.deploy();
  await nftContract.deployed();

  let txn = await nftContract.mintNFKey();
  await txn.wait();

  console.log("Contract deployed to address", nftContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();

const main = async () => {
  const [signer0, ...rest] = await hre.ethers.getSigners();
  console.log(signer0.address);

  const contractCreator = await hre.ethers.getContractFactory("NFKey");
  const nftContract = await contractCreator.deploy();
  await nftContract.deployed();
  console.log("Contract deployed");

  let txn = await nftContract.mintNFKey();
  await txn.wait();

  txn = await nftContract.mintNFKey();
  await txn.wait();

  txn = await nftContract.mintNFKey();
  await txn.wait();

  txn = await nftContract.getNftsByAddress(signer0.address);
  console.log(txn);
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

import { useWalletProviderState } from "../../../context/WalletProvider";

const MintBox = () => {
  const { isConnected, handleConnectWallet, nfKeyContract } =
    useWalletProviderState();

  const handleMint = async () => {
    if (!nfKeyContract) {
      console.log(null);
      return;
    }
    try {
      const txn = await nfKeyContract.mintNFKey();
      alert("Minted NFKey successfully!");
      console.log(txn);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <div className="tw-w-full | tw-my-16 | tw-flex">
      <div
        className="tw-mx-auto tw-p-6 | tw-bg-slate-800 | tw-shadow-md | tw-rounded-2xl | tw-text-center"
        style={{ minWidth: "430px" }}
      >
        <h1 className="tw-text-xl tw-font-bold | tw-mb-5">MINT NFKey</h1>
        <p className="tw-mb-4">
          Holding an NFKey gives you access to
          <br /> exclusive content on our website
        </p>
        {/* <p className="tw-mb-8">
          <span className="tw-font-bold">{minted}</span> of{" "}
          <span className="tw-font-bold">{maxMints}</span> NFKeys minted
        </p> */}
        <button
          onClick={isConnected ? handleMint : handleConnectWallet}
          className="tw-px-4 tw-py-2 | tw-w-full | tw-bg-indigo-600 hover:tw-bg-indigo-800 | tw-transition-colors | tw-rounded-lg | tw-font-bold tw-text-xl"
        >
          {isConnected ? "MINT NFKey" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default MintBox;

import { Link } from "react-router-dom";
import { useWalletProviderState } from "../../../context/WalletProvider";

const Nav = () => {
  const { isConnected, address, handleConnectWallet } =
    useWalletProviderState();
  return (
    <header className="tw-w-full tw-bg-gray-800 | tw-px-4 tw-py-4">
      <div className="tw-max-w-7xl | tw-mx-auto | tw-flex tw-items-center">
        <section className="tw-font-bold tw-text-lg">NFKey</section>
        <nav className="tw-ml-auto">
          <ul className="tw-flex tw-gap-8">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="exclusive">Exclusive Content</Link>
            </li>
          </ul>
        </nav>
        {isConnected ? (
          <span className="tw-ml-8 | tw-text-sm | tw-bg-blue-900 | tw-py-2 tw-px-4 tw-rounded-lg">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        ) : (
          <button
            className="tw-px-4 tw-py-2 tw-ml-8 | tw-bg-indigo-600 hover:tw-bg-indigo-800 | tw-transition-colors | tw-rounded-lg | tw-font-bold"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Nav;

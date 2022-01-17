import ErrorBanner from "../../templates/ErrorBanner/ErrorBanner";
import MintBox from "../../templates/MintBox/MintBox";

import { useWalletProviderState } from "../../../context/WalletProvider";

const Home = () => {
  const { hasMetamask, isCorrectChain, isLoading } = useWalletProviderState();
  return (
    <section>
      {!isLoading &&
        (!hasMetamask ? (
          <ErrorBanner message="Please install MetaMask to use this website" />
        ) : (
          !isCorrectChain && (
            <ErrorBanner message="Please switch to the Rinkeby test network" />
          )
        ))}
      <MintBox />
    </section>
  );
};

export default Home;

import { createContext, FC, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import NFKeyContract from "../../assets/contracts/NFKey.json";

interface IWalletProvider {
  address: string | null;
  isConnected: boolean;
  mintedCount: number;
  maxMints: number;
  hasMetamask: boolean;
  isCorrectChain?: boolean;
  isLoading: boolean;
  handleConnectWallet: () => void;
  provider: any;
  nfKeyContract: any;
}

const walletContextDefaultState: IWalletProvider = {
  address: null,
  isConnected: false,
  mintedCount: 0,
  maxMints: 0,
  hasMetamask: false,
  isCorrectChain: undefined,
  isLoading: false,
  handleConnectWallet: () => {},
  provider: null,
  nfKeyContract: null,
};

export const WalletContext = createContext<IWalletProvider>(
  walletContextDefaultState
);

export const WalletProvider: FC = ({ children }) => {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [mintedCount, setMintedCount] = useState(0);
  const [maxMints, setMaxMints] = useState(0);
  const [isCorrectChain, setIsCorrectChain] = useState<boolean | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<any | null>(null);
  const [nfKeyContract, setNfKeyContract] = useState<any | null>(null);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window as unknown as Web3Window;
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      setHasMetamask(true);

      const _provider = new ethers.providers.Web3Provider(ethereum);
      const signer = _provider.getSigner();
      const _nfKeyContract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDY as string,
        NFKeyContract.abi,
        signer
      );
      console.log(_provider, _nfKeyContract);
      setProvider(_provider);
      setNfKeyContract(_nfKeyContract);
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    const rinkebyChainId = "0x4";
    if (chainId === rinkebyChainId) {
      setIsCorrectChain(true);
    }

    ethereum.on("chainChanged", () => window.location.reload());

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setIsConnected(true);
      setAddress(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const handleConnectWallet = async () => {
    try {
      const { ethereum } = window as unknown as Web3Window;

      if (!hasMetamask) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onInit = async () => {
    setIsLoading(true);
    await checkIfWalletIsConnected();
    setIsLoading(false);
  };

  // const getMintInfo = async (nfKeyContract: any) => {
  //   const mintedCount = await nfKeyContract.getMintedCount();
  //   const maxMints = await nfKeyContract.getMaxMints();
  //   setMintedCount(mintedCount.toNumber());
  //   setMaxMints(maxMints.toNumber());
  // };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        mintedCount,
        maxMints,
        hasMetamask,
        isCorrectChain,
        isLoading,
        handleConnectWallet,
        provider,
        nfKeyContract,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletProviderState = (): IWalletProvider => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error(
      "useWalletProviderState must be used within an WalletProvider"
    );
  }
  return context;
};

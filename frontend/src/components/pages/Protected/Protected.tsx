import { useEffect, useState } from "react";
import { login } from "../../../apiRequests/login";
import { getProtectedResource } from "../../../apiRequests/protectedResource";
import { useWalletProviderState } from "../../../context/WalletProvider";
import ErrorBanner from "../../templates/ErrorBanner/ErrorBanner";

const constructMessage = (timestamp: number, address: string) => `
Welcome to NFKey!

This request will not trigger a blockchain transaction or cost any gas fees.

Your authentication status will reset after 24 hours.

Address:${address}

Timestamp:${timestamp}
`;

const Protected = () => {
  const { provider, isLoading } = useWalletProviderState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const signMessage = async () => {
    const signer = provider.getSigner();

    const timestamp = Math.floor(Date.now() / 1000);
    const address = await signer.getAddress();
    const message = constructMessage(timestamp, address);

    const signature = await signer.signMessage(message);

    try {
      const data = await login({ message, signature });
      console.log(data);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      signMessage();
    }
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {error && <ErrorBanner message={error} />}
      <div className="tw-max-w-7xl | tw-my-12 | tw-mx-auto">
        <h1 className="tw-text-xl tw-font-bold">Protected Resource</h1>
        {message && (
          <p>
            This is the response from backend which can be switched with any
            content: {message}
          </p>
        )}
      </div>
    </>
  );
};

export default Protected;

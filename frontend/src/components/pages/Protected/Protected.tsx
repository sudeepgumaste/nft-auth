import { useEffect, useState } from "react";
import { getProtectedResource } from "../../../apiRequests/protectedResource";
import { useWalletProviderState } from "../../../context/WalletProvider";
import ErrorBanner from "../../templates/ErrorBanner/ErrorBanner";

const Protected = () => {
  const { provider, isLoading } = useWalletProviderState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const signMessage = async (message: string) => {
    const signer = provider.getSigner();
    const signedMessage = await signer.signMessage(message);
    console.log(signedMessage);
    try {
      const data = await getProtectedResource(signedMessage);
      console.log(data);
      setMessage(data.message);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      signMessage("Sign me in!");
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

import { useEffect, useState } from "react";

import ErrorBanner from "../../templates/ErrorBanner/ErrorBanner";

import { login } from "../../../apiRequests/login";
import { getProtectedResource } from "../../../apiRequests/protectedResource";

import { useWalletProviderState } from "../../../context/WalletProvider";
import { checkJWT } from "../../../utils/checkJWT";

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
  const [error, setError] = useState("");

  const signMessage = async () => {
    if (!provider) return;
    const signer = provider.getSigner();

    const timestamp = Math.floor(Date.now() / 1000);
    const address = await signer.getAddress();
    const message = constructMessage(timestamp, address);

    const signature = await signer.signMessage(message);

    try {
      const auth = await login({ message, signature });
      localStorage.setItem("jwt", auth.jwt);
    } catch (e) {
      console.log(e);
      setError((e as Error).message);
    }
  };

  const fetchData = async () => {
    let jwt = localStorage.getItem("jwt");
    if (!jwt) {
      await signMessage();
    }
    if (!checkJWT(jwt as string)) {
      await signMessage();
    }
    const data = await getProtectedResource();
    setMessage(data.message);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchData();
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

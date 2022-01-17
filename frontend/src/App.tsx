import Router from "./router/Router";

import { WalletContext, WalletProvider } from "./context/WalletProvider";
import "./App.css";

function App() {
  return (
    <WalletProvider>
      <Router />
    </WalletProvider>
  );
}

export default App;

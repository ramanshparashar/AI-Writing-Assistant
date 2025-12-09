import React from "react";
import ReactDOM from "react-dom/client";
import img from "./images/ai.png";
import "./index.css";

import { PrivyProvider } from "@privy-io/react-auth";

import App from "./App";

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID || ""; 

if (!PRIVY_APP_ID) {
  console.warn("VITE_PRIVY_APP_ID is not set. Privy login will not work until you set it.");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId= {PRIVY_APP_ID}
      config={{
        // Display email and wallet as login methods
        loginMethods: ["email", "wallet", "google", "sms"],
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: img,
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
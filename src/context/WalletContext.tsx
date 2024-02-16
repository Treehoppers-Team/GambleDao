// WalletContext.tsx
import { createContext, useContext, useState } from "react";

// Define the type for the props object
interface WalletProviderProps {
  children: React.ReactNode; // Children can be any valid React node
}

// Define the type for the context value
interface WalletContextValue {
  walletAddress: string | null;
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
  brokerContract: any;
  setBrokerContract: React.Dispatch<React.SetStateAction<any>>;
  ethDeposited: any;
  setEthDeposited: React.Dispatch<React.SetStateAction<any>>;
}

export const WalletContext = createContext<WalletContextValue | undefined>(
  undefined
);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [brokerContract, setBrokerContract] = useState<any>(null);
  const [ethDeposited, setEthDeposited] = useState<any>(null);

  const value: WalletContextValue = {
    walletAddress,
    setWalletAddress,
    brokerContract,
    setBrokerContract,
    ethDeposited,
    setEthDeposited,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

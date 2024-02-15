import { useState } from "react";

interface MyComponentProps {
  // defining the types of props in the functional signature
  walletAddress: any;
  disConnectWallet: any;
}

const DisconnectWalletDropdown: React.FC<MyComponentProps> = ({
  walletAddress,
  disConnectWallet,
}) => {
  const [showDisconnectPopup, setShowDisconnectPopup] = useState(false);

  const toggleDisconnectPopup = () => {
    setShowDisconnectPopup(!showDisconnectPopup);
  };

  return (
    <div>
      <button className="connectWallet" onClick={toggleDisconnectPopup}>
        <span>Connected: {walletAddress.slice(0, 5)}....</span>
      </button>
      {showDisconnectPopup && (
        <div className="disconnectPopup">
          <button onClick={disConnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default DisconnectWalletDropdown;

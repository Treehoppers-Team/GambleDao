import React from "react";
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

interface MyComponentProps {
  // defining the types of props in the functional signature
  // returnToHome: any;
  balance: any;
  // goToSelect: any;
}

const Home: React.FC<MyComponentProps> = ({
  // returnToHome,
  balance,
  // goToSelect,
}) => {
  // Divide balance by 10^18 and convert to string
  const formattedBalance = balance
    ? (balance / BigInt(10 ** 18)).toString()
    : "0";

  // Getting common state variables from wallet context
  const { walletAddress, setWalletAddress, brokerContract, setBrokerContract } =
    useWallet();

  // to determine which subpage (stake or claim)
  const [selectedButton, setSelectedButton] = useState("stake");

  // changes to selected subpage (stake or claim)
  const handleButtonClick = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  const stake = async () => {
    if (!walletAddress) {
      alert(`Wallet is not connected, please connect wallet`);
    } else {
      try {
        const result = await brokerContract.deposit({
          value: 1000000000000000, // 0.001ETH
        });
        alert(`transaction hash is ${result.hash}`);
      } catch (e) {
        console.log(e);
        alert(`an error occured`);
      }
    }
  };

  return (
    <div className="staking-container">
      <div className="staking-box">
        <div className="staking-titles">
          <h1
            className={`staking-title ${
              selectedButton === "stake" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("stake")}
          >
            Stake
          </h1>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h1
            className={`staking-title ${
              selectedButton === "claim" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("claim")}
          >
            Claim
          </h1>
        </div>
        {selectedButton === "stake" ? (
          <>
            <h1 className="staking-value">{formattedBalance} GTK</h1>
            <button className="stakingButton" onClick={stake}>
              Stake
            </button>
          </>
        ) : (
          <>
            {" "}
            <h1 className="staking-value">????</h1>{" "}
            <button className="stakingButton">Claim</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

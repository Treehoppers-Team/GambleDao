import React from "react";
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

const Home = () => {
  // Getting common state variables from wallet context
  const {
    walletAddress,
    brokerContract,
    ethDeposited,
    setEthDeposited,
    ethBalance,
    blockNumber,
  } = useWallet();

  // value of stake from the textbox
  const [stakeValue, setStakeValue] = useState<number | string>("");

  // to determine which subpage (stake or claim)
  const [selectedButton, setSelectedButton] = useState("stake");

  // changes to selected subpage (stake or claim)
  const handleButtonClick = (buttonType: string) => {
    setSelectedButton(buttonType);
    if (buttonType == "claim") {
      retrieveBalance();
    }
  };

  const stake = async () => {
    if (!walletAddress) {
      alert(`Wallet is not connected, please connect wallet`);
    } else if (stakeValue === "" || stakeValue == "0") {
      alert(`You currently have 0 ETH staked`);
    } else {
      try {
        const numberStakeValue = Number(stakeValue) * 10 ** 18;
        if (numberStakeValue > ethBalance) {
          alert(`You current ETH balance is insufficient`);
        } else if (numberStakeValue < 0) {
          alert(`ETH Staked cannot be negative`);
        } else {
          const stringNumberStakeValue = String(numberStakeValue);
          console.log(stringNumberStakeValue, typeof stringNumberStakeValue);
          const result = await brokerContract.deposit({
            value: stringNumberStakeValue, // Convert to wei
          });
          alert(`transaction hash is ${result.hash}`);
        }
      } catch (e) {
        console.log(e);
        alert(
          `an expected error occured, user may have terminated the transaction`
        );
      }
    }
  };

  const cleanIDs = (ids: any) => {
    const cleaned = [];
    for (const key in ids) {
      if (!isNaN(parseInt(key))) {
        cleaned.push(ids[key]);
      }
    }
    return cleaned;
  };

  const getETHBalance = async (id: any) => {
    const depositInfo = await brokerContract.getDepositInfo(id);
    return parseInt(depositInfo[1]);
  };

  const getTotalETHBalance = async (idList: any) => {
    let totalBalance = 0;
    for (const id of idList) {
      const balance = await getETHBalance(id);
      totalBalance += balance;
    }
    return totalBalance;
  };

  const retrieveBalance = async () => {
    if (walletAddress) {
      const depositorIDs = await brokerContract.getDepositorDepositIds(
        walletAddress
      );
      const cleanedIDs = cleanIDs(depositorIDs);
      console.log(cleanedIDs);
      const totalBalance = await getTotalETHBalance(cleanedIDs);
      const cleanedBalance = totalBalance / 10 ** 18;
      console.log(cleanedBalance);
      setEthDeposited(cleanedBalance);
    }
  };

  const retrieveInfo = async () => {
    if (walletAddress) {
      try {
        const releaseBlock = await brokerContract.releaseBlock();
        console.log(`release block is ${releaseBlock}`);
        if (blockNumber < parseInt(releaseBlock)) {
          alert(`Deposit has not yet matured`);
        } else {
          // function to claim yield and eth
        }
      } catch (e) {
        console.log(e);
        alert(
          `an expected error occured, user may have terminated the transaction`
        );
      }
    } else {
      alert(`Wallet is not connected, please connect wallet`);
    }
  };

  return (
    <div>
      <div className="title">
        Combining blast yield with&nbsp;
        <span className="greenTinge">composability</span>
      </div>
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
              <div className="stake-input-container">
                <div className="stake-values">
                  <div className="stake-value">Stake</div>
                  <div className="stake-value">ETH</div>
                </div>
                <div className="stake-input">
                  <input
                    type="number"
                    value={stakeValue}
                    onChange={(e) => setStakeValue(Number(e.target.value))}
                    placeholder="Enter amount"
                  />
                </div>
                <br></br>
                <hr></hr>
                <div className="stake-values">
                  <div className="stake-value">Receive</div>
                  <div className="stake-value">GTK</div>
                </div>
                <div className="stake-input">
                  <input
                    type="number"
                    value={stakeValue}
                    onChange={(e) => setStakeValue(e.target.value)}
                    disabled
                  />
                </div>
                <br></br>
              </div>
              <button className="stakingButton" onClick={stake}>
                Stake
              </button>
            </>
          ) : (
            <>
              {ethDeposited ? (
                <div className="stake-input-container">
                  <h1 className="balance-value">ETH {ethDeposited}</h1>
                </div>
              ) : walletAddress ? (
                <div className="stake-input-container">
                  <h1 className="balance-value">Press Reload</h1>
                </div>
              ) : (
                <div className="stake-input-container">
                  <h1 className="balance-value">Connect Wallet</h1>
                </div>
              )}
              {ethDeposited ? (
                <button className="stakingButton" onClick={retrieveInfo}>
                  Claim
                </button>
              ) : walletAddress ? (
                <button className="stakingButton" onClick={retrieveBalance}>
                  Reload
                </button>
              ) : (
                <button className="stakingButton" onClick={retrieveInfo}>
                  Claim
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import DisconnectWalletDropdown from "./subcomponents/DisconnectWalletDropdown"; // Import the new component
import Link from "next/link";
const ethers = require("ethers");
import { useWallet } from "@/context/WalletContext";

const NavBar = () => {
  // broker variables
  const brokerAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_gToken",
          type: "address",
        },
        {
          internalType: "address",
          name: "_blastAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_releaseBlock",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "depositor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "depositId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "releaseBlock",
          type: "uint256",
        },
      ],
      name: "DepositMade",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "claimer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "depositId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "gAmount",
          type: "uint256",
        },
      ],
      name: "GTokensClaimed",
      type: "event",
    },
    {
      inputs: [],
      name: "blastAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "depositId",
          type: "uint256",
        },
      ],
      name: "claimGTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "deposits",
      outputs: [
        {
          internalType: "address",
          name: "depositor",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "releaseBlock",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "gToken",
      outputs: [
        {
          internalType: "contract GToken",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "depositId",
          type: "uint256",
        },
      ],
      name: "getDepositInfo",
      outputs: [
        {
          internalType: "address",
          name: "depositor",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "releaseBlock",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "depositor",
          type: "address",
        },
      ],
      name: "getDepositorDepositIds",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nextGTokenId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "releaseBlock",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_releaseBlock",
          type: "uint256",
        },
      ],
      name: "setReleaseBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "totalDeposits",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawOwnerFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const brokerContractAddress = "0x3ed337454c122F77FE139454178911453E4e9CC4";

  // Getting common state variables from wallet context
  const {
    walletAddress,
    setWalletAddress,
    brokerContract,
    setBrokerContract,
    setEthDeposited,
  } = useWallet();

  // const [provider, setProvider] = useState<any>();
  // const customProvider = new ethers.JsonRpcProvider(
  //   "https://alien-floral-bridge.blast-sepolia.quiknode.pro/b9928ea9dfe1cf85d7fb3127d10384f95556ecf3/"
  // );

  // ConnectWallet function
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); // connect wallet
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xa0c71fd",
            rpcUrls: ["https://sepolia.blast.io"],
            chainName: "Blast Sepolia",
            nativeCurrency: {
              name: "BlastETH",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.blastscan.io"],
          },
        ],
      });
      setWalletAddress(account);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    // It will prompt user for account connections if it isnt connected
    const signer = await provider.getSigner();
    // creating an instance of the broker contract for the FE to interact with (will be set in the common state variables in the Wallet Context)
    setBrokerContract(
      new ethers.Contract(brokerContractAddress, brokerAbi, signer)
    );
    // setTokenContract(
    //   new ethers.Contract(tokenContractAddress, tokenAbi, signer)
    // );
    console.log("Account:", await signer.getAddress());
  };

  const disConnectWallet = async () => {
    setWalletAddress(null);
    // setProvider(null);
    console.log("disconnected");
    setEthDeposited("");
    // setHomeState(true);
    // setSelectedWeather(null); // so that the current weather will not be selected
  };

  return (
    <div className="navbar">
      <img
        src="./treehoppers.png"
        alt="treehoppers"
        className="navbarLogoLeft"
      />
      <Link href={"/"} className="navbarLeft">
        Stake
      </Link>
      <Link href={"/Play"} className="navbarLeft">
        Play
      </Link>
      <div className="navbarSpacer" />
      {!walletAddress ? (
        <button className="connectWallet" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <DisconnectWalletDropdown
          walletAddress={walletAddress}
          disConnectWallet={disConnectWallet}
        />
      )}
    </div>
  );
};

export default NavBar;

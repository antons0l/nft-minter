import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import Navbar from "./Navbar";
import CONTRACT_ABI from "./MyNFTContract.json"

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0xa3fb49E553499fD4Aa7657Da243adAE101dB2442";

const MINT_PRICE = 0.01;

function App() {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [nftCount, setNftCount] = useState(0);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);

        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.error("User rejected request to connect with MetaMask.");
        }

        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);

        const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setContract(contractInstance);
      } else {
        console.log("No Ethereum provider detected.");
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const getNftCount = async () => {
      if (contract && accounts[0]) {
        const count = await contract.methods.balanceOf(accounts[0]).call();
        setNftCount(count);
      }
    };

    getNftCount();
  }, [contract, accounts]);

  const mintNFTs = async () => {
    if (contract && accounts[0]) {
      try {
        const mintPriceWei = Web3.utils.toWei((MINT_PRICE).toString(), "ether");
        await contract.methods.mint().send({ from: accounts[0], value: mintPriceWei });
        const updatedCount = await contract.methods.balanceOf(accounts[0]).call();
        setNftCount(updatedCount);
      } catch (error) {
        console.error("Error minting NFTs:", error);
      }
    }
  };

  const renderNFTImages = () => {
    const nftImages = [];
    for (let i = 1; i <= 10; i++) {
      nftImages.push(
        <img
          key={i}
          src={`./images/${i}.jpg`}
          alt={`NFT ${i}`}
          width="100"
          style={{ margin: "10px" }}
        />
      );
    }
    return nftImages;
  };

  return (
    <>
      <Navbar userAddress={accounts[0] || ""} />
      <div className="App">
        <h1>Cool Foxez NFT Minter</h1>
        <p>
          Purchase a unique NFT from this collection for <strong>{MINT_PRICE} Ether</strong>.<br />
        </p>
        <button onClick={mintNFTs}>Purchase NFT</button>
        <p>You currently own {nftCount} NFTs from this collection.</p>
        <div>
          <h2>Available NFTs</h2>
          <div className="Images">{renderNFTImages()}</div>
        </div>
      </div>
    </>
  );
}

export default App;
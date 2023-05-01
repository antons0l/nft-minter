# NFT minter app

This project is a simple demo of an NFT mint web3 application.

![](screenshot.gif)

## How to create a similar project from scratch

### Part 1: smart contract
1. Run ```npm install -g truffle```
2. Install Ganache application on your machine
3. Run ```truffle init``` to create an empty truffle app
4. Run ```npm install @openzeppelin/contracts```
5. Create a mintable NFT smart contract inside the contracts folder
6. Update the network properties in truffle-config.js file
7. Run ```truffle compile``` to compile the project
8. Create a deployment script in the migrations folder
8. Run ```truffle migrate``` to deploy the smart contract on Ganache

### Part 2: web portal
1. Run ```npx create-react-app nft-minter-frontend``` to create the web portal that users can interact with the smart contract.
2. Run ```npm install web3 react-bootstrap bootstrap``` to install dependencies
3. Add the code to interact with the smart contract using web3 library






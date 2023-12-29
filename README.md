Hey!

Follow the steps below to download, install, and run this project.

## Dependencies
Install these prerequisites before cloning the project.
- NPM: https://nodejs.org
- Hardhat: https://hardhat.org/
- EthersJs: https://ethers.org/
- Tailwind CSS: https://tailwindcss.com/


## Step 1. Clone the project
`git clone https://github.com/AnjaneyaD12/MetaMint-NFT-`

## Step 2. Install dependencies
```sh
$ yarn install # or npm install
```
## Step 3. Start Hardhat Node
Open the terminal and run the command below.
```sh
$ yarn hardhat node
```
## Step 4. Add a hardhat localhost network to your metamask. You will get the RPC URL when you run the node. Enter chainId as 31337 (for hardhat) and save it.

## Step 5. Deploy the smart contract on the network. Open the termminal and run the command below
```sh
$ yarn hardhat run scripts/deploy.js --network <SAVED NETWORK NAME>
```

## Step 6. Run the Front End Application
`$ yarn start`
Visit this URL in your browser: http://localhost:3000

## Preview 
https://metamint-nft-dapp.netlify.app/

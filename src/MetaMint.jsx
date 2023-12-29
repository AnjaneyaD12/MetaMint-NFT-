//Basically, a contract interface to communicate with the contract and frontend using GlobalState and ethers.js

import abi from './abis/src/contracts/MetaMint.sol/MetaMint.json'
import address from './abis/contractAddress.json'
import { getGlobalState, setGlobalState } from './store'
import { ethers } from 'ethers'

const {ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`

const getEthereumContract = () => {
    const connectedAccount = getGlobalState('connectedAccount')
    if(connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        return contract
    }
    else {
        return getGlobalState("contract")
    }
}

const isWallectConnected = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        
        //reload the browser if a network is changed
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload()
          })

        //set the newly connected account if the connected account is changed  
        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedAccount', accounts[0])
            await isWallectConnected()
        })

        //If at least one account is returned set that as connected account
        if(accounts.length) {
            setGlobalState('connectedAccount', accounts[0])
        } else {
            alert('Please connect wallet.')
            console.log('No accounts found.')
        }
    } catch (error) {
        reportError()
    }
}

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0])
    } catch (error) {
        reportError(error)
    }
}

const payToMint = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const connectedAccount = getGlobalState('connectedAccount')
      const contract = getEthereumContract()
      const amount = ethers.utils.parseEther('0.001')
   
      await contract.payToMint({
        from: connectedAccount,
        value: amount._hex,
    })
   
      window.location.reload()
    } catch (error) {
        reportError(error)
    }
}

//Function to load all the nfts
const loadNfts = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
   
      const contract = getEthereumContract()
      const nfts = await contract.getAllNFTs()
      
      console.log(structuredNfts(nfts))
      setGlobalState('nfts', structuredNfts(nfts))
    } catch (error) {
      reportError(error)
    }
}

//Usually the returned array of nfts is not arranged. So we restructure it
const structuredNfts = (nfts) =>
nfts
   .map((nft) => ({
     id: Number(nft.id),
     url: opensea_uri + nft.id,
     buyer: nft.buyer,
     imageURL: nft.imageURL,
     cost: parseInt(nft.cost._hex) / 10 ** 18,
     timestamp: new Date(nft.timestamp.toNumber()).getTime(),
   }))
   .reverse()

const reportError = (error) => {
    console.log(error.message)
    throw new Error('No ethereum object.')
}

export{
    isWallectConnected,
    connectWallet,
    payToMint,
    loadNfts
}



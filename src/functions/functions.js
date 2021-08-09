import escrow from '../contracts/CustomisedEscrow.json'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';


const provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/")

const web3 = new Web3(provider)

const contract = new web3.eth.Contract(
  escrow.abi,
  '0x8F534430DD986130D86DaCB78DF3BA5B0274C8Fe'
)

const ethereum = window.ethereum
// These function should be called in the DashBoard Page

export async function createEscrow(sellerAddress,amt,timeInDays) {
    try {
        if (typeof ethereum !== "undefined" && ethereum !== "") {
          const tx = contract.methods.createEscrowBNB(sellerAddress,amt,timeInDays).encodeABI()
          const transactionParameters = {
            to: "0x8F534430DD986130D86DaCB78DF3BA5B0274C8Fe",
            from: ethereum.selectedAddress,
            value:'0x'+parseInt(amt).toString(16),
            data: tx,
          }
          const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
        } else {
          console.log("Please install MetaMask!")
        }
      } catch (e) {
        console.log(e.message)
      }
}

export async function sellerConfirmation(id) {
    try {
        if (typeof ethereum !== "undefined" && ethereum !== "") {
          const tx = contract.methods.updateSellerStatus(id).encodeABI()
          const transactionParameters = {
            to: "0x8F534430DD986130D86DaCB78DF3BA5B0274C8Fe",
            from: ethereum.selectedAddress,
            data: tx,
          }
          const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
        } else {
          console.log("Please install MetaMask!")
        }
      } catch (e) {
        console.log(e.message)
    }
}

export async function buyerConfirmation(id) {   
    try {
        if (typeof ethereum !== "undefined" && ethereum !== "") {
          const tx = contract.methods.updateDelivery(id).encodeABI()
          const transactionParameters = {
            to: "0x8F534430DD986130D86DaCB78DF3BA5B0274C8Fe",
            from: ethereum.selectedAddress,
            data: tx,
          }
          const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
        } else {
          console.log("Please install MetaMask!")
        }
      } catch (e) {
        console.log(e.message)
    }
}
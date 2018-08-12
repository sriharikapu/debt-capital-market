import Dharma from '@dharmaprotocol/dharma.js'
import BigNumber from 'bignumber.js'
import web3Utils from 'web3-utils'

const dharma = new Dharma('https://kovan.infura.io/RNXFMnEXo6TEeIYzcTyQ')

const fillOrder = async (body) => {
    const {
        signature,
        orderData,
        creditorAddress,
    } = body

    // check for valid signatures
    orderData.creditor = creditorAddress
    orderData.creditorSignature = signature

    const txData = { from: $(process.env.ETH_ADDRESS) }
    const tx = {
        txHash: await dharma.order.fillAscync(orderData, txData)
    }

   return tx 
}
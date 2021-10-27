import { EthI, web3 } from "./ethereum";
import ethers from "ethers";

export interface ChainYieldI {
    provider : ethers.providers.Web3Provider,
    user : ethers.ethers.providers.JsonRpcSigner,
}

export const loadChain = (ethereum : any) : ChainYieldI=>{

    ethereum.on('chainChanged', (_chainId) => window.location.reload());
    const provider =  new ethers.providers.Web3Provider(ethereum, 'any');
    const user = provider.getSigner();
  
    return {
        provider : provider,
        user : user
    }

}
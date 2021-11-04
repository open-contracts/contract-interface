import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum : ethers.providers.ExternalProvider
    }
}

export const initEthereum = async () : Promise<ethers.providers.Web3Provider>=>{

    const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
    )

    window.ethereum.request && window.ethereum.request({method : "eth_requestAccounts"});
    
    return provider;

}
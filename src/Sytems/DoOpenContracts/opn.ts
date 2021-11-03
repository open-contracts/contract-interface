import { ethers } from "ethers";
import { OpenContractsInterfaceI } from "./OpenContractsInterface";

export interface OpnTokenI extends ethers.Contract{
    gimmeSomeMoreOfDemCoins():Promise<void>,
    approve(address : string, amountOpn : number):Promise<void>
}

/**
 * Creates an OpnTokenContract.
 * @param ocInterface 
 * @param network 
 * @param provider 
 * @returns 
 */
export const OpnTokenContract = (
    ocInterface : OpenContractsInterfaceI, 
    network : keyof OpenContractsInterfaceI,
    provider : ethers.providers.Web3Provider
)  =>{
    return new ethers.Contract(
        ocInterface[network].token.address, 
        ocInterface[network].token.abi,
        provider
    )
}

/**
 * Creates an OPNTokenContract and connects it to the user
 * @param ocInterface is the OpenContractsInterface. 
 * @param network is a key representing a possible network specified in the Open Contracts interface.
 * @param provider is a Web3Provider.
 * @param user is a signer.
 * @returns 
 */
export const OpnToken = (
    ocInterface : OpenContractsInterfaceI, 
    network : keyof OpenContractsInterfaceI,
    provider : ethers.providers.Web3Provider,
    user : ethers.providers.JsonRpcSigner
) : OpnTokenI=>{
    return OpnTokenContract(
        ocInterface,
        network,
        provider
    ).connect(user) as OpnTokenI;
}

/**
 * Creates an OpnForwarderContract.
 * @param ocInterface 
 * @param network 
 * @param provider 
 * @returns 
 */
export const OpnForwarderContract = (
    ocInterface : OpenContractsInterfaceI, 
    network : keyof OpenContractsInterfaceI,
    provider : ethers.providers.Web3Provider,
)=>{

    return new ethers.Contract(
        ocInterface[network].forwarder.address,
        ocInterface[network].forwarder.abi,
        provider
    )

}

/**
 * Creates an OpnForwarderContract and connects it to the user.
 * @param ocInterface 
 * @param network 
 * @param provider 
 * @param user 
 * @returns 
 */
export const OpnForwarder = (
    ocInterface : OpenContractsInterfaceI, 
    network : keyof OpenContractsInterfaceI,
    provider : ethers.providers.Web3Provider,
    user : ethers.providers.JsonRpcSigner
)=>{

    return OpnForwarderContract(
        ocInterface,
        network,
        provider
    ).connect(user);

}

/**
 * Creates an OpnHubContract.
 * @param ocInterface 
 * @param network 
 * @param provider 
 * @returns 
 */
export const OpnHubContract = (
    ocInterface : OpenContractsInterfaceI, 
    network : keyof OpenContractsInterfaceI,
    provider : ethers.providers.Web3Provider,
)=>{
    return new ethers.Contract(
        ocInterface[network].hub.address,
        ocInterface[network].hub.abi,
        provider
    )
}

/**
 * Creates an OpnHubContract and connects it to the user.
 * @param ocInterface 
 * @param network 
 * @param provider 
 * @param user 
 * @returns 
 */
export const OpnHub = (
    ocInterface : OpenContractsInterfaceI, 
    network : keyof OpenContractsInterfaceI,
    provider : ethers.providers.Web3Provider,
    user : ethers.providers.JsonRpcSigner
)=>{
    return OpnHubContract(
        ocInterface,
        network,
        provider
    ).connect(user);
}

/**
 * Gets more OPN tokens and adds them to user's wallet.
 * @param opnToken 
 */
export const getOpnTokens = async (opnToken : OpnTokenI)=>{
    await opnToken.gimmeSomeMoreOfDemCoins();
}

/**
 * Approves hub access to user token.
 * @param opnToken 
 * @param opnHub 
 * @param amountOpn 
 */
export const allowHub = async (
    opnToken : OpnTokenI, 
    opnHub : OpnTokenI,
    amountOpn : number
)=>{
    await opnToken.approve(opnHub.address, amountOpn);
}
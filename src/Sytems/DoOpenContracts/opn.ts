import { ethers } from "ethers";
import { OpenContractsInterfaceI } from "./OpenContractsInterface";

export interface OpnTokenI extends ethers.Contract{
    gimmeSomeMoreOfDemCoins():Promise<void>,
    approve(address : string, amountOpn : number):Promise<void>
}

export interface OpnHubI extends ethers.Contract{
    registryIpList(count : number):Promise<string>
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
) : OpnTokenI=>{
    return OpnTokenContract(
        ocInterface,
        network,
        provider
    ).connect(provider.getSigner()) as OpnTokenI;
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
)=>{

    return OpnForwarderContract(
        ocInterface,
        network,
        provider
    ).connect(provider.getSigner());

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
) : OpnHubI=>{
    return new ethers.Contract(
        ocInterface[network].hub.address,
        ocInterface[network].hub.abi,
        provider
    ) as OpnHubI
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
) : OpnHubI=>{
    return OpnHubContract(
        ocInterface,
        network,
        provider
    ).connect(provider.getSigner()) as OpnHubI;
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
    opnHub : OpnHubI,
    amountOpn : number
)=>{
    await opnToken.approve(opnHub.address, amountOpn);
}

/**
 * Converts a hex string to an array of int.
 * @param hexString 
 * @returns 
 */
export const hexStringToArray = (hexString : string)=>{

    const pairs = hexString.match(/[\dA-F]{2}/gi);
    const integers = pairs ? pairs.map(function(s) {return parseInt(s, 16);}) : [];
    return new Uint8Array(integers);

}

/**
 * Gets the ip for the registry.
 * @param opnHub 
 * @returns 
 */
export const getRegistryIp = async (
    opnHub : OpnHubI
) : Promise<string>=>{

    console.log(opnHub.address);

    console.log(hexStringToArray(await opnHub.registryIpList(3)));

    return hexStringToArray(await opnHub.registryIpList(0)).join(".");
}
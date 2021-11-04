import { ethers } from "ethers"
import { OpenContractInterfaceI } from "./OpenContractInterface"

export interface FNameI {
    value : string
}

export const RawOpenContract = (
    ocInterface : OpenContractInterfaceI,
    provider : ethers.providers.Web3Provider
)=>{

    return new ethers.Contract(
        ocInterface.address,
        ocInterface.abi,
        provider
    )

} 

/**
 * 
 * @param ocInterface 
 * @param provider 
 * @param user 
 * @returns 
 */
export const OpenContract = (
    ocInterface : OpenContractInterfaceI,
    provider :ethers.providers.Web3Provider,
    user : ethers.providers.JsonRpcSigner
)=>{

    return RawOpenContract(
        ocInterface,
        provider
    ).connect(user);

}

export const getOracleDir = (
    dir : string
)=>{
    
}

/**
 * Calls an oracl function.
 * @param fname 
 * @param contract 
 * @param args 
 * @returns 
 */
export const callOracleFunction = async <A extends any[], R>(
    fname : FNameI,
    contract : ethers.Contract,
    args : A
) : Promise<R> =>{

    return await contract.functions[fname.value].apply(this, args) as R;

}
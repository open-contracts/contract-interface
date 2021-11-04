import { getFileText } from "../Octokit"

export interface OpenContractsInterfaceI {
    ropsten: RopstenI;
}

export interface RopstenI {
    token:     TokenI;
    forwarder: ForwarderI;
    hub:       ForwarderI;
}

export interface ForwarderI {
    address: string;
    abi:     ForwarderAbiI[];
}

export interface ForwarderAbiI {
    inputs:          PutI[];
    stateMutAbility: StateMutAbilityE;
    type:            AbiTypeE;
    name?:           string;
    outputs?:        PutI[];
}

export interface PutI {
    internalType: string;
    name:         string;
    type:         InputTypeE;
    indexed?:     boolean;
}

export enum InputTypeE {
    Address = "address",
    Bool = "bool",
    Bytes = "bytes",
    Bytes4 = "bytes4",
    String = "string",
    Uint256 = "uint256",
    Uint8 = "uint8",
}

export enum StateMutAbilityE {
    Nonpayable = "nonpayable",
    Payable = "payable",
    View = "view",
}

export enum AbiTypeE {
    Constructor = "constructor",
    Event = "event",
    Function = "function",
}

export interface TokenI {
    address: string;
    abi:     TokenAbi[];
}

export interface TokenAbi {
    inputs:           PutI[];
    stateMutAbility?: StateMutAbilityE;
    type:             AbiTypeE;
    anonymous?:       boolean;
    name?:            string;
    outputs?:         PutI[];
}

/**
 * Fetches the open contracts interace from GitHub.
 * @param protocolRepo
 * @returns 
 */
 export const OpenContractsInterface = async ()
 : Promise<OpenContractsInterfaceI>=>{
     return JSON.parse(
         await getFileText({
             owner : "open-contracts",
             repo : "open-contracts.github.io",
             path : "opencontracts_interface.json"
         })
     )
 }
/// <reference types="react-scripts" />

function hexStringtoArray(hexString : string) : number[];
function b64Url2Buff(b64urlstring : string) : Buffer;

async function extractContentIfValid(attestationData : any);

async function githubOracleDownloader(
    user : string,
    repo : string,
    ref : string,
    dir : string
) : Promise<{
    [key : string] : string
}>

import { ethers } from "ethers";
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

export interface OpenContractInterfaceI {
    name:                 string;
    network:              string;
    address:              string;
    onlyDisplayAnnotated: boolean;
    abi:                  AbiI[];
}

export interface AbiI {
    inputs:          PutI[];
    name:            string;
    outputs:         PutI[];
    stateMutability: string;
    type:            string;
    annotation?:     string;
    description?:    string;
    oracle_folder?:  string;
}

export interface PutI {
    internalType: string;
    name:         string;
    type:         string;
}


export interface ContractFunction {
    name : string,
    description : string,
    stateMutability : string,
    oracleFolder ? : string,
    requiresOracle ? : boolean,
    inputs : any [],
    oracleData ? : {
        [key : string] : string
    }
}

export interface OpenContracts {
    
    parseContracts(
        ocInterface : OpenContractsInterfaceI,
        contractInterface : OpenContractInterfaceI
    ) : void

    OPNtoken : ethers.Contract,
    OPNhub : ethers.Contract,
    OPNforwarder : ethers.Contract,

    contract : ethers.Contract,
    contractFunctions : Function[],



}
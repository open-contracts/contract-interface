/// <reference types="react-scripts" />

import {ethers} from "ethers";
import {DappPutI} from  "./Items/DappPut/DappPutType";

export class ClientError extends Error {
    
}

declare global {
    interface Window {
        ethereum : ethers.providers.ExternalProvider
        hexStringtoArray(hexString : string) : number[];
        b64Url2Buff(b64urlstring : string) : Buffer;
        githubOracleDownloader(user : string, repo : string, ref : string, folder : OpenContractFunctionI["oracleFolder"]):Promise<any>;

        extractContentIfValid(attestationData : any) : Promise<void>;

        githubOracleDownloader(
            user : string,
            repo : string,
            ref : string,
            dir : string
        ) : Promise<{
            [key : string] : string
        }>

        OpenContracts() : Promise<OpenContractI>
    }
    
    interface OpenContractsInterfaceI {
        ropsten: RopstenI;
    }
    
    interface RopstenI {
        token:     TokenI;
        forwarder: ForwarderI;
        hub:       ForwarderI;
    }
    
    interface ForwarderI {
        address: string;
        abi:     ForwarderAbiI[];
    }
    
    interface ForwarderAbiI {
        inputs:          PutI[];
        stateMutAbility: StateMutAbilityE;
        type:            AbiTypeE;
        name?:           string;
        outputs?:        PutI[];
    }
    
    interface PutI {
        internalType ? : string;
        name :         string;
        type ? :         string;
        indexed?:     boolean;
    }
    
    enum InputTypeE {
        Address = "address",
        Bool = "bool",
        Bytes = "bytes",
        Bytes4 = "bytes4",
        String = "string",
        Uint256 = "uint256",
        Uint8 = "uint8",
    }
    
    enum StateMutAbilityE {
        Nonpayable = "nonpayable",
        Payable = "payable",
        View = "view",
    }
    
    enum AbiTypeE {
        Constructor = "constructor",
        Event = "event",
        Function = "function",
    }
    
    interface TokenI {
        address: string;
        abi:     TokenAbi[];
    }
    
    interface TokenAbi {
        inputs:           PutI[];
        stateMutAbility?: StateMutAbilityE;
        type:             AbiTypeE;
        anonymous?:       boolean;
        name?:            string;
        outputs?:         PutI[];
    }
    
    interface OpenContractInterfaceI {
        name:                 string;
        network:              string;
        address:              string;
        onlyDisplayAnnotated: boolean;
        abi:                  AbiI[];
    }
    
    interface AbiI {
        inputs:          PutI[];
        name:            string;
        outputs:         PutI[];
        stateMutability: string;
        type:            string;
        annotation?:     string;
        description?:    string;
        oracle_folder?:  string;
    }
    
    interface PutI {
        internalType ? : string;
        name:         string;
        type ?:         string;
        value ? :        string;
    }
    
    interface OpnTokenI extends ethers.Contract{
        getOPN() : Promise<void>
    }
    
    interface OpenContractFunctionI {
        name : string,
        oraclePromiseResolve ? : (val : {
            [key : string] : string
        })=>void,
        oraclePromiseReject ? : ()=>void
        description : string,
        stateMutability : string,
        oracleFolder ? : string,
        requiresOracle ? : boolean,
        puts ? : DappPutI[],
        inputs : PutI[],
        errors ? : any[],
        prints ? : any[],
        xpras ? : any[],
        submits ? : any[],
        result ? : any, 
        oracleInputs ? : {
            [key : string] : {
                prompt : string,
                id : string,
                response ? : string
            }
        },
        oracleData ? : {
            [key : string] : string | Promise<string>
        },
        call : (state  ? : OpenContractFunctionI)=>Promise<any>,
        callOracle ? : ()=>Promise<void>,
        submitHandler : (call : ()=>Promise<void>)=>Promise<any>,
        xpraHandler : (targetUrl : string, sessionUrl : string, xpraExit : Promise<any>)=>Promise<any>,
        inputHandler : (message : string)=>Promise<any>,
        printHandler : (message : string)=>Promise<any>
        errorHandler : (e : Error)=>Promise<any>
    }


    interface OpenContractI {
        
        parseContracts(
            ocInterface : OpenContractsInterfaceI,
            contractInterface : OpenContractInterfaceI
        ) : void
            
        contractName : string,
        contractDescription : string,

        OPNtoken : OpnTokenI,
        OPNhub : ethers.Contract,
        OPNforwarder : ethers.Contract,
    
        contract : ethers.Contract,
        contractFunctions : OpenContractFunctionI[],
    
    }
    
}
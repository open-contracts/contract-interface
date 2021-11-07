/// <reference types="react-scripts" />

import {ether, ethers} from "ethers";


declare global {
    interface Window {
        ethereum : ethers.providers.ExternalProvider
        hexStringtoArray(hexString : string) : number[];
        b64Url2Buff(b64urlstring : string) : Buffer;
        async githubOracleDownloader(user : string, repo : string, ref : string, folder : OpenContractFunctionI["oracleFolder"])

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
        name ?:         string;
        type ? :         InputTypeE;
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
        async gimmeSomeMoreOfDemCoins()
    }
    
    interface OpenContractFunctionI {
        name : string,
        description : string,
        stateMutability : string,
        oracleFolder ? : string,
        requiresOracle ? : boolean,
        inputs : PutI[],
        errors ? : any[],
        prints ? : any[],
        xpras ? : any[],
        submits ? : any[]
        oracleData ? : {
            [key : string] : string
        },
        call : (state  ? : OracleContractFunctionI)=>Promise<any>,
        submitHandler : (submit : string)=>Promise<any>,
        xpraHandler : (targetUrl : string, sessionUrl : string, xpraExit : promise)=>Promise<any>,
        inputHandler : (message : string)=>Promise<any>,
        printHandler : (message : string)=>Promise<any>
        errorHandler : (message : string)=>Promise<any>
    }
    
    interface OpenContractI {
        
        parseContracts(
            ocInterface : OpenContractsInterfaceI,
            contractInterface : OpenContractInterfaceI
        ) : void
    
        OPNtoken : OpnTokenI,
        OPNhub : ethers.Contract,
        OPNforwarder : ethers.Contract,
    
        contract : ethers.Contract,
        contractFunctions : OpenContractFunctionI[],
    
    }
    
}
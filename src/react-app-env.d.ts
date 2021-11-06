/// <reference types="react-scripts" />

import {ether} from "ethers";


declare global {
    interface window {
        hexStringtoArray(hexString : string) : number[];
        b64Url2Buff(b64urlstring : string) : Buffer;

        extractContentIfValid(attestationData : any) : Promise<void>;

        githubOracleDownloader(
            user : string,
            repo : string,
            ref : string,
            dir : string
        ) : Promise<{
            [key : string] : string
        }>
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
        internalType: string;
        name:         string;
        type:         InputTypeE;
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
        internalType: string;
        name:         string;
        type:         string;
    }
    
    
    interface OpenContractFunctionI {
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
    
    interface OpenContractsI {
        
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
    
}
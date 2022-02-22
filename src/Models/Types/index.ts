import {DappI} from "../Items"

export interface OpenContractReducer {
    (set : (dapp : DappI)=>DappI) : void
}

export interface OpenContractFunctionReducer {
    (set : (func : OpenContractFunctionI)=>OpenContractFunctionI) : void
}
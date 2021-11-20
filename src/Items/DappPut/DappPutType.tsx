import { reduceContractFunctionI } from "../DappFunction/StateMethods";

export interface DappPutI extends PutI {
    name : string, 
    description ? : string,
    value : string,
    type ? : string,
    putType : string,
    contractFunction : OpenContractFunctionI,
    reduceContractFunction : (reducer : reduceContractFunctionI)=>void
}

export interface DappCallputI extends DappPutI {
    call : ()=>Promise<void>,
    putType : "callput"
}

export interface DappDescputI extends DappPutI {
    putType : "description"
}

export interface DappInputI extends DappPutI {
    prompt : string,
    putType : "input"
}

export interface DappOutputI extends DappPutI {
    putType : "output"
}

export interface DappErrputI extends DappPutI {
    resetArgs : (reduceFunctionState : (update : reduceContractFunctionI)=>void)=>void,
    putType : "error"
}

export interface DappInteractputI extends DappPutI {
    targetUrl : string,
    xpraExit : Promise<void>,
    sessionUrl : string,
    putType : "interactive"
}

export interface DappOracleputI extends DappPutI {
    putType : "oracle"
}

export interface DappResultputI extends DappPutI {
    putType : "result"
}

export interface DappOracleInputI extends DappPutI {
    response ? : string,
    resolve : (data : string)=>void,
    reject : (data : string)=>void,
    id : string,
    prompt : string,
    putType : "oracle-input"
}

export interface DappWaitingPutI extends DappPutI {
    duration : number
    type : "waiting"
}
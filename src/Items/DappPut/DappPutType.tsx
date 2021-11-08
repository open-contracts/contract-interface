export interface DappPutI extends PutI {
    name : string, 
    description ? : string,
    value : string,
    type ? : InputTypeE,
    putType : string
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
    putType : "error"
}

export interface DappInteractputI extends DappPutI {
    putType : "interactive"
}

export interface DappOracleputI extends DappPutI {
    contractFunction : OpenContractFunctionI,
    setOracleData : (oracleData : any)=>void
    putType : "oracle"
}

export interface DappResultputI extends DappPutI {
    putType : "result"
}
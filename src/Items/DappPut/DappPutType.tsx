export interface DappPutI {
    name : string, 
    description : string,
    value : string,
    type : string
}

export interface DappInputI extends DappPutI {
    prompt : string,
    type : "input"
}

export interface DappOutputI extends DappPutI {
    type : "output"
}

export interface DappErrputI extends DappPutI {
    type : "error"
}

export interface DappInteractputI extends DappPutI {
    type : "interactive"
}
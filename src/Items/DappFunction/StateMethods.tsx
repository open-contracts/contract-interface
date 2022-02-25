import React, {FC, ReactElement, useReducer} from 'react';
import { DappDescputI, DappOracleInputI, DappErrputI, DappInputI, DappInteractputI, DappOracleputI, DappOutputI, DappPutI, DappResultputI, DappCallputI, DappWaitingPutI } from '../DappPut/DappPutType';

export interface reduceContractFunctionI {
    (state : OpenContractFunctionI) : OpenContractFunctionI
}

export const allPromisesResolved = (obj : any)=>{
    return Object.keys(obj).reduce((agg, key)=>{
        return agg && (typeof obj[key] === "string")
    }, true)
}

export const countPromisesResolved = (obj : any)=>{
    return Object.keys(obj).reduce((agg, key)=>{
        return agg + (typeof obj[key] === "string" ? 1 : 0)
    }, 0)
}

export const createInputs = (
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (func : reduceContractFunctionI)=>void,
) : DappInputI[]=>{
    return contractFunction.inputs.map((input)=>{
        return {
            ...input,
            contractFunction : contractFunction,
            reduceContractFunction : reduceContractFunction,
            putType : "input"
        } as DappInputI
    })
}

export const createErrors = (
    errors : OpenContractFunctionI["errors"], 
    resetArgs : DappErrputI["resetArgs"],
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (func : reduceContractFunctionI)=>void,
) : DappErrputI[]=>{
    return errors ? errors.map((error)=>{

        

        return {
            ...error,
            contractFunction : contractFunction,
            reduceContractFunction : reduceContractFunction,
            putType : "error",
            resetArgs : resetArgs
        }
    }) : []
}

export const createXpras = (
    xpras : OpenContractFunctionI["xpras"],
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (func : reduceContractFunctionI)=>void,
) : DappInteractputI[]=>{
    return xpras ? xpras.map((xpra)=>{
        return {
            ...xpra,
            contractFunction : contractFunction,
            reduceContractFunction : reduceContractFunction,
            putType : "interactive"
        } 
    }) : []
}

export const createOutputs = (
    prints : OpenContractFunctionI["prints"],
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (func : reduceContractFunctionI)=>void,
) : DappOutputI[]=>{
    return prints ? prints.map((print)=>{
        return {
            ...print,
            contractFunction : contractFunction,
            reduceContractFunction : reduceContractFunction,
            putType : "output"
        } 
    }) : []
}

export const createOracleInputs = (
    inputs : OpenContractFunctionI["oracleInputs"],
    contractFunction : OpenContractFunctionI,
    resolve : (message : string)=>void,
    reject : (message : string)=>void,
    reduceContractFunction : (func : reduceContractFunctionI)=>void,
    index : number
) : DappOracleInputI[]=>{
    return inputs ? Object.keys(inputs).map((key, i)=>{
        return {
            ...inputs[key],
            name : index.toString(),
            value : inputs[key].prompt,
            resolve : resolve,
            reject : reject,
            putType : "oracle-input",
            contractFunction : contractFunction,
            reduceContractFunction : reduceContractFunction
        } 
    }) : []
}

export const createOracleData = (
    contractFunction : OpenContractFunctionI,
    setFunc ? : (func : reduceContractFunctionI)=>void
) : DappOracleputI=>{

    return {
        name : "Oracle data",
        contractFunction : contractFunction,
        reduceContractFunction : setFunc,
        putType : "oracle",
    } as DappOracleputI

}

export const createOracleCallPut = (
    call : DappCallputI["call"],
    contractFunction : OpenContractFunctionI,
    setFunc : (func : reduceContractFunctionI)=>void
) : DappCallputI=>{
    return {
        call : call,
        contractFunction : contractFunction,
        reduceContractFunction : setFunc,
        name : contractFunction.name,
        putType : "callput",
        value : ""
    }
}

export const createResult = (
    data : any,
    contractFunction : OpenContractFunctionI,
    setFunc : (func : reduceContractFunctionI)=>void
) : DappResultputI=>{
    
    return {
        contractFunction : contractFunction,
        reduceContractFunction : setFunc,
        name : "Result",
        value : data,
        putType : "result"
    }
}

export const getContractFunctionInputs = (puts : DappPutI[])=>{
    return puts.filter((put)=>{
        return put.putType === "input";
    });
}

export const resetInputs = (inputs : OpenContractFunctionI["inputs"])=>{
    return inputs.map((value)=>{
        return {
            ...value,
            value : undefined
        }
    })
}

export const resetInputPuts = (puts : OpenContractFunctionI["puts"])=>{
    return puts?.map((put)=>{
        return {
            ...put,
            value : put.putType === "input" ? undefined : put.value
        }
    })
}

export const produceUpdatedPuts = (
    puts : OpenContractFunctionI["puts"],
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (func : reduceContractFunctionI)=>void
) : DappPutI[]=>{
    return (puts||[]).map((put)=>{
        return {
            ...put,
            contractFunction : contractFunction,
            reduceContractFunction : reduceContractFunction
        } as DappPutI
    })
}

export const createWaitingPut = (
    seconds : number,
    message : string,
    contractFunction : OpenContractFunctionI,
    setFunc : (func : reduceContractFunctionI)=>void
) : DappWaitingPutI=>{
    return {
        contractFunction : contractFunction,
        reduceContractFunction : setFunc,
        name : contractFunction.name,
        value : message,
        message : message,
        duration : seconds,
        putType : "waiting",
        type : "waiting",
        timeStarted : new Date()
    }
}

export const removeWaitingPut = (
    reduceContractFunction ? : (func : reduceContractFunctionI)=>void
)=>{

    reduceContractFunction&& reduceContractFunction((state)=>{
        return {
            ...state,
            puts : state.puts && state.puts.filter((put)=>{
                return put.putType !== "waiting"
            })
        }
    })

}
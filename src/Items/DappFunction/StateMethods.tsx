import React, {FC, ReactElement, useReducer} from 'react';
import { DappDescputI, DappOracleInputI, DappErrputI, DappInputI, DappInteractputI, DappOracleputI, DappOutputI, DappPutI, DappResultputI } from '../DappPut/DappPutType';

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
        return agg + ((typeof obj[key] === "string" ? 1 : 0) * 1)
    }, 0)
}

export const createInputs = (
    inputs : OpenContractFunctionI["inputs"],
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (func : reduceContractFunctionI)=>void,
) : DappInputI[]=>{
    return inputs.map((input)=>{
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
) : DappOracleInputI[]=>{
    return inputs ? Object.keys(inputs).map((key)=>{
        return {
            ...inputs[key],
            name : inputs[key].prompt,
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

export const createResult = (
    data : any,
    contractFunction : OpenContractFunctionI,
    setFunc : (func : reduceContractFunctionI)=>void
) : DappResultputI=>{
    return {
        contractFunction : contractFunction,
        reduceContractFunction : setFunc,
        name : contractFunction.name,
        value : data,
        putType : "result"
    }
}

/*export const createDescriptionData = (
    contractFunction : OpenContractFunctionI
    ) : DappDescputI[]=>{
    return [
        {
            name : contractFunction.name,
            description : contractFunction.description,
            putType : "description",
            value : contractFunction.name,

        }
    ]
}*/

export const aggregateContractFunctionPuts = (
    contractFunction : OpenContractFunctionI,
)=>{

    return [
       /* ...createInputs(contractFunction),
        ...createErrors(contractFunction),
        ...createXpras(contractFunction),
        ...createOutputs(contractFunction),*/
    ]

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
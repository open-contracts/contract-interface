import React, {FC, ReactElement, useReducer} from 'react';
import { DappDescputI, DappOracleInputI, DappErrputI, DappInputI, DappInteractputI, DappOracleputI, DappOutputI, DappPutI, DappResultputI } from '../DappPut/DappPutType';


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
    setContractFunction ? : (func : OpenContractFunctionI)=>void,
) : DappInputI[]=>{
    return inputs.map((input)=>{
        return {
            ...input,
            contractFunction : contractFunction,
            setContractFunction : setContractFunction,
            putType : "input"
        } as DappInputI
    })
}

export const createErrors = (
    errors : OpenContractFunctionI["errors"], 
    resetArgs : DappErrputI["resetArgs"],
    contractFunction : OpenContractFunctionI,
    setContractFunction ? : (func : OpenContractFunctionI)=>void,
) : DappErrputI[]=>{
    return errors ? errors.map((error)=>{
        return {
            ...error,
            contractFunction : contractFunction,
            setContractFunction : setContractFunction,
            putType : "error",
            resetArgs : resetArgs
        }
    }) : []
}

export const createXpras = (
    xpras : OpenContractFunctionI["xpras"],
    contractFunction : OpenContractFunctionI,
    setContractFunction ? : (func : OpenContractFunctionI)=>void,
) : DappInteractputI[]=>{
    return xpras ? xpras.map((xpra)=>{
        return {
            ...xpra,
            contractFunction : contractFunction,
            setContractFunction : setContractFunction,
            putType : "interactive"
        } 
    }) : []
}

export const createOutputs = (
    prints : OpenContractFunctionI["prints"],
    contractFunction : OpenContractFunctionI,
    setContractFunction ? : (func : OpenContractFunctionI)=>void,
) : DappOutputI[]=>{
    return prints ? prints.map((print)=>{
        return {
            ...print,
            contractFunction : contractFunction,
            setContractFunction : setContractFunction,
            putType : "output"
        } 
    }) : []
}

export const createOracleInputs = (
    inputs : OpenContractFunctionI["oracleInputs"],
    contractFunction : OpenContractFunctionI,
    resolve : (message : string)=>void,
    reject : (message : string)=>void,
    setContractFunction ? : (func : OpenContractFunctionI)=>void,
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
            setContractFunction : setContractFunction
        } 
    }) : []
}

export const createOracleData = (
    contractFunction : OpenContractFunctionI,
    setFunc ? : (func : OpenContractFunctionI)=>void
) : DappOracleputI=>{

    const setOracleData = (
        data : OpenContractFunctionI["oracleData"]
    )=>{
        setFunc && setFunc({
            ...contractFunction,
            oracleData : data,
            oraclePromiseReject : undefined,
            oraclePromiseResolve : undefined
        })
    }

    return {
        name : "Oracle data",
        contractFunction : contractFunction,
        setContractFunction : setFunc,
        putType : "oracle",
    } as DappOracleputI

}

export const createResult = (
    data : any,
    contractFunction : OpenContractFunctionI,
    setFunc ? : (func : OpenContractFunctionI)=>void
) : DappResultputI=>{
    return {
        contractFunction : contractFunction,
        setContractFunction : setFunc,
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
    setContractFunction ? : (func : OpenContractFunctionI)=>void
) : DappPutI[]=>{
    return (puts||[]).map((put)=>{
        return {
            ...put,
            contractFunction : contractFunction,
            setContractFunction : setContractFunction
        } as DappPutI
    })
}
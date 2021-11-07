import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { Play, PlayFill } from 'react-bootstrap-icons';
import { AthenaButton } from '../../Components/Buttons';
import { Colors } from '../../Theme';
import { DappI } from '../Dapp/Dapp';
import { DappInput } from '../DappPut';
import { DappInputI, DappPutI } from '../DappPut/DappPutType';

export interface OpenContractLogStateI {
    log : any[]
}

export type DappFunctionLogAthenaProps = {
    dapp : DappI,
    contractFunction : OpenContractFunctionI,
    setDappFunction ? : (func : OpenContractFunctionI)=>void
}

export const transformToDappPut = (put : OpenContractFunctionI["inputs"] | OpenContractFunctionI["prints"])=>{

}

export const createInputs = (contractFunction : OpenContractFunctionI)=>{
    return contractFunction.inputs.map((input)=>{
        return {
            ...input,
            putType : "input"
        }
    })
}

export const aggregateContractFunctionPuts = (contractFunction : OpenContractFunctionI)=>{

    return [
        ...createInputs(contractFunction),
       /* ...contractFunction.errors ? contractFunction.errors : [],
        ...contractFunction.xpras ? contractFunction.xpras : [],
        ...contractFunction.prints ? contractFunction.prints : []*/
    ]

}

export const getContractFunctionInputs = (puts : DappPutI[])=>{


    return puts.filter((put)=>{
        
        return put.putType === "input";
    })

}

export const DappFunctionLogAthena : FC<DappFunctionLogAthenaProps>  = ({
    dapp,
    contractFunction,
    setDappFunction
}) =>{


    const logState : OpenContractLogStateI = {
        log : aggregateContractFunctionPuts(contractFunction)
    }

    const setPut = (put : DappPutI, index : number)=>{

        logState.log[index] = put;

        setDappFunction && setDappFunction({
            ...contractFunction,
            inputs : getContractFunctionInputs(logState.log)
        })


    }

    const puts = logState.log.map((put, index)=>{

        return (
            <><DappInput setInput={setPut} index={index} dappInput={put}/><br/></>
        )
    })


    return (

        <>
            {puts}
            <AthenaButton 
                style={{
                    width : "100%"
                }}
                primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme} onClick={contractFunction.call}>
                <div style={{
                    fontSize : "24px",
                    display : "flex",
                    alignContent : "center",
                    alignItems : "center",
                    justifyContent : "center",
                    justifyItems : "center"
                }}>
                    {contractFunction.name}&nbsp;<PlayFill/>
                </div>
            </AthenaButton>
        </>

    )

}
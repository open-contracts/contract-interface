import React, {FC, ReactElement, useState} from 'react';
import { AthenaButton } from '../../Components/Buttons';
import { Colors } from '../../Theme';
import { lightenStandard, darkenStandard } from '../DappPut/Methods';

const allPromisesResolved = (obj : any)=>{
    return Object.keys(obj).reduce((agg, key)=>{
        return agg && (typeof obj[key] === "string")
    }, true)
}

export type DappFunctionSubmitStateProps = {
    contractFunction : OpenContractFunctionI,
    call : ()=>Promise<any>,
    loadOracleData : ()=>Promise<{[key : string] : string}>,
}

export const DappFunctionSubmitState : FC<DappFunctionSubmitStateProps>  = ({
    contractFunction,
    call,
    loadOracleData
}) =>{

    const resolved = contractFunction.oracleData && allPromisesResolved(contractFunction.oracleData);

    console.log(
        contractFunction.oracleData, 
        resolved, 
        contractFunction.requiresOracle,
        contractFunction.requiresOracle && !resolved
    );
    
    

    return (

        <div style={{
            display : "flex",
            justifyContent : "right",
            justifyItems : "right",
            fontSize : "18px"
        }}>
            {contractFunction.requiresOracle && <AthenaButton
                action={loadOracleData as unknown as any}
                style={{
                    fontSize : "18px"
                }}
                primaryColor={darkenStandard(Colors.cyan)}
                secondaryColor={"cyan"}>
                Load oracle data        
            </AthenaButton>}
            &emsp;
            <AthenaButton
                style={{
                    fontSize : "18px"
                }}
                action={call}
                disabled={contractFunction.requiresOracle && !resolved}
                primaryColor={Colors.forestEdge}
                secondaryColor={Colors.greenCeramic}
            >
                Call function
            </AthenaButton>
        </div>

    )

}
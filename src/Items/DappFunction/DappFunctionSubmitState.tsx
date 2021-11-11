import React, {FC, ReactElement, useState, useEffect, useReducer} from 'react';
import { AthenaButton } from '../../Components/Buttons';
import { Colors } from '../../Theme';
import { lightenStandard, darkenStandard } from '../DappPut/Methods';
import * as pure from "./StateMethods";


export type DappFunctionSubmitStateProps = {
    contractFunction : OpenContractFunctionI,
    call : ()=>Promise<any>,
    loadOracleData : ()=>Promise<{[key : string] : string}>,
    setFunc ? : (func : OpenContractFunctionI)=>void
}

export const DappFunctionSubmitState : FC<DappFunctionSubmitStateProps>  = ({
    contractFunction,
    call,
    loadOracleData,
    setFunc
}) =>{

    const map = contractFunction.oracleData||{};
    const resolved = pure.allPromisesResolved(map);
    const count = pure.countPromisesResolved(map);
    
    
    

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
                primaryColor={Colors.Maintheme}
                secondaryColor={"white"}>
                {
                    !contractFunction.oracleData ? 
                    <>
                        Load oracle data
                    </>
                    : <>
                        Load{resolved ? "ed" : "ing"} oracle data {count}/{Object.keys(map).length}     
                    </>
                }
            </AthenaButton>}
            &emsp;
            <AthenaButton
                invert
                style={{
                    fontSize : "18px"
                }}
                action={call}
                disabled={contractFunction.requiresOracle && (contractFunction.oracleData === undefined || !resolved)}
                primaryColor={Colors.Maintheme}
                secondaryColor={"white"}
            >
                Call function
            </AthenaButton>
        </div>

    )

}
import React, {FC, ReactElement, useState, useEffect, useReducer} from 'react';
import { AthenaButton } from '../../Components/Buttons';
import { Colors } from '../../Theme';
import { lightenStandard, darkenStandard } from '../DappPut/Methods';
import * as pure from "./StateMethods";


export type DappFunctionSubmitStateProps = {
    contractFunction : OpenContractFunctionI,
    call : ()=>Promise<any>,
    loadOracleData : ()=>Promise<{[key : string] : string}>,
    reduceContractFunction :  (contractFunction : pure.reduceContractFunctionI)=>void
}

export const DappFunctionSubmitState : FC<DappFunctionSubmitStateProps>  = ({
    contractFunction,
    call,
    loadOracleData,
    reduceContractFunction
}) =>{

    const map = contractFunction.oracleData||{};
    const resolved = pure.allPromisesResolved(map);
    const count = pure.countPromisesResolved(map);
    
    const resetLog = ()=>{
        setCalled(false);
        reduceContractFunction((state)=>{
            const _state = {
                ...state,
                // inputs : pure.resetInputs(state.inputs),
                puts : [],
                oracleData : undefined
            }
            
            return _state;
        })
    }
    
    const [called, setCalled] = useState(false);
    const handleCall = async ()=>{
        setCalled(true);
        return await call();
    }

    return (

        <div style={{
            display : "flex",
            justifyContent : "right",
            justifyItems : "right",
            fontSize : "18px",
        }}>
            <AthenaButton
            onClick={resetLog}
            primaryColor={Colors.failedRed}
            secondaryColor={"white"}>
                    Reset
            </AthenaButton>
            &emsp;
            <AthenaButton
            invert
            style={{
                fontSize : "18px"
            }}
            action={handleCall}
            primaryColor={Colors.Maintheme}
            secondaryColor={"white"}>
                Call function
            </AthenaButton>
        </div>

    )

}
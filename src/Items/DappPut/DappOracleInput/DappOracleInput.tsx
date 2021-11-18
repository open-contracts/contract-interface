import React, {FC, ReactElement} from 'react';
import { DappOracleInputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappOracleInputHeader } from './DappOracleInputHeader';
import { DappOracleInputContent } from './DappOracleInputContent';
import { darkenStandard } from '../Methods';
import { reduceContractFunctionI } from '../../DappFunction/StateMethods';

export type DappPutOracleInputProps = {
    style ? : React.CSSProperties
    dappOracleInput : DappOracleInputI,
    contractFunction : OpenContractFunctionI,
    index : number,
    reduceContractFunction ? : (contractFunction : reduceContractFunctionI)=>void
}

export const DappOracleInput : FC<DappPutOracleInputProps>  = ({
    dappOracleInput,
    contractFunction,
    reduceContractFunction,
    index,
    style,
}) =>{

    const setOracleInput = (dappOracleInput : DappOracleInputI)=>{

        reduceContractFunction && reduceContractFunction((contractFunction)=>{
            return {
                ...contractFunction,
                oracleInputs : {
                    ...contractFunction.oracleInputs,
                    [dappOracleInput.id] : dappOracleInput
                }
            }
        });
    }

    return (

        <DappPutLayout style={{
            color : Colors.Maintheme,
            background : "white",
            border : `1px solid ${Colors.Maintheme}`
        }}>
            <DappPutLayout.Header>
                <DappOracleInputHeader dappOracleInput={dappOracleInput}/>
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappOracleInputContent dappOracleInput={dappOracleInput} setOracleInput={setOracleInput}/>
            </DappPutLayout.Content>
        </DappPutLayout>
    )

}
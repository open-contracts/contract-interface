import React, {FC, ReactElement} from 'react';
import {AthenaButton} from "../../../Components/Buttons";
import {Colors} from "../../../Theme";
import { reduceContractFunctionI } from '../../DappFunction/StateMethods';

export type DappOracleCallputProps = {
    call : ()=>Promise<any>,
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (contractFunction : reduceContractFunctionI)=>void
}

export const DappOracleCallput : FC<DappOracleCallputProps>  = ({
    call
}) =>{

    return (

        <AthenaButton 
            action={call}
            primaryColor={Colors.primaryTextColor}
            secondaryColor={Colors.Maintheme}
        >
            Execute oracle
        </AthenaButton>

    )

}
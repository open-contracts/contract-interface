import React, {FC, ReactElement} from 'react';
import {DappI} from "../Dapp"
import { DappFunctionAthena } from '.';

export type DappFunctionLogsProps = {
    dapp : DappI,
    which ? : string
}

export const DappFunctionLogs : FC<DappFunctionLogsProps>  = ({
    dapp,
    which
}) =>{

    const store : {[key : string] : React.ReactNode} = dapp.contract ? dapp.contract.contractFunctions.reduce((agg, func)=>{

        return {
            ...agg,
            [func.name] : <DappFunctionAthena dapp={dapp} contractFunction={func as OpenContractFunctionI}/>
        }

    }, {}) : {};


    return (

        <>
            {which ? store[which] : ""}
        </>

    )

}
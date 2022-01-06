import React, {FC, ReactElement} from 'react';
import {DappI} from "../Dapp";
import { DappFunctionLog } from './DappFunctionLog';

export type DappFunctionAthenaProps = {
    dapp : DappI,
    contractFunction : OpenContractFunctionI,
    setDappFunction ? : (func : OpenContractFunctionI)=>void
}

export const DappFunctionAthena : FC<DappFunctionAthenaProps>  = ({
    dapp,
    contractFunction,
    setDappFunction
}) =>{

    return (

        <DappFunctionLog setFunctionState={setDappFunction} dapp={dapp} contractFunction={contractFunction}/>

    )

}
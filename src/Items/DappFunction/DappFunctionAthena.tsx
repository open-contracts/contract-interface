import React, {FC, ReactElement} from 'react';
import {DappI} from "../Dapp";
import { DappFunctionLogAthena } from './DappFunctionLogAthena';

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

        <DappFunctionLogAthena setDappFunction={setDappFunction} dapp={dapp} contractFunction={contractFunction}/>

    )

}
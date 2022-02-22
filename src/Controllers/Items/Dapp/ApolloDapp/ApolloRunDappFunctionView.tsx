import React, {FC, ReactElement} from 'react';
import { DesktopSizes } from '../../../Theme';
import { OpenContractFunctionReducer } from '../../../Types';
import {DappI} from "../../Dapp";
import { DappFunctionAthena } from '../../DappFunction';

export type ApolloRunDappFunctionViewProps = {
    dapp : DappI,
    setDappFunction : OpenContractFunctionReducer
    contractFunction ? : OpenContractFunctionI
}

export const ApolloRunDappFunctionView : FC<ApolloRunDappFunctionViewProps>  = ({
    dapp,
    setDappFunction,
    contractFunction
}) =>{

    return (

        <div style={{
            padding: DesktopSizes.Padding.standard
        }}>
            {contractFunction && 
                <DappFunctionAthena
                dapp={dapp}
                setDappFunction={setDappFunction}
                contractFunction={contractFunction}/>
            }
            {!contractFunction && <h2>No function selected.</h2>}
        </div>

    )

}
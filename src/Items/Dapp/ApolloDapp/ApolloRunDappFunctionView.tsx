import React, {FC, ReactElement} from 'react';
import { DesktopSizes } from '../../../Theme';
import {DappI} from "../../Dapp";
import { DappFunctionAthena } from '../../DappFunction';

export type ApolloRunDappFunctionViewProps = {
    dapp : DappI,
    setDappFunction : (contractFunction : OpenContractFunctionI)=>void
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
                <>
                    <h3 style={{
                        textAlign : "left"
                    }}>{contractFunction.name}</h3>
                    <p style={{
                        textAlign : "left"
                    }}>
                        {contractFunction.description}
                    </p>
                    <DappFunctionAthena
                        dapp={dapp}
                        setDappFunction={setDappFunction}
                        contractFunction={contractFunction}
                    />
                </>
            }
            {!contractFunction && <h2>No function selected.</h2>}
        </div>

    )

}
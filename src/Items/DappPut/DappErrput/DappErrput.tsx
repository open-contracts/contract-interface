import React, {FC, ReactElement} from 'react';
import { DappErrputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappErrputHeader } from './DappErrputHeader';
import { DappErrputContent } from './DappErrputContent';

export type DappPutErrputProps = {
    style ? : React.CSSProperties
    dappErrput : DappErrputI,
    end ? : boolean,
    contractFunction : OpenContractFunctionI,
    setContractFunction ? : (contractFunction : OpenContractFunctionI)=>void
}

export const DappErrput : FC<DappPutErrputProps>  = ({
    dappErrput,
    style,
    end
}) =>{

    return (

        <DappPutLayout 
        end={end}
        style={{
            background : "white",
            border : `1px solid ${Colors.failedRed}`,
            color : Colors.Maintheme,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappErrputHeader dappErrput={dappErrput}/>
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappErrputContent dappErrput={dappErrput}/>
            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
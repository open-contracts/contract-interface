import React, {FC, ReactElement} from 'react';
import { DappWaitingPutI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappWaitingPutHeader } from './DappWaitingPutHeader';
import { DappWaitingPutContent } from './DappWaitingPutContent';
import { darkenStandard } from '../Methods';
import { reduceContractFunctionI } from '../../DappFunction/StateMethods';

export type DappPutWaitingPutProps = {
    style ? : React.CSSProperties
    dappWaitingPut : DappWaitingPutI,
    setInput ? : (input : DappWaitingPutI)=>void,
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (contractFunction : reduceContractFunctionI)=>void
}

export const DappWaitingPut : FC<DappPutWaitingPutProps>  = ({
    dappWaitingPut,
    style,
    setInput
}) =>{

    return (

        <DappPutLayout style={{
            background : "white",
        }}>
            <DappPutLayout.Header>
                <DappWaitingPutHeader
                    dappWaitingPut={dappWaitingPut}
                />
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappWaitingPutContent
                    dappWaitingPut={dappWaitingPut}
                />
            </DappPutLayout.Content>
        </DappPutLayout>
    )

}
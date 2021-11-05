import React, {FC, ReactElement} from 'react';
import { DappErrputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";

export type DappPutErrputProps = {
    style ? : React.CSSProperties
    dappErrput : DappErrputI
}

export const DappPutErrput : FC<DappPutErrputProps>  = ({
    style
}) =>{

    return (

        <DappPutLayout style={{
            background : Colors.deepMaroon,
            border : `1px solid ${Colors.failedRed}`,
            ...style
        }}>
            <DappPutLayout.Header>

            </DappPutLayout.Header>
            <DappPutLayout.Content>

            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
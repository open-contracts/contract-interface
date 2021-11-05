import React, {FC, ReactElement} from 'react';
import { DappOutputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";

export type DappPutOutputProps = {
    style ? : React.CSSProperties
    dappOutput : DappOutputI
}

export const DappPutOutput : FC<DappPutOutputProps>  = ({
    style
}) =>{

    return (

        <DappPutLayout style={{
            background : Colors.deepBlue,
            border : `1px solid ${Colors.royalBlue}`,
            ...style
        }}>
            <DappPutLayout.Header>

            </DappPutLayout.Header>
            <DappPutLayout.Content>

            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
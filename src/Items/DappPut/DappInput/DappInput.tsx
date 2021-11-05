import React, {FC, ReactElement} from 'react';
import { DappInputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappInputHeader } from './DappInputHeader';
import { DappInputContent } from './DappInputContent';
import { darkenStandard } from '../Methods';

export type DappPutInputProps = {
    style ? : React.CSSProperties
    dappInput : DappInputI
}

export const DappInput : FC<DappPutInputProps>  = ({
    dappInput,
    style
}) =>{

    return (

        <DappPutLayout style={{
            background : Colors.forestGreen,
            border : `1px solid ${Colors.forestEdge}`,
            color : Colors.primaryTextColor,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappInputHeader dappInput={dappInput} />
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappInputContent dappInput={dappInput}/>
            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
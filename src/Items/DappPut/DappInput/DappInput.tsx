import React, {FC, ReactElement} from 'react';
import { DappInputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappInputHeader } from './DappInputHeader';
import { DappInputContent } from './DappInputContent';
import { darkenStandard } from '../Methods';

export type DappPutInputProps = {
    style ? : React.CSSProperties
    dappInput : DappInputI,
    setInput ? : (input : DappInputI)=>void,
}

export const DappInput : FC<DappPutInputProps>  = ({
    dappInput,
    style,
    setInput
}) =>{

    return (

        <DappPutLayout style={{
            background : Colors.greenCeramic,
            border : `1px solid ${darkenStandard(Colors.greenCeramic)}`,
            color : Colors.primaryTextColor,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappInputHeader dappInput={dappInput} />
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappInputContent setInput={setInput} dappInput={dappInput}/>
            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
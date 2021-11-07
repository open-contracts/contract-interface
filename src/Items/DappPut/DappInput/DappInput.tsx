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
    setInput ? : (input : DappInputI, index : number)=>void,
    index  : number
}

export const DappInput : FC<DappPutInputProps>  = ({
    dappInput,
    style,
    index,
    setInput
}) =>{

    const handleSetInput = (dappInput : DappInputI)=>{
        setInput && setInput(dappInput, index);
    }

    return (

        <DappPutLayout style={{
            background : Colors.forestGreen,
            border : `1px solid ${darkenStandard(Colors.forestGreen)}`,
            color : Colors.primaryTextColor,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappInputHeader dappInput={dappInput} />
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappInputContent setInput={handleSetInput} dappInput={dappInput}/>
            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
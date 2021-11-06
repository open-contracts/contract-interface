import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import { DappOutputI } from '../DappPutType';

export type DappOutputContentProps = {
    dappOutput : DappOutputI
}

export const DappOutputContent : FC<DappOutputContentProps>  = ({
    dappOutput
}) =>{

    return (

        <div style={{
            color : Colors.primaryTextColor
        }}>
            {dappOutput.value}
        </div>

    )

}
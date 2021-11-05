import React, {FC, ReactElement} from 'react';
import { DappInteractputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappInteractputHeader } from './DappInteractputHeader';

export type DappPutInteractputProps = {
    style ? : React.CSSProperties
    dappInteractput : DappInteractputI
}

export const DappPutInteractput : FC<DappPutInteractputProps>  = ({
    dappInteractput,
    style
}) =>{

    return (

        <DappPutLayout style={{
            background : Colors.deepPurple,
            border : `1px solid ${Colors.lilac}`,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappInteractputHeader dappInteractput={dappInteractput}/>
            </DappPutLayout.Header>
            <DappPutLayout.Content>

            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
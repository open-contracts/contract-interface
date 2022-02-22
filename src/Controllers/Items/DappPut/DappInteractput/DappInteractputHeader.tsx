import React, {FC, ReactElement} from 'react';
import { DappInteractputI } from '../DappPutType';
import { DefaultHeader } from '../Standards';
import { HandIndexFill } from 'react-bootstrap-icons';
import { Colors } from '../../../Theme';

export type DappInteractputHeaderProps = {
    dappInteractput : DappInteractputI
}

export const DappInteractputHeader : FC<DappInteractputHeaderProps>  = ({
    dappInteractput
}) =>{

    return (

        <DefaultHeader 
            style={{
                color : Colors.lilac
            }}
            dappPut={dappInteractput}>
            <DefaultHeader.Pre>
                <HandIndexFill size={18}/>
            </DefaultHeader.Pre>
        </DefaultHeader>

    )

}
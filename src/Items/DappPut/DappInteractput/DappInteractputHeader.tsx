import React, {FC, ReactElement} from 'react';
import { DappInteractputI } from '../DappPutType';
import { DefaultHeader } from '../Standards';
import { HandIndexFill } from 'react-bootstrap-icons';

export type DappInteractputHeaderProps = {
    dappInteractput : DappInteractputI
}

export const DappInteractputHeader : FC<DappInteractputHeaderProps>  = ({
    dappInteractput
}) =>{

    return (

        <DefaultHeader dappPut={dappInteractput}>
            <DefaultHeader.Icon>
                <HandIndexFill size={18}/>
            </DefaultHeader.Icon>
        </DefaultHeader>

    )

}
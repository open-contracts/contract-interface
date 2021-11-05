import React, {FC, ReactElement} from 'react';
import { DappInteractputI } from '../DappPutType';
import { DefaultHeader } from '../Standards';

export type DappInteractputHeaderProps = {
    dappInteractput : DappInteractputI
}

export const DappInteractputHeader : FC<DappInteractputHeaderProps>  = ({
    dappInteractput
}) =>{

    return (

        <DefaultHeader dappPut={dappInteractput}/>

    )

}
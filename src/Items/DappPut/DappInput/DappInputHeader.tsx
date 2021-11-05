import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import { DappInputI } from '../DappPutType';
import {DefaultHeader} from "../Standards";

export type DappInputHeaderProps = {
    dappInput : DappInputI
}

export const DappInputHeader : FC<DappInputHeaderProps>  = ({
    dappInput
}) =>{

    return (

        <DefaultHeader dappPut={dappInput}>
            <DefaultHeader.Icon>
                𝑥
            </DefaultHeader.Icon>
        </DefaultHeader>

    )

}
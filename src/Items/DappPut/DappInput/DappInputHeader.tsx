import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import { DappInputI } from '../DappPutType';
import {DefaultHeader} from "../Standards";

export type DappInputHeaderProps = {
    dappInput : DappInputI,
}

export const DappInputHeader : FC<DappInputHeaderProps>  = ({
    dappInput
}) =>{

    return (

        <DefaultHeader dappPut={dappInput} style={{
            color : Colors.babyBlue
        }}>
            <DefaultHeader.Pre>
                𝑥
            </DefaultHeader.Pre>
            <DefaultHeader.Post>
                &emsp;<i style={{
                    color : Colors.secondaryTextColor
                }}>{dappInput.type}</i>
            </DefaultHeader.Post>
        </DefaultHeader>

    )

}
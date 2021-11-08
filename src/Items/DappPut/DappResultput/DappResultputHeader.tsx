import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import { DappResultputI } from '../DappPutType';
import {DefaultHeader} from "../Standards";

export type DappResultputHeaderProps = {
    style ? : React.CSSProperties
    dappResultput : DappResultputI,
}

export const DappResultputHeader : FC<DappResultputHeaderProps>  = ({
    dappResultput,
    style
}) =>{

    return (

        <DefaultHeader dappPut={dappResultput} style={{
            color : Colors.babyBlue,
            ...style
        }}>
            <DefaultHeader.Pre>
                𝑦      
            </DefaultHeader.Pre>
            <DefaultHeader.Post>
                &emsp;=&emsp;<b style={{
                    color : Colors.Maintheme
                }}>{dappResultput.value||"undefined"}</b>
            </DefaultHeader.Post>
        </DefaultHeader>

    )

}
import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import { DappOracleInputI } from '../DappPutType';
import {DefaultHeader} from "../Standards";

export type DappOracleInputHeaderProps = {
    style ? : React.CSSProperties
    dappOracleInput : DappOracleInputI,
}

export const DappOracleInputHeader : FC<DappOracleInputHeaderProps>  = ({
    dappOracleInput,
    style
}) =>{


    return (

        <DefaultHeader dappPut={dappOracleInput} style={{
            color : Colors.babyBlue,
            ...style
        }}>
            <DefaultHeader.Pre>
                𝑥
            </DefaultHeader.Pre>
            <DefaultHeader.Post>
                &emsp;<i style={{
                    color : Colors.secondaryTextColor
                }}> </i>
            </DefaultHeader.Post>
        </DefaultHeader>

    )

}

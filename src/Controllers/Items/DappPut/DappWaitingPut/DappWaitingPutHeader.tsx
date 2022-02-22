import React, {FC, ReactElement} from 'react';
import { ClockFill } from 'react-bootstrap-icons';
import { Colors } from '../../../Theme';
import { DappWaitingPutI } from '../DappPutType';
import {DefaultHeader} from "../Standards";

export type DappWaitingPutHeaderProps = {
    style ? : React.CSSProperties
    dappWaitingPut : DappWaitingPutI,
}

export const DappWaitingPutHeader : FC<DappWaitingPutHeaderProps>  = ({
    dappWaitingPut,
    style
}) =>{

    return (

        <DefaultHeader dappPut={dappWaitingPut} style={{
            color : Colors.babyBlue,
            ...style
        }}>
            <DefaultHeader.Pre>
                <ClockFill size={16}/>
            </DefaultHeader.Pre>
            <DefaultHeader.Post>
                &emsp;<i style={{
                    color : Colors.secondaryTextColor
                }}>{dappWaitingPut.type}</i>
            </DefaultHeader.Post>
        </DefaultHeader>

    )

}
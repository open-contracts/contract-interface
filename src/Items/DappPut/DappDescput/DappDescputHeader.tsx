import React, {FC, ReactElement} from 'react';
import { DappDescputI } from '../DappPutType';
import { DefaultHeader } from '../Standards/DefaultHeader';
import {ExclamationCircleFill, InfoCircleFill} from "react-bootstrap-icons";
import { Colors } from '../../../Theme';

export type DappDescputHeaderProps = {
    dappDescput : DappDescputI
}

export const DappDescputHeader : FC<DappDescputHeaderProps>  = ({
    dappDescput
}) =>{

    return (

        <DefaultHeader
            style={{
                color : Colors.Maintheme,
                fontSize : "24px"
            }}
            dappPut={dappDescput}>
                <DefaultHeader.Pre>
                    <InfoCircleFill/>
                </DefaultHeader.Pre>
            </DefaultHeader>

    )

}
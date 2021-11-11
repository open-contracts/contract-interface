import React, {FC, ReactElement} from 'react';
import { DappErrputI } from '../DappPutType';
import { DefaultHeader } from '../Standards/DefaultHeader';
import {ExclamationCircleFill} from "react-bootstrap-icons";
import { Colors } from '../../../Theme';

export type DappErrputHeaderProps = {
    dappErrput : DappErrputI
}

export const DappErrputHeader : FC<DappErrputHeaderProps>  = ({
    dappErrput
}) =>{

    return (

        <DefaultHeader
            style={{
                color : Colors.failedRed
            }}
            dappPut={dappErrput}>
                <DefaultHeader.Pre>
                    <ExclamationCircleFill size={18}/>
                </DefaultHeader.Pre>
            </DefaultHeader>

    )

}
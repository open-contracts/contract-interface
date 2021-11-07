import React, {FC, ReactElement} from 'react';
import { DappDescputI } from '../DappPutType';
import { DefaultHeader } from '../Standards/DefaultHeader';
import {ExclamationCircleFill} from "react-bootstrap-icons";

export type DappDescputHeaderProps = {
    dappDescput : DappDescputI
}

export const DappDescputHeader : FC<DappDescputHeaderProps>  = ({
    dappDescput
}) =>{

    return (

        <DefaultHeader
            dappPut={dappDescput}>
                <DefaultHeader.Pre>
                    <b>ƒ<sub>x</sub></b>
                </DefaultHeader.Pre>
            </DefaultHeader>

    )

}
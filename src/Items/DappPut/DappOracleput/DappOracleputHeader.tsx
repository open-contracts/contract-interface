import React, {FC, ReactElement} from 'react';
import { DappOracleputI } from '../DappPutType';
import { DefaultHeader } from '../Standards/DefaultHeader';
import {ExclamationCircleFill, Eyeglasses} from "react-bootstrap-icons";

export type DappOracleputHeaderProps = {
    dappOracleput : DappOracleputI
}

export const DappOracleputHeader : FC<DappOracleputHeaderProps>  = ({
    dappOracleput
}) =>{

    return (

        <DefaultHeader
            dappPut={dappOracleput}>
                <DefaultHeader.Pre>
                    <Eyeglasses size={24}/>
                </DefaultHeader.Pre>
            </DefaultHeader>

    )

}
import React, {FC, ReactElement} from 'react';
import { DappOracleputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappOracleputHeader } from './DappOracleputHeader';
import { DappOracleputContent } from './DappOracleputContent';

export type DappPutOracleputProps = {
    style ? : React.CSSProperties
    dappOracleput : DappOracleputI
}

export const DappOracleput : FC<DappPutOracleputProps>  = ({
    dappOracleput,
    style
}) =>{

    return (

        <DappPutLayout style={{
            background : Colors.deepCyan,
            border : `1px solid ${Colors.cyan}`,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappOracleputHeader dappOracleput={dappOracleput}/>
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappOracleputContent dappOracleput={dappOracleput}/>
            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
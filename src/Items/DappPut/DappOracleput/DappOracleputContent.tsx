import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { DappOracleputI } from '../DappPutType';
import { darkenStandard, lightenStandard } from '../Methods';

export type DappOracleputContentProps = {
    dappOracleput : DappOracleputI
}

export const DappOracleputContent : FC<DappOracleputContentProps>  = ({
    dappOracleput
}) =>{

    return (

        <div style={{
            color : Colors.primaryTextColor
        }}>
            {dappOracleput.value}
        </div>

    )

}
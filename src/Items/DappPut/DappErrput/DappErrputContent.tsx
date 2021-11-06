import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { DappErrputI } from '../DappPutType';
import { darkenStandard, lightenStandard } from '../Methods';

export type DappErrputContentProps = {
    dappErrput : DappErrputI
}

export const DappErrputContent : FC<DappErrputContentProps>  = ({
    dappErrput
}) =>{

    return (

        <div style={{
            color : Colors.primaryTextColor
        }}>
            {dappErrput.value}
            <br/>
            <br/>
            <AthenaButton
                    primaryColor={darkenStandard(Colors.failedRed)}
                    secondaryColor={lightenStandard(Colors.deepMaroon)}
                >
                    Reset args
                </AthenaButton>
        </div>

    )

}
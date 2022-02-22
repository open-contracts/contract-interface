import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { DappDescputI } from '../DappPutType';
import { darkenStandard, lightenStandard } from '../Methods';

export type DappDescputContentProps = {
    dappDescput : DappDescputI
}

export const DappDescputContent : FC<DappDescputContentProps>  = ({
    dappDescput
}) =>{

    return (

        <div>
            {dappDescput.value}
        </div>

    )

}
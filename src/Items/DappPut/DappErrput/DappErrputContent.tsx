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

    const resetArgs = ()=>{
        dappErrput.resetArgs(dappErrput.contractFunction, dappErrput.setContractFunction);
    }

    return (

        <div style={{
            color : Colors.primaryTextColor
        }}>
            {dappErrput.value}
            <AthenaButton
                    onClick={resetArgs}
                    primaryColor={darkenStandard(Colors.failedRed)}
                    secondaryColor={lightenStandard(Colors.fadedRed)}
                >
                    Reset args
                </AthenaButton>
        </div>

    )

}
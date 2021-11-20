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

    /*const resetArgs = ()=>{
        dappErrput.resetArgs(dappErrput.reduceContractFunction);
    }*/

    return (

        <div>
            {dappErrput.value}
        </div>

    )

}
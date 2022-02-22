import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { DappErrputI } from '../DappPutType';
import { darkenStandard, lightenStandard } from '../Methods';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

export type DappErrputContentProps = {
    dappErrput : DappErrputI
}

export const DappErrputContent : FC<DappErrputContentProps>  = ({
    dappErrput
}) =>{

    return (

        <div>
             <ReactMarkdown plugins={[
                remarkGfm
            ]}>
                {dappErrput.value}
            </ReactMarkdown>
        </div>

    )

}
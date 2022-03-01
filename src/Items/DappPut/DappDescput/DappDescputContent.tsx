import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { DappDescputI } from '../DappPutType';
import { darkenStandard, lightenStandard } from '../Methods';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type DappDescputContentProps = {
    dappDescput : DappDescputI
}

export const DappDescputContent : FC<DappDescputContentProps>  = ({
    dappDescput
}) =>{

    return (

        <div>
            <ReactMarkdown plugins={[remarkGfm]}>
                {dappDescput.value}
            </ReactMarkdown>
        </div>

    )

}
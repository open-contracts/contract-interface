import React, {FC, ReactElement} from 'react';
import { DappOutputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import {DappOutputHeader} from "./DappOutputHeader";
import { DappOutputContent } from '../DappOutput/DappOutputContent';

export type DappPutOutputProps = {
    style ? : React.CSSProperties
    dappOutput : DappOutputI,
    end ? : boolean
}

export const DappOutput : FC<DappPutOutputProps>  = ({
    style,
    dappOutput,
    end
}) =>{

    return (

        <DappPutLayout 
        end={end}
        style={{
            background : Colors.skyBlue,
            border : `1px solid ${Colors.royalBlue}`,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappOutputHeader dappOutput={dappOutput}/>
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappOutputContent dappOutput={dappOutput}/>
            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
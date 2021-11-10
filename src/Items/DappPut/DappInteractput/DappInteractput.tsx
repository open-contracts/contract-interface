import React, {FC, ReactElement} from 'react';
import { DappInteractputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappInteractputHeader } from './DappInteractputHeader';
import {DappInteractputContent} from "./DappInteractputContent";

export type DappPutInteractputProps = {
    style ? : React.CSSProperties
    dappInteractput : DappInteractputI,
    end ? : boolean
}

export const DappInteractput : FC<DappPutInteractputProps>  = ({
    dappInteractput,
    style,
    end
}) =>{

    return (

        <DappPutLayout 
        end={end}
        style={{
            background : "white",
            border : `1px solid ${Colors.lilac}`,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappInteractputHeader dappInteractput={dappInteractput}/>
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappInteractputContent dappInteractput={dappInteractput}/>
            </DappPutLayout.Content>
        </DappPutLayout>

    )

}
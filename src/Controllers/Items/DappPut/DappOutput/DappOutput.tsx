import React, {FC, ReactElement} from 'react';
import { DappOutputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import {DappOutputHeader} from "./DappOutputHeader";
import { DappOutputContent } from '../DappOutput/DappOutputContent';
import { reduceContractFunctionI } from '../../DappFunction/StateMethods';

export type DappPutOutputProps = {
    style ? : React.CSSProperties
    dappOutput : DappOutputI,
    end ? : boolean,
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (contractFunction : reduceContractFunctionI)=>void
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
            background : "white",
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
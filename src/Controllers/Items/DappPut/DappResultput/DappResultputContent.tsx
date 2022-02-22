import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors } from '../../../Theme';
import { DappResultputI } from '../DappPutType';
import Color from "color";
import {darkenStandard, lightenStandard} from "../Methods";
import { result } from 'cypress/types/lodash';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from "react-markdown";


export type DappResultputContentProps = {
    dappResultput : DappResultputI,
    setResultput ? : (Resultput : DappResultputI)=>void
}

export const DappResultputContent : FC<DappResultputContentProps>  = ({
    dappResultput, 
    setResultput
}) =>{

    return (

        <div style={{
            userSelect : "text",
            display : "flex",
            color : Colors.babyBlue
        }}>
            <ReactMarkdown plugins={[
                remarkGfm
            ]}>
                {dappResultput.value||"No return value yet."}
            </ReactMarkdown>
        </div>

    )

}
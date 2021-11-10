import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors } from '../../../Theme';
import { DappResultputI } from '../DappPutType';
import Color from "color";
import {darkenStandard, lightenStandard} from "../Methods";
import { result } from 'cypress/types/lodash';


export type DappResultputContentProps = {
    dappResultput : DappResultputI,
    setResultput ? : (Resultput : DappResultputI)=>void
}

export const DappResultputContent : FC<DappResultputContentProps>  = ({
    dappResultput, 
    setResultput
}) =>{

    const onTextResultput = (text : string)=>{
        setResultput && setResultput({
            ...dappResultput,
            value : text
        })
    }

    return (

        <div style={{
            userSelect : "text",
            display : "flex",
            color : Colors.babyBlue,
            fontSize : "16px"
        }}>
            &emsp;&emsp;<b>𝑦</b>&emsp;=&emsp;{dappResultput.value||"No return value yet."}
        </div>

    )

}
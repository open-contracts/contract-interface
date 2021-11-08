import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors } from '../../../Theme';
import { DappResultputI } from '../DappPutType';
import Color from "color";
import {darkenStandard, lightenStandard} from "../Methods";


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

        <div>
            
        </div>

    )

}
import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors } from '../../../Theme';
import { DappInputI } from '../DappPutType';
import Color from "color";
import {darkenStandard, lightenStandard} from "../Methods";
import {
    TextInputApollo
} from "../../../Components/TextInput"

export type DappInputContentProps = {
    dappInput : DappInputI,
    setInput ? : (input : DappInputI)=>void
}

export const DappInputContent : FC<DappInputContentProps>  = ({
    dappInput, 
    setInput
}) =>{

    const onTextInput = (text : string)=>{
        setInput && setInput({
            ...dappInput,
            value : text
        })
    }

    return (

        <div>
            <TextInputApollo 
                onTextInput={onTextInput}
                type="text" placeholder={dappInput.prompt} style={{
                background : lightenStandard(Colors.forestGreen),
                color : Colors.primaryTextColor,
                border : `1px solid ${darkenStandard(Colors.forestEdge)}`
            }}/>
        </div>

    )

}
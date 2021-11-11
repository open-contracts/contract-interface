import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors, DesktopSizes } from '../../../Theme';
import { DappOracleInputI } from '../DappPutType';
import Color from "color";
import {darkenStandard, lightenStandard} from "../Methods";
import {
    TextInputApollo
} from "../../../Components/TextInput"
import { useState } from 'react';
import { AthenaButton } from '../../../Components/Buttons';

export type DappOracleInputContentProps = {
    dappOracleInput : DappOracleInputI,
    setOracleInput ? : (OracleInput : DappOracleInputI)=>void
}

export const DappOracleInputContent : FC<DappOracleInputContentProps>  = ({
    dappOracleInput, 
    setOracleInput
}) =>{

    

    const [text, setText] = useState(dappOracleInput.response);

    const onTextOracleInput = (text : string)=>{
        setText(text);
       /* setOracleInput && setOracleInput({
            ...dappOracleInput,
            value : text
        })*/
    }

    const onTextSubmit = (text : string)=>{
        dappOracleInput.resolve(text);
    }

    const onButtonSumbit = ()=>{
        dappOracleInput.resolve(text||"");
    }

    return (

        <div style={{
            paddingTop : DesktopSizes.Padding.standard,
            display : "grid",
            gridTemplateColumns : "6fr 1fr",
            gap : DesktopSizes.Padding.standard
        }}>
            <TextInputApollo 
                value={text||""}
                placeholder={dappOracleInput.prompt}
                onTextInput={onTextOracleInput}
                onSubmit={onTextSubmit}
                type="text" style={{
                background : "white",
                color : Colors.Maintheme,
                border : `1px solid ${Colors.Maintheme}`
            }}/>
            <AthenaButton 
                onClick={onButtonSumbit}
                primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                Submit
            </AthenaButton>
        </div>

    )

}
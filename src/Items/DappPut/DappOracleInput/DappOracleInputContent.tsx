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

    const [disabled, setDisabled] = useState(false);

   // const [text, setText] = useState(dappOracleInput.response);
   const text = dappOracleInput.contractFunction.oracleInputs ? 
   dappOracleInput.contractFunction.oracleInputs[dappOracleInput.id].response||"" :
   "";
   

    const onTextOracleInput = (text : string)=>{
        
       setOracleInput && setOracleInput({
            ...dappOracleInput,
            response : text
        })
    }

    const onTextSubmit = (text : string)=>{
        dappOracleInput.resolve(text);
        setDisabled(true);
    }

    const onButtonSumbit = ()=>{
        dappOracleInput.resolve(text);
        setDisabled(true);
    }

    return (

        <div style={{
            paddingTop : DesktopSizes.Padding.standard,
            display : "grid",
            gridTemplateColumns : "6fr 1fr",
            gap : DesktopSizes.Padding.standard
        }}>
            <TextInputApollo 
                disabled={disabled}
                value={text}
                placeholder={"Enter value"}
                onTextInput={onTextOracleInput}
                onSubmit={onTextSubmit}
              style={{
                background : "white",
                color : Colors.Maintheme,
                border : `1px solid ${Colors.Maintheme}`
            }}/>
            <AthenaButton 
                style={{
                    border : `1px solid ${Colors.Maintheme}`,
                    boxShadow : "none"
                }}
                onClick={onButtonSumbit}
                primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                Submit
            </AthenaButton>
        </div>

    )

}
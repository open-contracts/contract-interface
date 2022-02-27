import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors, DesktopSizes } from '../../../Theme';
import { DappOracleInputI } from '../DappPutType';
import Color from "color";
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
   const text = dappOracleInput.contractFunction.oracleInputs &&
   dappOracleInput.contractFunction.oracleInputs[dappOracleInput.id].response;

   const searchParams = new URLSearchParams(window.location.search);
   
   const _input = searchParams.get(`${dappOracleInput.contractFunction.name}.${dappOracleInput.name}`);

   const val = _input ? decodeURI(_input) : undefined;

    const onTextOracleInput = (text : string)=>{
        
        searchParams.set(
            `${dappOracleInput.contractFunction.name}.${dappOracleInput.name}`,
                encodeURI(text)
        );

        window.history.pushState({
            path : `/?${searchParams.toString()}${window.location.hash}`
        }, '', `/?${searchParams.toString()}${window.location.hash}`);


        setOracleInput && setOracleInput({
            ...dappOracleInput,
            response : text
        });
    }

    const onTextSubmit = (text : string)=>{
        dappOracleInput.resolve(text);
        setDisabled(true);
    };

    const onButtonSumbit = ()=>{
        dappOracleInput.resolve(text||val||"");
        setDisabled(true);
    }

    const handleKeyDown : React.KeyboardEventHandler= (e)=>{
        if(e.key === "Enter") onButtonSumbit();
    }

    return (
        <div style={{
            paddingTop : DesktopSizes.Padding.standard,
        }}>
            <table style={{
                width : "100%"
            }}>
                <colgroup>
                    <col span={1} style={{
                        width : "80%"
                    }}/>
                    <col span={1} style={{
                        width : "20%"
                    }}/>
                </colgroup>
                <tbody>
                    <tr onKeyDown={handleKeyDown}>
                        <td> <TextInputApollo 
                            value={text||val}
                            placeholder={"Enter value"}
                            onTextInput={onTextOracleInput}
                            onSubmit={onTextSubmit}
                        style={{
                            background : "white",
                            color : Colors.Maintheme,
                            border : `1px solid ${Colors.Maintheme}`
                        }}/></td>
                        <td><AthenaButton 
                        style={{
                            border : `1px solid ${Colors.Maintheme}`,
                            boxShadow : "none",
                            width : "100%"
                        }}
                        onClick={onButtonSumbit}
                        primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                        Submit
                    </AthenaButton></td>
                    </tr>
                </tbody>
            </table>
        </div>

        
        

    )

}

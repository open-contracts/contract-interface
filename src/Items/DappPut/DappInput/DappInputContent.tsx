import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors } from '../../../Theme';
import { DappInputI } from '../DappPutType';
import Color from "color";
import {darkenStandard, lightenStandard} from "../Methods";
import {
    TextInputApollo
} from "../../../Components/TextInput"
import { useParams, useSearchParams } from 'react-router-dom';
import { useOpenContractContext } from '../../../Models';
import jwt from "jwt-simple";

export type DappInputContentProps = {
    dappInput : DappInputI,
    setInput ? : (input : DappInputI)=>void
}

export const DappInputContent : FC<DappInputContentProps>  = ({
    dappInput, 
    setInput
}) =>{

    const [searchParams, setSearchParams]= useSearchParams();
    const val = searchParams.get(dappInput.contractFunction.name)
    && jwt.decode(searchParams.get(dappInput.contractFunction.name) as string, dappInput.contractFunction.name);

    const onTextInput = (text : string)=>{
        const newVal = jwt.encode(text, dappInput.contractFunction.name);
        setSearchParams({
            ...searchParams,
            [dappInput.contractFunction.name] : newVal
        })
        setInput && setInput({
            ...dappInput,
            value : text
        })
    }

    return (

        <div>
            <TextInputApollo 
                onTextInput={onTextInput}
                type="text" placeholder={val||dappInput.prompt} style={{
                background : darkenStandard(Colors.greenCeramic),
                color : Colors.primaryTextColor,
                border : `1px solid ${lightenStandard(Colors.forestEdge)}`
            }}/>
        </div>

    )

}
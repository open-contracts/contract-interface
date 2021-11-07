import React, {FC, ReactElement} from 'react';
import {Form, FormControlProps} from "react-bootstrap";

export type TextInputApolloProps = FormControlProps & {
    style ? : React.CSSProperties,
    onTextInput ? : (text : string)=>void,
    placeholder ? : string
}

export const TextInputApollo : FC<TextInputApolloProps>  = (props) =>{

    const {
        onTextInput,
        ...rest
    } = {
        ...props,
        type : "text"
    };

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>)=>{

        const char = e.key.length < 2 ? e.key : "";

        onTextInput && onTextInput((e.target as any).value + char);

    }


    return (

        <Form.Control

            onKeyDown={handleKeyDown}
            {...props}
        />

    )

}
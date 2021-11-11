import React, {FC, ReactElement} from 'react';
import {Form, FormControlProps} from "react-bootstrap";

export type TextInputApolloProps = FormControlProps & {
    style ? : React.CSSProperties,
    onTextInput ? : (text : string)=>void,
    onSubmit ? : (text : string)=>void,
    placeholder ? : string,
}

export const TextInputApollo : FC<TextInputApolloProps>  = (props) =>{
    const {
        onTextInput,
        ...rest
    } = {
        ...props,
        type : "text"
    };
    
    const handleChange : React.ChangeEventHandler = (e)=>{
        onTextInput && onTextInput((e.target as any).value);
    }
    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            props.onSubmit && props.onSubmit((e.target as any).value);
        }
    }
    return (
        <Form.Control
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...rest}
        />

    )

}
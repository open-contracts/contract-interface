import React, {FC, ReactElement, useRef, useState} from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import {AthenaButton, AthenaButtonProps} from "./AthenaButton";
import {generate} from "shortid";
import {motion} from "framer-motion";
import { useEffect } from 'react';
import { useConnectWalletContext } from '../../Models';

export type PredicateButtonProps = AthenaButtonProps & {
    Warning : React.ReactNode,
    allow ? : boolean,
    force ? : boolean
};

export const PredicateButton : FC<PredicateButtonProps>  = (props) =>{

    const {buttonRef, dispatch} = useConnectWalletContext();

    const _action = async ()=>{
        if(props.disabled) {
            dispatch((state)=>{
                return {
                    ...state,
                    warning : props.Warning
                }
            });
            buttonRef && buttonRef.current && buttonRef.current.scrollIntoView({behavior : "smooth", block : "start"});
            if(props.allow)  props.action && await props.action();
            return;
        }
        props.action && await props.action();
    }

    const _onClick = (e  : React.MouseEvent)=>{
        if(props.disabled) {
             dispatch((state)=>{
                 return {
                    ...state,
                    warning : props.Warning
                 }
             });
             buttonRef && buttonRef.current && buttonRef.current.scrollIntoView({behavior : "smooth", block : "start"});
             if(props.allow) props.onClick && props.onClick(e);
             return;
        }
        props.onClick && props.onClick(e);
    }

    const target = useRef(null);


    return (

        <AthenaButton 
        {...props} action={_action} onClick={_onClick} disabled={false}>
            <div ref={target}>
                {props.children}
            </div>
        </AthenaButton>
           
    )

}
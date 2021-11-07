import React, {FC, ReactElement, useState} from 'react';
import { useEffect } from 'react';
import {ChevronDown, ChevronUp} from "react-bootstrap-icons";
import { GrowOnEventAchamaenid } from '../../../Glitter/Animations';

export type DropdownBottomProps = {
    style? : React.CSSProperties,
    onDropped? : (isDropped : boolean)=>void,
    isDropped? : boolean
}

export const DropdownBottom : FC<DropdownBottomProps> = ({
    onDropped,
    isDropped = false,
    style
})=>{


    const handleClick = (e : React.MouseEvent)=>{

        

        onDropped && onDropped(!isDropped);

    }

    return (
        <div
            onClick={handleClick}
            style={{
                ...style
            }}
        >
            <div style={{
                cursor : "pointer",
                width : "100%",
                height : "100%",
                display : "grid",
                alignContent: "center",
                background : "linear-gradient(#77777700, #44444433)"
            }}>
               {
                   isDropped ? <ChevronUp style={{
                       margin : "auto"
                   }}/> : <ChevronDown style={{
                       margin : "auto"
                   }}/>
               }
            </div>
        </div>
    )


}


export type SizeDropdownProps = {
    style? : React.CSSProperties,
    onDropped ? : (dropped : boolean)=>void,
    pulledSize? : React.CSSProperties["height"],
    droppedSize? : React.CSSProperties["height"],
    dropStyle? : React.CSSProperties,
    isDropped? : boolean // can be used to manipulate the drop state externally, or to set a drop state 
}

export const SizeDropdown : FC<SizeDropdownProps>  = ({
    children,
    style,
    onDropped,
    pulledSize = "200px",
    droppedSize = "auto",
    isDropped = false,
    dropStyle
}) =>{

    const [_isDropped, setDropped] = useState(isDropped);

    const handleDropdownClick = (isDropped : boolean)=>{

        setDropped(isDropped);
        onDropped && onDropped(isDropped);

    }


    const computeIsDropped = (external : boolean | undefined, internal : boolean)=>{
        return external !== undefined ? external : internal;
    }

    return (

        <div style={{
            ...style,
            position : "relative",
            height : computeIsDropped(isDropped, _isDropped) ? droppedSize : pulledSize,
            overflow : "hidden"
        }}>
            <div style={{
                height : "100%",
                width : "100%",
                overflow : "hidden"
            }}>
                {children}
            </div>
            <DropdownBottom 
                isDropped={computeIsDropped(isDropped, _isDropped)}
                onDropped={handleDropdownClick} style={{
                ...dropStyle,
                position : isDropped ? "relative" : "absolute",
                left : 0,
                bottom : 0,
                width : "100%"
            }}/>
        </div>

    )

}
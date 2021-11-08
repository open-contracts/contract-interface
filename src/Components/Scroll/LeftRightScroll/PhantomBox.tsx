import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import Color from "color";

export type PhantomBoxProps = {
    style ? : React.CSSProperties,
    left ? : boolean
}

export const PhantomBox : FC<PhantomBoxProps>  = ({
    children,
    style,
    left
}) =>{

    

    return (

        <div style={{
            height : "100%",
            background : `linear-gradient(${left ? "to left" : "to right"}, #00000000, #00000020, #22222220, #30303030)`,
            ...style
        }}>
            {children}
        </div>

    )

}
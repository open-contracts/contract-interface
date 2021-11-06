import React, {FC, ReactElement} from 'react';
import { PhantomBox } from './PhantomBox';
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons";
import { Colors } from '../../../Theme';

export type LeftRightScrollButtonProps = {
    style ? : React.CSSProperties,
    left ? : boolean,
    onClick ? : (e : React.MouseEvent)=>void
}

export const LeftRightScrollButton : FC<LeftRightScrollButtonProps>  = ({
    style,
    left,
    onClick
}) =>{

    return (

        <div onClick={onClick}>
            <PhantomBox 
                left={left}
                style={{
                    cursor : "pointer",
                    height : "100%",
                    width : "50px",
                    display : "grid",
                    alignContent : "center",
                    alignItems : "center",
                    justifyContent : "center",
                    justifyItems : "center",
                    color : "black",
                    ...style
                }}>
                    {left ? <ChevronLeft  size={18}/> : <ChevronRight size={18}/>}
                </PhantomBox>
        </div>

    )

}
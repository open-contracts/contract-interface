import React, {FC, ReactElement, useRef} from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { LeftRightScrollButton } from './LeftRightScrollButton';

export type LeftRightScrollAdornoProps = {
    style ? : React.CSSProperties
    step ? : number
}

export const LeftRightScrollAdorno : FC<LeftRightScrollAdornoProps>  = ({
    children,
    style,
    step = 25
}) =>{

    const containerRef = useRef<HTMLDivElement>(null);
    const [tick, forceUpdate] = useReducer(x=>x+1, 0);

    const showLeft = containerRef.current ? (containerRef.current.scrollLeft > 0) : true;
    const showRight = containerRef.current ? (
        (containerRef.current.scrollWidth -  containerRef.current.scrollLeft) > 
        containerRef.current.clientWidth + 1
    ) : true;

    const handleLeftClick = ()=>{
        forceUpdate();
        containerRef.current?.scroll({
            left : containerRef.current.scrollLeft - (.4 * containerRef.current.clientWidth) ,
            top : 0,
            behavior : "smooth"
        })
    }

    const handleRightClick = ()=>{
        forceUpdate()
        containerRef.current?.scroll({
            left : containerRef.current.scrollLeft + (.4 * containerRef.current.clientWidth),
            top : 0,
            behavior : "smooth"
        })
    }


    return (

        <div 
        style={{
            position : "relative",
            width : "100px",
            ...style
        }}>
            {showLeft && <LeftRightScrollButton
            onClick={handleLeftClick}
            left
            style={{
                height : "100%",
                position : "absolute",
                width : "30px",
                top : 0,
                left : 0,
                zIndex : 2000
            }}/>}
            <div ref={containerRef}
                style={{
                    display : "flex",
                    alignContent : "center",
                    alignItems : "center",
                    position : "relative",
                    overflowX : "scroll",
                    width : "100%",
                }}
            >
                {children}
            </div>
            {showRight && <LeftRightScrollButton
            onClick={handleRightClick}
            left={false}
            style={{
                height : "100%",
                position : "absolute",
                width : "30px",
                top : 0,
                right : 0,
                zIndex : 2000
            }}/>}
        </div>

    )

}
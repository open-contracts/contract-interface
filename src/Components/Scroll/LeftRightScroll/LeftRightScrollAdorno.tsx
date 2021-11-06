import React, {FC, ReactElement, useRef} from 'react';
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

    const containerRef = useRef<HTMLDivElement>(null)

    const showLeft = containerRef.current ? (containerRef.current.scrollLeft > 0) : true;
    const showRight = containerRef.current ? (
        (containerRef.current.scrollWidth -  containerRef.current.scrollLeft) > 
        containerRef.current.clientWidth
    ) : true;

    console.log(containerRef.current?.getClientRects())

    console.log(showLeft, showRight);

    const handleLeftClick = ()=>{
        containerRef.current?.scroll({
            left : containerRef.current.scrollLeft - (.25 * containerRef.current.clientWidth) 
        })
    }

    const handleRightClick = ()=>{
        containerRef.current?.scroll({
            left : containerRef.current.scrollLeft + (.25 * containerRef.current.clientWidth)
        })
    }


    return (

        <div 
        ref={containerRef}
        style={{
            overflowX : "scroll",
            display : "flex",
            alignContent : "center",
            alignItems : "center",
            position : "relative",
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
                left : 0
            }}/>}
            {children}
            {showRight && <LeftRightScrollButton
            onClick={handleRightClick}
            left={false}
            style={{
                height : "100%",
                position : "absolute",
                width : "30px",
                top : 0,
                right : 0
            }}/>}
        </div>

    )

}
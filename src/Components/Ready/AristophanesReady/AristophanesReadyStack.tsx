import React, {FC, ReactElement} from 'react';
import {Colors} from "../../../Theme";
import {CircleFill as Circle} from "react-bootstrap-icons";
import { GrowOnEventAchamaenid } from '../../../Glitter/Animations';
import { useState } from 'react';
import { ThroughGlassAgathocles } from '../../../Glitter/Animations/ThroughGlass/ThroughGlassAgathocles';

export type ReadyT = "ready" | "not ready" | "failed";

export interface StateMapI<T extends any = string> {
    "ready" ? : T,
    "not ready" ? : T, 
    "failed" ? : T
}

export type AristophanesReadyStackProps = {
    right ? : boolean
    ready ? : "ready" | "not ready" | "failed",
    label ? : string,
    size ? : React.CSSProperties["height"],
    expressions ? : StateMapI,
    information ? : StateMapI,
    colors ? : StateMapI<React.CSSProperties["color"]>,
    style ? : React.CSSProperties,
    lightStyle ? : React.CSSProperties,
    onClick ?  : (ready : AristophanesReadyStackProps["ready"])=>void
}

export const DefaultExpressions : StateMapI = {
    "ready" : "Ready!",
    "not ready" : "Awaiting...",
    "failed" : "Failed"
} as const

export const DefaultInformation : StateMapI = {
    "ready" : "The dependency has been loaded.",
    "not ready" : "Trying to load the dependency.",
    "failed" : "We could not load the dependency."
} as const

export const DefaultColors : StateMapI<React.CSSProperties["color"]> = {
    "ready" : Colors.forestEdge,
    "not ready" : Colors.waitingYellow,
    "failed" : Colors.failedRed
} as const

/**
 * A Ready button.
 * @param props
 * @returns 
 */
export const AristophanesReadyStack : FC<AristophanesReadyStackProps>  = ({
    right,
    ready = "not ready",
    label,
    expressions,
    information,
    colors,
    size,
    style,
    lightStyle,
    onClick
}) =>{

    const _expressions = {
        ...DefaultExpressions,
        ...expressions
    }

    const _information = {
        ...DefaultExpressions,
        ...information
    }

    const _colors = {
        ...DefaultColors,
        ...colors
    }

    const handleClick = ()=>{
        onClick && onClick(ready);
    }

    const [isHovered, setHovered] = useState(false);

    const handleMouseOver = ()=>{
        setHovered(true);
    }

    const handleMouseOut = ()=>{
        setHovered(false);
    }

    return (

        <ThroughGlassAgathocles glass={isHovered} glassOpacity={.7}>
             <GrowOnEventAchamaenid grow={isHovered}>
                <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                title={_information[ready]}
                onClick={handleClick}
                style={{
                    display : "grid",
                    gridTemplateColumns : "1fr",
                    justifyContent : "center",
                    justifyItems : "center",
                    alignContent : "center",
                    alignItems : "center",
                    height : "auto",
                    fontSize : "15px",
                    width : "auto",
                    cursor : "pointer",
                    ...style
                }}>
                  
                    <div>
                        <Circle 
                            color={_colors[ready]}
                            size={"18px"}
                            style={{
                                ...lightStyle
                            }}/>
                    </div>
                    <div style={{
                        display : "flex",
                        height : "100%",
                        gridTemplateColumns : "1fr",
                        gridTemplateRows : "1fr 1fr",
                        verticalAlign : "center",
                        alignContent : "center",
                        alignItems : "center",
                        textAlign : "center"
                    }}>
                        <div>
                            <span style={{
                                color : Colors.Maintheme
                            }}>{label}</span><br/>
                            <span style={{
                                color : Colors.tertiaryTextColor,
                                wordWrap : "break-word",
                                overflowWrap : "anywhere"
                            }}>
                                {_expressions[ready]}
                            </span>
                        </div>
                    </div>
                </div>
            </GrowOnEventAchamaenid>
        </ThroughGlassAgathocles>
       

    )

}
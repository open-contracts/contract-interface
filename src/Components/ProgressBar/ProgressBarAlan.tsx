import React, {FC, ReactElement} from 'react';
import {motion} from "framer-motion";
import {Colors, DesktopSizes} from "../../Theme";
import { useState } from 'react';

export type ProgressBarAlanProps = {
    style ? : React.CSSProperties,
    innerStyle ? : React.CSSProperties
    duration : number,
    progress ? : number
}

export const ProgressBarAlan : FC<ProgressBarAlanProps>  = ({
    style,
    duration,
    progress
}) =>{

    const [_duration, _setDuration] = useState(duration);
    
    const opac = Math.floor((parseInt('44', 16) + (progress||0) * (255 - parseInt('44', 16)))).toString(16);

    return (

        <div style={{
            ...style,
            border : `1px solid ${Colors.forestEdge}`,
            borderRadius : DesktopSizes.BorderRadius.standard,
            display : "flex",
            justifyContent : "left",
            overflow : "hidden",
            height : "20px"
        }}>
            <motion.div 
                style={{
                    height : "100%"
                }}
                animate = {{
                    width : [(progress ? `${progress * 100}%` : "0%"), "100%"],
                    background : [`${Colors.readyGreen}${opac}`, Colors.readyGreen]
                }}
                transition={{
                    ease : "easeInOut",
                    duration : _duration
                }}>

            </motion.div>
        </div>

    )

}
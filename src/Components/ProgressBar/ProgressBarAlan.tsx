import React, {FC, ReactElement} from 'react';
import {motion} from "framer-motion";
import {Colors, DesktopSizes} from "../../Theme";

export type ProgressBarAlanProps = {
    style ? : React.CSSProperties,
    innerStyle ? : React.CSSProperties
    duration : number
}

export const ProgressBarAlan : FC<ProgressBarAlanProps>  = ({
    style,
    duration
}) =>{

    console.log(duration);

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
                    width : ["0%", "100%"],
                    background : [`${Colors.readyGreen}44`, Colors.readyGreen]
                }}
                transition={{
                    ease : "easeInOut",
                    duration : duration
                }}>

            </motion.div>
        </div>

    )

}
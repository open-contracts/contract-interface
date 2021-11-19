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



    return (

        <div style={{
            ...style,
            borderRadius : DesktopSizes.BorderRadius.standard,
            display : "flex",
            justifyContent : "left",
            overflow : "hidden"
        }}>
            <motion.div 
                animate = {{
                    width : [0, "100%"],
                    color : Colors.readyGreen
                }}
                transition={{
                    ease : "easeInOut",
                    duration : duration
                }}>

            </motion.div>
        </div>

    )

}
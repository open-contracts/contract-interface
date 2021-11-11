import React, {FC, ReactElement} from 'react';
import {motion} from "framer-motion";
import {Colors} from "../../../Theme";
import {Check} from "react-bootstrap-icons";

export type SucceededStepPostProps = {
    done ? : (success : boolean)=>void
    style ? : React.CSSProperties
}

export const SucceededStepPost : FC<SucceededStepPostProps>  = ({
    style,
    children,
    done
}) =>{

    return (

        <motion.div 
            onAnimationComplete={()=>{
                done && done(true);
            }}
            animate={{
                opacity : [1.0, 1.0, 1.0, 0.0],
                scale : [1.0, .75, .25, .05],
                position : ["relative", "relative", "relative", "relative"],
                y : [0, 0, -200, -300],
                x : [0, 0, 200, 300]
            }}
            transition={{
                ease : "easeInOut",
                duration : 2.0
            }}
        >
           {children}
           <motion.div
                style={{
                    overflow : "hidden",
                }}
                animate = {{
                    width : [0, 80],
                    color : Colors.readyGreen
                }}
                transition={{
                    ease : "easeInOut",
                    duration : .75
                }}
            >
                <Check size={60}/>
            </motion.div>
        </motion.div>

    )

}
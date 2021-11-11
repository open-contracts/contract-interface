import React, {FC, ReactElement} from 'react';
import {motion} from "framer-motion";
import {Colors} from "../../../Theme";
import {X} from "react-bootstrap-icons";
import { AthenaButton } from '../../Buttons';

export type FailedStepPostProps = {
    done ? : (success : boolean)=>void
    style ? : React.CSSProperties
}

export const FailedStepPost : FC<FailedStepPostProps>  = ({
    style,
    children,
    done
}) =>{

    return (

        <div>
           {children}
           <motion.div
                onAnimationComplete={()=>{
                    done && done(false);
                }}
                style={{
                    overflow : "hidden",
                }}
                animate = {{
                    scale : [0, 1.5, 1.1, 1.0, 1.0],
                    color : Colors.failedRed
                }}
                transition={{
                    ease : "easeInOut",
                    duration : .5
                }}
            >
                <X size={60}/>
            </motion.div>
            <motion.div
                style={{
                    display: "grid",
                    justifyContent : "center",
                    justifyItems : "center" 
                }}
                animate={{
                    display : ["none", "block"],
                    opacity : [0.0, 0.0, 0.0, 1.0],
                }}
                transition={{
                    ease : "easeInOut",
                    duration : .75
                }}
            >
                <AthenaButton 
                    onClick={()=>{
                        window.location.reload();
                    }}
                    size={"lg"}
                    primaryColor={Colors.Maintheme} 
                    secondaryColor={Colors.primaryTextColor}>Retry</AthenaButton>
            </motion.div>
        </div>

    )

}
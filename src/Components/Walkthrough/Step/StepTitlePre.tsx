import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Colors} from "../../../Theme";
import {motion} from "framer-motion";
import { generateNamedMember, getComponentMembers } from 'rgfm';
import { Members } from './StepType';

export type StepPreProps = {
    next : ()=>void
}

const StepPre : FC<StepPreProps> & {
    
        Title : FC,
        Info : FC,
        Content : FC
    
}  = ({
    next,
    children
}) =>{

    const {
        Title,
        Info,
        Content
    } = getComponentMembers(Members, children);

    const [isLoaded, setLoaded] = useState(true);
    useEffect(()=>{
        if(!isLoaded){
            setLoaded(true);
        }
    })

    return (

        
                <motion.div
                    animate={{
                        height : "100%",
                        width : "100%",
                        display : "grid",
                        alignContent : isLoaded ? "normal" : "center",
                        alignItems : isLoaded ? "normal" : "center",
                        y : isLoaded ?  "-300%" : "0"
                    }}
                    transition={{
                        ease : "easeInOut",
                        duration : 1.0
                    }}
                >
                    <h1 style={{
                        color : Colors.Maintheme
                    }}>{Title}</h1>
                </motion.div>
    )

}

StepPre.Title = generateNamedMember("Title");
StepPre.Info = generateNamedMember("Info");
StepPre.Content = generateNamedMember("Content");


export {StepPre}
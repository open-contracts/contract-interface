import React, {FC, ReactElement} from 'react';
import { StepStage } from './StepStage';
import { generateNamedMember, getComponentMembers } from 'rgfm';

import { Members } from './StepType';
import { Colors } from '../../../Theme';
import { useState } from 'react';
import { useEffect } from 'react';

import {motion} from "framer-motion";

export type StepPreProps = {
    next ? : ()=>void
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

    return (

            <div style={{
                display : "grid",
                gridTemplateColumns : "1fr",
                gridTemplateRows : "1fr 1fr 4fr"
            }}>
                <motion.div
                        animate={{
                            position : "relative",
                            height : "100%",
                            width : "100%",
                            y : [300, 0]
                        }}
                        transition={{
                            ease : "easeInOut",
                            duration : 1
                        }}
                    >
                        <h1 style={{
                            color : Colors.Maintheme
                        }}>{Title}</h1>
                </motion.div>
                <motion.div
                    animate={{
                        opacity : [0, 0, 0, 0, 1.0]
                    }}
                    transition={{
                        ease : "easeInOut",
                        duration : 1.25
                    }}
                >
                    <p style={{
                        color : Colors.primaryTextColor
                    }}>{Info}</p>
                </motion.div>
                <motion.div 
                    animate={{
                        opacity : [0, 0, 1.0],
                    }}
                    transition={{
                        ease : "easeInOut",
                        duration : 2.0
                    }}
                >
                    {Content}
                </motion.div>
            </div>
    )

}

StepPre.Title = generateNamedMember("Title");
StepPre.Info = generateNamedMember("Info");
StepPre.Content = generateNamedMember("Content");


export {StepPre}
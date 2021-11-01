import React, {FC, ReactElement} from 'react';
import { StepStage } from './StepStage';
import { generateNamedMember, getComponentMembers } from 'rgfm';
import {SucceededStepPost} from "./SuceededStepPost";
import {FailedStepPost} from "./FailedStepPost";

import { Members } from './StepType';
import { Colors } from '../../../Theme';
import { useState } from 'react';
import { useEffect } from 'react';

import {motion} from "framer-motion";
import { AthenaButton } from '../../Buttons';

export type StepPostProps = {
    done ? : (success : boolean)=>void,
    success ? : boolean
}

const StepPost : FC<StepPostProps> & {
    
        Title : FC,
        Info : FC,
        Content : FC
    
}  = ({
    done,
    success,
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
                gridTemplateRows : "1fr 1fr 4fr",
                justifyContent : "center",
                justifyItems : "center"
            }}>
                <motion.div
                        animate={{
                            position : "relative",
                            height : "100%",
                            width : "100%",
                            opacity : success ? [1.0, .25, 0] : 1.0,
                            y : success ? [0, 0, 100] : 0
                        }}
                        transition={{
                            ease : "easeInOut",
                            duration : 1
                        }}
                    >
                        <h1 style={{
                            color : Colors.primaryTextColor
                        }}>{Title}</h1>
                </motion.div>
                <motion.div
                    animate={{
                        opacity : success ? [1.0, 0, 0] : 1.0
                    }}
                    transition={{
                        ease : "easeInOut",
                        duration : 1
                    }}
                >
                    <p style={{
                        color : Colors.primaryTextColor
                    }}>{Info}</p>
                </motion.div>
                {success && <SucceededStepPost done={done}>
                    {Content}
                </SucceededStepPost>}
                {!success && <FailedStepPost done={done}>
                    {Content}
                </FailedStepPost>}
            </div>
    )

}

StepPost.Title = generateNamedMember("Title");
StepPost.Info = generateNamedMember("Info");
StepPost.Content = generateNamedMember("Content");


export {StepPost}
import React, {FC, ReactElement, useEffect} from 'react';
import { StepStylesT } from './StepType';
import {getComponentMembers, generateNamedMember} from "rgfm";
import { useState } from 'react';
import { Members } from './StepType';

export type StepStageProps = {
    duration ? : number,
    startStyle ? :StepStylesT,
    endStyle ? : StepStylesT,
    next ? : ()=>void
}

const StepStage : FC<StepStageProps> & {
    Title : FC,
    Info : FC,
    Content : FC
}  = ({
    duration,
    startStyle,
    endStyle,
    next,
    children
}) =>{

    const [load, setLoad] = useState(false);

    const timeout = !load && duration && setTimeout(()=>{
        console.log("Timed out.", next);
        next && next();
    }, duration)

    useEffect(()=>{
        timeout && clearTimeout(timeout);
    })

    useEffect(()=>{
        console.log(load)
        if(!load){
            setLoad(true);
        }
    })

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
            alignContent : "center",
            alignItems : "center",
            justifyContent : "center",
            transition : `all 1s ease-in-out`,
            justifyItems : "center",
            ...load ? startStyle?.wrapper : endStyle?.wrapper
        }}>
            <div style={{
                transition : `all 1s ease-in-out`,
                ...load ? startStyle?.Title : endStyle?.Title
            }}>
                {Title}
            </div>
            <div>
                {Info}
            </div>
            <div>
                {Content}
            </div>
        </div>

    )

}

StepStage.Title = generateNamedMember("Title");
StepStage.Info = generateNamedMember("Info");
StepStage.Content = generateNamedMember("Content");

export {StepStage};
import React, {FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { generateNamedMember, getComponentMembers } from 'rgfm';
import {StepStageProps} from "./StepStage";

export type StepContainerProps = {
    stages : FC<{
        next : ()=>void
    }>[],
    style ? : React.CSSProperties
}

export const StepContainer : FC<StepContainerProps>  = ({
    stages,
    style
}) =>{

    const [stageIndex, next] = useReducer(x=>x+1, 0);

    const Stage = stages[stageIndex];

    useEffect(()=>{
        
    })

    return (

        <div style={{
            ...style
        }}>
        {stageIndex < stages.length - 1 ?
            <Stage next={next}/>
            : <Stage next={()=>{}}/> 
        }
        </div>

    )

}
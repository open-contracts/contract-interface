import React, {FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Steps, AllSteps, StepStatusT} from "./Steps";
import { simulateNetworkRequest } from './simulateNetworkRequest';

export type RunStepsProps = {
    done ? : ()=>void,
    setStepStatus ? : (stepStatus : StepStatusT)=>void,
    stepStatus : StepStatusT
}

export const RunSteps : FC<RunStepsProps>  = ({
    done,
    setStepStatus,
    stepStatus
}) =>{

    const [stepIndex, setStepIndex] = useState(0);
    const [allDone, setAllDone] = useState(false);

    const handleDone = (which : string, success : boolean)=>{
        const index = AllSteps.indexOf(which);
        if((index !== undefined) && (index < AllSteps.length - 1) && success){
            setStepIndex(stepIndex + 1);
            return;
        }
        if((index !== undefined) && (index > AllSteps.length - 2) && success){
            setAllDone(true);
        }
    }

    useEffect(()=>{

        simulateNetworkRequest<StepStatusT>({
            ...stepStatus,
            [AllSteps[stepIndex]] : "ready"
        }).then((data)=>{
            setStepStatus && setStepStatus(data)
        })

    }, [stepStatus])

    useEffect(()=>{
        if(allDone){
            done && done();
        }
    })

    return (

        <Steps 
        done={handleDone}
        which={AllSteps[stepIndex]}
        status={stepStatus}/>


    )

}
import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {RunSteps} from "../../Statics/Steps/RunSteps";
import { StepStatusT, AllSteps } from '../../Statics/Steps/Steps';
import { ethers } from 'ethers';
import {NotReadyToRun} from "./NotReadyToRun";
import {ReadyToRun} from "./ReadyToRun";

declare global {
    interface Window {
        ethereum : ethers.providers.ExternalProvider
    }
}

export type RunPageProps = {
}

export const simulateNetworkRequest =  async <T extends any>(value : T, upperBound : number = 5000) : Promise<T> =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(value);
        }, Math.random() * upperBound)
    })
}

export const RunPage : FC<RunPageProps>  = () =>{


    const [stepStatus, setStepStatus] = useState<StepStatusT>({
        wallet : "not ready",
    });

    const [readyToRun, setReadyToRun] = useState(false);
    const handleAllDone = ()=>{
        setReadyToRun(true);
    }

    const _setStepStatus = (stepStatus : StepStatusT)=>{
        
        setStepStatus(stepStatus);
    }

    if(!readyToRun) {
        return (
            <NotReadyToRun setStepStatus={_setStepStatus} stepStatus={stepStatus} handleAllDone={handleAllDone}/>
        )
    }
   
    return (

       <ReadyToRun stepStatus={stepStatus}/>
    )

}
import React, {FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Steps, AllSteps} from "./Steps";

export type RunStepsProps = {
    done ? : ()=>void,
    onWallet ? : (data : string)=>void
}

export const RunSteps : FC<RunStepsProps>  = ({
    done
}) =>{

    const [stepIndex, setStepIndex] = useState(0);
    const [allDone, setAllDone] = useState(false);

    /*const [[stageReady, stageRequested], setInitItems] = 
    useState<[
        {[key : string] : DappI}|undefined,
        boolean
    ]>([undefined, false]);*/

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
        if(allDone){
            done && done();
        }
    })

    return (

        <Steps 
        done={handleDone}
        which={AllSteps[stepIndex]}
        status={{
            crt : "ready",
            wallet : "ready",
            enclave : "failed"
        }}/>


    )

}
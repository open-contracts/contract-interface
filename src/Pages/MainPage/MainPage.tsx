import React, {FC, ReactElement, useState} from 'react';
import { useCheckStore } from '../../Sytems';
import {RunPage} from "../Run";
import { CheckPage } from '../CheckPage/CheckPage';
import { StepStatusT, AllSteps } from '../../Statics/Steps/Steps';

export type MainPageProps = {}

export const MainPage : FC<MainPageProps>  = () =>{

    const {
        checksCompleted
    } = useCheckStore()

    const [stepStatus, setStepStatus] = useState<StepStatusT>({
        wallet : "not ready",
    });

    return <RunPage stepStatus={stepStatus}
    setStepStatus={setStepStatus}/> 
 

}
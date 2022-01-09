import React, {FC, ReactElement} from 'react';
import { RunBenchDesktop } from '../../Benches';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderDesktop, HeaderResponsive } from '../../Maps/Headers';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';
import {Step} from "../../Components/Walkthrough/Step";
import { useState } from 'react';
import { useEffect } from 'react';
import {RunSteps} from "../../Statics/Steps/RunSteps";
import { StepStatusT, AllSteps } from '../../Statics/Steps/Steps';
import { ethers } from 'ethers';

declare global {
    interface Window {
        ethereum : ethers.providers.ExternalProvider
    }
}

export type NotReadyToRunProps = {

    handleAllDone : ()=>void,
    stepStatus : StepStatusT,
    setStepStatus : (stepStatus : StepStatusT)=>void

}

export const NotReadyToRun : FC<NotReadyToRunProps>  = ({
    handleAllDone,
    stepStatus,
    setStepStatus
}) =>{
   
    return (<RunSteps done={handleAllDone} setStepStatus={setStepStatus} stepStatus={stepStatus}/>);

}
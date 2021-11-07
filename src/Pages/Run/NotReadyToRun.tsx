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
   
    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderDesktop crt={stepStatus.crt} enclave={stepStatus.enclave} wallet={stepStatus.wallet}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <RunSteps done={handleAllDone} setStepStatus={setStepStatus} stepStatus={stepStatus}/>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderDesktop crt={stepStatus.crt} enclave={stepStatus.enclave} wallet={stepStatus.wallet}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <RunSteps done={handleAllDone} setStepStatus={setStepStatus} stepStatus={stepStatus}/>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        <RunSteps done={handleAllDone} setStepStatus={setStepStatus} stepStatus={stepStatus}/>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        <RunSteps done={handleAllDone} setStepStatus={setStepStatus} stepStatus={stepStatus}/>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Mobile>
       </MediaResponsive>
       
    )

}
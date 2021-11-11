import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {RunSteps} from "../../Statics/Steps/RunSteps";
import { StepStatusT, AllSteps } from '../../Statics/Steps/Steps';
import { ethers } from 'ethers';
import {NotReadyToRun} from "./NotReadyToRun";
import {ReadyToRun} from "./ReadyToRun";
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderDesktop, HeaderResponsive } from '../../Maps/Headers';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';

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

    const page = readyToRun ? 
    (<ReadyToRun stepStatus={stepStatus}/>) :
    (<NotReadyToRun setStepStatus={_setStepStatus} stepStatus={stepStatus} handleAllDone={handleAllDone}/>);

    return (
        <MediaResponsive>
           <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive wallet={stepStatus.wallet}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        {page}
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive wallet={stepStatus.wallet}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                       {page}
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive wallet={stepStatus.wallet}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                       {page}
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive wallet={stepStatus.wallet}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        {page}
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Mobile>
       </MediaResponsive>
    )

}
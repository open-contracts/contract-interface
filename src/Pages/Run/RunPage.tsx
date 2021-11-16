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
import {useParams} from "react-router-dom";
import { DappI } from '../../Items';

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

    const {
        owner,
        repo,
        branch
    } = useParams();

    const [dapp, setDapp] = useState<DappI>({
        __isDapp__ : true,
        gitUrl : `https://github.com/${owner}/${repo}/${branch}`,
        id : `${owner}/${repo}/${branch||"main"}`,
        owner : owner || "",
        repo : repo || "", 
        branch : branch || "main"
    } )

    useEffect(()=>{
        console.log("First dapp: ", dapp)
    }, [])

    console.log(dapp);

    const [grid, setGrid] = useState(true);
    const [which, setWhich] = useState<string|undefined>(undefined)

    const page = readyToRun ? 
    (<ReadyToRun 
        grid={grid}
        setGrid={setGrid}
        which={which}
        setWhich={setWhich}
        stepStatus={stepStatus} dapp={dapp} setDapp={setDapp}/>) :
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
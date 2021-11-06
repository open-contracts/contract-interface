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
import { checkRootCa } from '../../Sytems/DoOpenContracts';

declare global {
    interface Window {
        ethereum : ethers.providers.ExternalProvider
    }
}

export type HomePageProps = {}

export const simulateNetworkRequest =  async <T extends any>(value : T, upperBound : number = 5000) : Promise<T> =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(value);
        }, Math.random() * upperBound)
    })
}

export const HomePage : FC<HomePageProps>  = () =>{

    useEffect(()=>{

        checkRootCa().then((data)=>{
            console.log(data);
        })
    

    }, [])

    const [stepStatus, setStepStatus] = useState<StepStatusT>({
        crt : "not ready",
        wallet : "not ready",
        enclave : "not ready"
    });

    const [readyToRun, setReadyToRun] = useState(false);
    const handleAllDone = ()=>{
        setReadyToRun(true);
    }
   
    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderDesktop crt={stepStatus.crt} enclave={stepStatus.enclave} wallet={stepStatus.wallet}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        {!readyToRun&&
                            <RunSteps done={handleAllDone} setStepStatus={setStepStatus} stepStatus={stepStatus}/>
                        }
                        {readyToRun && 
                            <RunBenchDesktop dapp={{
                                __isDapp__ : true,
                                id : "test",
                                gitUrl : "https://github.com/open-contracts/reforestation-commitments",
                                functions : [
                                    {
                                        name : "helloWorld",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "helloFriend",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "spray",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "sprayOracle",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "helloWorld",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "helloFriend",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "spray",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "sprayOracle",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "helloWorld",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "helloFriend",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "spray",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    },
                                    {
                                        name : "sprayOracle",
                                        inputs : [],
                                        outputs : [],
                                        stateMutability : "none",
                                        type : "oracle"
                                    }
                                ]
                            }}/>
                        }
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                            <Step/>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Mobile>
       </MediaResponsive>
    )

}
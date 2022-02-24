import React, {FC, ReactElement, useReducer} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StepStatusT, AllSteps } from '../../Statics/Steps/Steps';
import {ReadyToRun} from "./ReadyToRun";
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderDesktop, HeaderResponsive } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';
import {useParams} from "react-router-dom";
import { useErrorContext } from '../../Error/ErrorProvider';
import { DappI, getDappName,  getDappContract } from "../../Items";
import { useOpenContractContext } from '../../Models';

export type RunPageProps = {
    stepStatus : StepStatusT,
    setStepStatus : (status : StepStatusT)=>void
}

export const RunPage : FC<RunPageProps>  = ({
    stepStatus
}) =>{

    const {
        owner,
        repo,
        branch
    } = useParams();

    console.log(branch);

    const [dapp, setDapp] = useReducer(
        (dapp : DappI, set :(dapp : DappI)=>DappI)=>{
            return set(dapp);
        },
        {
            __isDapp__ : true,
            gitUrl : `https://github.com/${owner}/${repo}/${branch}`,
            id : `${owner}/${repo}/${branch||"main"}`,
            owner : owner || "",
            repo : repo || "", 
            branch : branch || "main",
        } 
    )

    const [loc, setLoc] = useState<string>(window.location.hash);
    useEffect(()=>{
        if(loc !== window.location.hash){
            setDapp(()=>({
                __isDapp__ : true,
                gitUrl : `https://github.com/${owner}/${repo}/${branch}`,
                id : `${owner}/${repo}/${branch||"main"}`,
                owner : owner || "",
                repo : repo || "", 
                branch : branch || "main"
            }));
            setLoc(window.location.hash);
        }
    }, [window.location.hash]); // I don't believe this dep array actually does anything.

    const [grid, setGrid] = useState(true);
    const [which, setWhich] = useState<string>("");

    // Logic for loading the contract
    const {
        dispatch
    } = useErrorContext();


    const [nameLoad, setNameLoad] = useState<string|undefined>(undefined);
    useEffect(()=>{

        if(!nameLoad && dapp.owner.length && dapp.repo.length){
            getDappName(
                dapp,
                (name : string)=>setNameLoad(name)
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    }, [dapp.name])
    useEffect(()=>{

        if(dapp.name !== nameLoad){
            setDapp((dapp)=>{
                return {
                    ...dapp,
                    name : nameLoad
                }
            })
        }

    })

    const {dispatch : dispatchContract} = useOpenContractContext();
    const [contractLoad, setContractLoad] = useState<IOpenContract|undefined>(undefined);
    useEffect(()=>{

        if(!dapp.contract && dapp.owner.length && dapp.repo.length){
            
            getDappContract(
                dapp,
                (contract : IOpenContract)=>{
                    setContractLoad(contract);
                    setWhich(contract.contractFunctions[0].name);
                    console.log(contract);
                    dispatchContract((context)=>{
                        return {
                            ...context,
                            openContract : contract
                        }
                    })
                }
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    }, [dapp.contract?.contractName])
    useEffect(()=>{

        if(contractLoad && (dapp.contract !== contractLoad)){
            setDapp(()=>({
                ...dapp,
                contract : contractLoad
            }))
        }

    }, [contractLoad])


    const page = (<ReadyToRun 
    grid={grid}
    setGrid={setGrid}
    which={which}
    setWhich={setWhich}
    dapp={dapp} 
    setDapp={setDapp}/>);

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
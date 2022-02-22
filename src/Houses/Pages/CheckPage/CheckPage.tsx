import React, {FC, ReactElement, useState} from 'react';
import { NotReadyToRun} from "./NotReadyToRun";
import {useCheckStore} from "../../Sytems/CheckProvider";
import { MediaResponsive } from '../../Sytems';
import { StepStatusT, AllSteps } from '../../Statics/Steps/Steps';
import { MainLayoutDesktop, MainLayoutMobile } from '../../Layouts';
import { HeaderResponsive } from '../../Maps/Headers';

export type CheckPageProps = {
    stepStatus : StepStatusT,
    setStepStatus : (status : StepStatusT)=>void
}

export const CheckPage : FC<CheckPageProps>  = ({
    stepStatus,
    setStepStatus
}) =>{

    const {
        dispatch
    } = useCheckStore();

    const handleAllDone = ()=>dispatch((state)=>({
        ...state,
        checksCompleted : true
    }));

    const page = <NotReadyToRun 
    setStepStatus={setStepStatus} 
    stepStatus={stepStatus} 
    handleAllDone={handleAllDone}/>;

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
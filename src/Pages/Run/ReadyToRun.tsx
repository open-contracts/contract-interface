import React, {FC, ReactElement} from 'react';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderDesktop, HeaderResponsive } from '../../Maps/Headers';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';
import { StepStatusT } from '../../Statics/Steps/Steps';
import { RunBenchDesktop } from '../../Benches';
import { Params, useParams } from 'react-router-dom';
import { RunPageWithRepo } from './RunPageWithRepo';
import { RunPageNoRepo } from './RunPageNoRepo';

export type ReadyToRunProps = {
    stepStatus : StepStatusT
}

export const ReadyToRun : FC<ReadyToRunProps>  = ({
    stepStatus
}) =>{

    const {
        owner,
        repo
    } = useParams();

    console.log(owner, repo)


    if(owner && repo){
        
        console.log("We have a repo");

        return (<RunPageWithRepo stepStatus={stepStatus} repo={{
            owner : owner ,
            repo : repo
        }}/>)
    }

    return (

       <RunPageNoRepo stepStatus={stepStatus}/>

    )

}
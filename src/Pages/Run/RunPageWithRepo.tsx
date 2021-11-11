import React, {FC, ReactElement} from 'react';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderDesktop, HeaderResponsive } from '../../Maps/Headers';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';
import { StepStatusT } from '../../Statics/Steps/Steps';
import { RunBenchDesktop } from '../../Benches';
import { DappI } from '../../Items';

export type RunPageWithRepoProps = {
    stepStatus : StepStatusT,
    repo : {
        owner : string,
        repo : string,
        branch : string
    }
}

export const RunPageWithRepo : FC<RunPageWithRepoProps>  = ({
    stepStatus,
    repo
}) =>{

    const dapp : DappI = {
        __isDapp__ : true,
        gitUrl : `https://github.com/${repo.owner}/${repo.repo}/${repo.branch}`,
        id : `${repo.owner}/${repo.repo}/${repo.branch}`
    } 

    

    return (<RunBenchDesktop dapp={dapp} />)

}
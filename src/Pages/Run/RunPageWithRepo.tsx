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
        repo : string
    }
}

export const RunPageWithRepo : FC<RunPageWithRepoProps>  = ({
    stepStatus,
    repo
}) =>{

    const dapp : DappI = {
        __isDapp__ : true,
        gitUrl : `https://github.com/${repo.owner}/${repo.repo}`,
        id : `${repo.owner}/${repo.repo}`
    } 

    return (

        <MediaResponsive>
            <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderDesktop crt={stepStatus.crt} enclave={stepStatus.enclave} wallet={stepStatus.wallet}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <RunBenchDesktop dapp={dapp} />
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
            <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                    
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
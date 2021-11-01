import React, {FC, ReactElement} from 'react';
import { RunBenchDesktop } from '../../Benches';
import { LogoA, LogoB } from '../../Glitter';
import { DappI, isDapp } from '../../Items';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderResponsive } from '../../Maps/Headers';
import { useItemStore } from '../../Sytems/ItemProvider';
import { Colors, DesktopSizes } from '../../Theme';
import { useColorStore } from '../../Theme/ColorProvider';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { RunBenchMobile } from '../../Benches/Run/Run';
import { MainLayoutMobile } from '../../Layouts';
import {Step} from "../../Components/Walkthrough/Step";
import { ArrowUpCircleFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { ReadyT } from '../../Components/Ready/AristophanesReady/AristophanesReady';
import { useEffect } from 'react';
import {RunSteps} from "../../Statics/Steps/RunSteps";

export type HomePageProps = {}

export const HomePage : FC<HomePageProps>  = () =>{

    const Colors = useColorStore();

   
    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <RunSteps/>
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
import React, {FC, ReactElement} from 'react';
import { RunBenchDesktop } from '../../Benches';
import { LogoA } from '../../Glitter';
import { isDapp } from '../../Items';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderResponsive } from '../../Maps/Headers';
import { Colors, DesktopSizes } from '../../Theme';
import { useColorStore } from '../../Theme/ColorProvider';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';
import {ErrorNotification} from "../../Error";

export type ErrorPageProps = {}

export const ErrorPage : FC<ErrorPageProps>  = () =>{


    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <ErrorNotification/>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <ErrorNotification/>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        <ErrorNotification/>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        <ErrorNotification/>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Mobile>
       </MediaResponsive>
    )

}
import React, {FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generateRandomDappItems } from '../Demo';
import { useErrorContext } from '../Error/ErrorProvider';
import { DappI, getDappName } from '../Items';
import { MainRouter } from '../Router';
import { getFeaturedDapps } from '../Sytems/Featured';
import { Colors, DesktopSizes } from '../Theme';
import { ColorProvider } from '../Theme/ColorProvider';
import {DependencyProvider} from "../Sytems/DependencyStatus";
import { RunPage } from '../Pages';

export type MainSegmentProps = {}

export const MainSegment : FC<MainSegmentProps>  = () =>{

    useEffect(()=>{

        getDappName({
            __isDapp__ : true,
            gitUrl : "https://github.com/open-contracts/fiat-swap",
            id : "any"
        }).then((name)=>{
            
        })

    }, [])


    return (

       <div style={{
           background : "white"
       }}>
           <MainRouter/>
       </div>


    )

}
import React, {FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generateRandomDappItems } from '../Demo';
import { useErrorContext } from '../Error/ErrorProvider';
import { DappI } from '../Items';
import { MainRouter } from '../Router';
import { getFeaturedDapps } from '../Sytems/Featured';
import { ItemProvider } from '../Sytems/ItemProvider';
import { Colors, DesktopSizes } from '../Theme';
import { ColorProvider } from '../Theme/ColorProvider';
import {DependencyProvider} from "../Sytems/DependencyStatus";
import { RunPage } from '../Pages';

export type MainSegmentProps = {}

export const MainSegment : FC<MainSegmentProps>  = () =>{


    return (

       <div style={{
           background : Colors.Maintheme
       }}>
           <MainRouter/>
       </div>


    )

}
import React, {FC, ReactElement} from 'react';
import { OpenContractContextProvider } from '../Models';
import { HashIgnorantRouterContextProvider, MainRouter } from "../Router";


export type MainSegmentProps = {}

export const MainSegment : FC<MainSegmentProps>  = () =>{

    return (<OpenContractContextProvider>
            <MainRouter/>
    </OpenContractContextProvider>)

}
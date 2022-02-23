import React, {FC, ReactElement} from 'react';
import { OpenContractContextProvider } from '../Models';
import { MainRouter } from "../Router";


export type MainSegmentProps = {}

export const MainSegment : FC<MainSegmentProps>  = () =>{

    return (<OpenContractContextProvider>
        <MainSegment/>
    </OpenContractContextProvider>)

}
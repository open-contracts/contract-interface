import React, {FC, ReactElement} from 'react';
import { MediaResponsive } from '../../../Sytems';
import { DappI } from '../Dapp';
import { ApolloDappFunctions } from './ApolloRunDappFunctions';
import {ApolloDappFunctionsMobile} from "./ApolloRunDappFunctionsMobile";


export type ApolloRunDappFunctionGridViewProps = {
    which ? : string,
    dapp : DappI,
    setWhich ? : (which : string)=>void
}

export const ApolloRunDappFunctionGridView : FC<ApolloRunDappFunctionGridViewProps>  = ({
    which,
    setWhich,
    dapp
}) =>{

    return (

        <MediaResponsive>
            <MediaResponsive.Desktop>
                <ApolloDappFunctions dapp={dapp} setWhich={setWhich} which={which}/>
            </MediaResponsive.Desktop>
            <MediaResponsive.Laptop>
                <ApolloDappFunctions dapp={dapp} setWhich={setWhich} which={which}/>
            </MediaResponsive.Laptop>
            <MediaResponsive.Mobile>
                <ApolloDappFunctionsMobile dapp={dapp} setWhich={setWhich} which={which}/>
            </MediaResponsive.Mobile>
            <MediaResponsive.Tablet>
                <ApolloDappFunctionsMobile dapp={dapp} setWhich={setWhich} which={which}/>
            </MediaResponsive.Tablet>
        </MediaResponsive>

    )

}
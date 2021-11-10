import React, {FC, ReactElement, useEffect, useState} from 'react';
import { DappI, getDappName, getDappSolidityContract, getDappOracle, getDappImageUri, getDappReadMe, parseGitUrl, getDappContract } from '../Dapp';
import {ApolloRunDappMainItemMobile} from "./ApolloRunDappMainItemMobile";
import {ApolloRunDappMainItemDesktop} from "./ApolloRunDappMainItemDesktop";
import { useErrorContext } from '../../../Error/ErrorProvider';
import { ApolloRunDappMainItemActions } from './ApolloRunDappMainItemActions';
import { MediaResponsive } from '../../../Sytems';

export type ApolloRunDappMainItemProps = {
    dappItem : DappI,
    style? : React.CSSProperties,
    key? : React.Key,
    updateDapp ? : (dapp : DappI)=>void,
    forceLoad ? : boolean
}

export const ApolloRunDappMainItem : FC<ApolloRunDappMainItemProps>  = (props) =>{
    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <ApolloRunDappMainItemDesktop {...props}/>
           </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <ApolloRunDappMainItemDesktop {...props}/>
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <ApolloRunDappMainItemMobile {...props}/>
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <ApolloRunDappMainItemMobile {...props}/>
           </MediaResponsive.Mobile>
       </MediaResponsive>

    )

}
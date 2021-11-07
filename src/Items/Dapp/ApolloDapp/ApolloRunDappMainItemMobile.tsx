import React, {FC, ReactElement, useEffect, useState} from 'react';
import { DappI, getDappName, getDappSolidityContract, getDappOracle, getDappImageUri, getDappReadMe } from '../Dapp';
import { ApolloBlockItemImage, ApolloBlockItemName } from '.';
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ApolloRunDappMainItemReadMe } from './ApolloRunDappMainItem';
import { ApolloRunDappMainMobileItemActions } from './ApolloRunDappMainItemActions';
import { useErrorContext } from '../../../Error/ErrorProvider';
import { DesktopSizes } from '../../../Theme';

export type ApolloRunDappMainItemMobileInternalsProps = {
    dappItem : DappI
    style? : React.CSSProperties,
    key? : React.Key,
}

export const ApolloRunDappMainItemMobileInternals : FC<ApolloRunDappMainItemMobileInternalsProps>  = ({
    dappItem,
    style,
}) =>{


    return (

        <div style={{
            ...style
        }}>
            <div style={{
                display : "grid",
                gridTemplateColumns : "1fr"
            }}>
                <div style={{
                    paddingBottom : DesktopSizes.Padding.whitespacePreferred
                }}>
                    <ApolloRunDappMainMobileItemActions gitUrl={dappItem.gitUrl}/>
                </div>
            </div>
        </div>

    )

}

export type ApolloRunDappMainItemMobileProps = {
    dappItem : DappI,
    style? : React.CSSProperties,
    key? : React.Key,
    updateDapp ? : (dapp : DappI)=>void,
    forceLoad ? : boolean
}

export const ApolloRunDappMainItemMobile : FC<ApolloRunDappMainItemMobileProps>  = ({
    dappItem,
    style,
    updateDapp,
    forceLoad = false
}) =>{



    return (

        <>Not supported</>

    )

}
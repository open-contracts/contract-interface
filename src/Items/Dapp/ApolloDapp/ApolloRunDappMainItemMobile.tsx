import React, {FC, ReactElement, useEffect, useState} from 'react';
import { DappI, getDappName, getDappSolidityContract, getDappOracle, getDappImageUri, getDappReadMe, parseGitUrl, getDappContract } from '../Dapp';
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Colors, DesktopSizes } from '../../../Theme';
import {ApolloRunDappContent} from "./ApolloRunDappContent";
import { ApolloRunDappFunctionGridView } from './ApolloRunDappFunctionGridView';
import { ApolloRunDappFunctionView } from './ApolloRunDappFunctionView';
import { useErrorContext } from '../../../Error/ErrorProvider';
import { ApolloRunDappMainItemMobileActions } from './ApolloRunDappMainItemMobileActions';
import { OpenContractReducer } from '../../../Types';


export type ApolloRunDappMainItemMobileReadmeProps = {
    style ? : React.CSSProperties,
    readme : string | undefined
}

export const ApolloRunDappMainItemMobileReadMe : FC<ApolloRunDappMainItemMobileReadmeProps> = ({
    style,
    readme
})=>{

    return (
        <div style={{
            ...style,
            textAlign : 'left'
        }}>
            {!readme && <Skeleton width="100%" count={5}/>}
            {readme && <ReactMarkdown plugins={[remarkGfm]}>
                {readme}    
            </ReactMarkdown>}
        </div>
    )

}

export type ApolloRunDappMainItemMobileInternalsProps = {
    dappItem : DappI,
    setDappItem : OpenContractReducer,
    style? : React.CSSProperties,
    key? : React.Key,
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ApolloRunDappMainItemMobileInternals : FC<ApolloRunDappMainItemMobileInternalsProps>  = ({
    dappItem,
    style,
    setDappItem,
    grid,
    setGrid,
    which,
    setWhich
}) =>{

    const _selectedFunc = dappItem.contract && dappItem.contract.contractFunctions ? 
                            dappItem.contract.contractFunctions.filter((func)=>{
                                return func.name === which
                            })[0] : undefined

    const selectedFunc = _selectedFunc || (
        dappItem.contract?.contractFunctions[0]
    )

    const setFunc = (set : (
        contractFunction : OpenContractFunctionI
    )=>OpenContractFunctionI)=>setDappItem((dappItem)=>{
        return {
            ...dappItem,
            contract : dappItem.contract && {
                ...dappItem.contract,
                contractFunctions :  dappItem.contract.contractFunctions.reduce((agg, oldContractFunction)=>[
                    ...agg,
                    ...(which === oldContractFunction.name) ? [set(oldContractFunction)] : [oldContractFunction]
                ], [] as OpenContractFunctionI[])
            }
        }
    })

    const handleWhich = (which : string)=>{
        setGrid && setGrid(false);
        setWhich && setWhich(which);
    }

    return (

        <div style={{
            paddingTop : DesktopSizes.Padding.standard,
            width : "100%",
            // paddingBottom : DesktopSizes.Padding.whitespacePreferred,
            ...style
        }}>
            <div>
                <div style={{
                    textAlign : "left",
                    color : Colors.Maintheme
                }}>
                    <h1>{dappItem.contract ? dappItem.contract.contractName : ""}</h1>
                    <p>{dappItem.contract ? dappItem.contract.contractDescription : ""}</p>
                </div>
                <div>
                    <ApolloRunDappMainItemMobileActions
                        dapp={dappItem}
                        gitUrl={dappItem.gitUrl}
                    />
                </div>
                <ApolloRunDappContent grid={grid} setGrid={setGrid}>
                    <ApolloRunDappContent.Grid>
                        <ApolloRunDappFunctionGridView
                            dapp={dappItem}
                            setWhich={handleWhich}
                            which={which}
                        />
                    </ApolloRunDappContent.Grid>
                    <ApolloRunDappContent.Single>
                        <ApolloRunDappFunctionView
                            dapp={dappItem}
                            setDappFunction={setFunc}
                            contractFunction={selectedFunc}
                        />
                    </ApolloRunDappContent.Single>
                </ApolloRunDappContent>
            </div>
        </div>

    )

}

export type ApolloRunDappMainItemMobileProps = {
    dappItem : DappI,
    style? : React.CSSProperties,
    key? : React.Key,
    updateDapp : OpenContractReducer,
    forceLoad ? : boolean,
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ApolloRunDappMainItemMobile : FC<ApolloRunDappMainItemMobileProps>  = ({
    dappItem,
    style,
    updateDapp,
    which,
    setWhich,
    setGrid,
    grid
}) =>{

    return (

        <ApolloRunDappMainItemMobileInternals 
            setDappItem={updateDapp} 
            dappItem={dappItem} 
            grid={grid}
            setGrid={setGrid}
            which={which}
            setWhich={setWhich}
            style={style}/>

    )

}
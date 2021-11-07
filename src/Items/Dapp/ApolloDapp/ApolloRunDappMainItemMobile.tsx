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

    const {
        dispatch
    } = useErrorContext();

    const [dappState, setDappState] = useState(dappItem);
    useEffect(()=>{

        if(dappState !== dappItem && updateDapp){
            updateDapp(dappState)
        }

    })

    const [[nameLoad, nameRequested], setNameLoad] = useState<[
        string|undefined,
        boolean
    ]>([
        forceLoad ? undefined : dappState.name,
        false
    ]);
    useEffect(()=>{

        if(!nameLoad && !nameRequested){
            setNameLoad([undefined, true])
            getDappName(
                dappItem,
                (name : string)=>setNameLoad([name, true])
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    })
    useEffect(()=>{

        if(dappState.name !== nameLoad){
            setDappState({
                ...dappState,
                name : nameLoad
            })
        }

    })


    const [[imageUriLoad, imageUriRequested], setImageUriLoad] = useState<[
        string|undefined,
        boolean
    ]>([
        forceLoad ? undefined : dappState.appTile,
        false
    ]);
    useEffect(()=>{

        if(!imageUriLoad && !imageUriRequested){

            setImageUriLoad([undefined, true])

            getDappImageUri(
                dappItem,
                (imageUri : string)=>setImageUriLoad([imageUri, true])
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    })
    useEffect(()=>{

        if(dappState.appTile !== imageUriLoad){
            setDappState({
                ...dappState,
                appTile : imageUriLoad
            })
        }

    })

    const [[contract, contractRequested], setContract] = useState<[
        string| undefined,
        boolean
    ]>([
        forceLoad ? undefined : dappState.contract,
        false
    ]);
    useEffect(()=>{

        if(!contract && !contractRequested){

            setContract([undefined, true]);

            getDappSolidityContract(
                dappItem,
                (contract : string)=>setContract([contract, true])
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    })
    useEffect(()=>{

        if(dappState.contract !== contract){
            setDappState({
                ...dappState,
                contract : contract
            })
        }

    })

    const [[oracle, oracleRequested], setOracle] = useState<[
        string|undefined,
        boolean
    ]>([
        forceLoad ? undefined : dappState.oracle,
        false
    ]);
    useEffect(()=>{

        if(!oracle && !oracleRequested){
            setOracle([undefined, true])
            getDappOracle(
                dappItem,
                (oracle : string)=>setOracle([oracle, true])
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    })
    useEffect(()=>{

        if(dappState.oracle !== oracle){
            setDappState({
                ...dappState,
                oracle : oracle
            })
        }

    })

    const [[readme, readmeRequested], setReadme] = useState<[
        string|undefined,
        boolean
    ]>([
        forceLoad ? undefined : dappState.readme,
        false
    ]);
    useEffect(()=>{

        if(!readme && !readmeRequested){
            setReadme([undefined, true]);
            getDappReadMe(
                dappItem,
                (readme : string)=>setReadme([readme, true])
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    })
    useEffect(()=>{

        if(dappState.readme !== readme){
            setDappState({
                ...dappState,
                readme : readme
            })
        }

    })

    return (

        <ApolloRunDappMainItemMobileInternals dappItem={dappState} style={style}/>

    )

}
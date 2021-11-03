import React, {FC, ReactElement, useEffect, useState} from 'react';
import { DappI, getDappName, getDappSolidityContract, getDappOracle, getDappImageUri, getDappReadMe, parseGitUrl } from '../Dapp';
import { ApolloBlockItemImage, ApolloBlockItemName } from '.';
import { ApolloDappMainItemSource } from './ApolloDappMainItemSource';
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ApolloDappMainItemActions } from './ApolloDappMainItemActions';
import { useHistory } from 'react-router-dom';
import { useErrorContext } from '../../../Error/ErrorProvider';
import { Colors, DesktopSizes } from '../../../Theme';
import {ApolloDappFunctions} from "./ApolloDappFunctions";
import {TerminalAndres} from "../../../Benches/Terminal/TerminalAndres";

export type ApolloDappMainItemReadmeProps = {
    style ? : React.CSSProperties,
    readme : string | undefined
}

export const ApolloDappMainItemReadMe : FC<ApolloDappMainItemReadmeProps> = ({
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

export type ApolloDappMainItemInternalsProps = {
    dappItem : DappI
    style? : React.CSSProperties,
    key? : React.Key,
}

export const ApolloDappMainItemInternals : FC<ApolloDappMainItemInternalsProps>  = ({
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
                    <ApolloDappMainItemActions gitUrl={dappItem.gitUrl}/>
                </div>
                <div style={{
                    paddingBottom : DesktopSizes.Padding.whitespacePreferred
                }}>
                    <ApolloDappMainItemSource 
                    contract={dappItem.contract}
                    oracle={dappItem.oracle}
                    style={{
                        height : "100%",
                        width : "100%"
                    }}/>
                </div>
                <div style={{
                    display : "flex",
                    justifyContent : "left",
                    justifyItems : "right",
                    alignContent : "left",
                    alignItems : "left",
                    color : Colors.primaryTextColor,
                    width : "100%"
                }}>
                    <ApolloDappFunctions dapp={dappItem}/>
                </div>
                <br/>
                <div>
                    <TerminalAndres style={{
                        width : "100%",
                        height : "200px",
                        overflowY : "scroll",
                        textAlign : "left",
                        padding : DesktopSizes.Padding.standard,
                        color : Colors.primaryTextColor,
                        fontFamily : "Consolas",
                        background : "#1e1e1e"
                    }}>
                        opencontracts@10.123.34.36 &gt;
                    </TerminalAndres>
                </div>
                <hr style={{
                    color : Colors.primaryTextColor
                }}/>
                <div style={{
                    color : Colors.primaryTextColor
                }}>
                    <ApolloDappMainItemReadMe readme={dappItem.readme}/>
                </div>
            </div>
        </div>

    )

}

export type ApolloDappMainItemProps = {
    dappItem : DappI,
    style? : React.CSSProperties,
    key? : React.Key,
    updateDapp ? : (dapp : DappI)=>void,
    forceLoad ? : boolean
}

export const ApolloDappMainItem : FC<ApolloDappMainItemProps>  = ({
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

        <ApolloDappMainItemInternals dappItem={dappState} style={style}/>

    )

}
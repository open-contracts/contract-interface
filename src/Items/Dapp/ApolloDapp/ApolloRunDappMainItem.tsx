import React, {FC, ReactElement, useEffect, useState} from 'react';
import { DappI, getDappName, getDappSolidityContract, getDappOracle, getDappImageUri, getDappReadMe, parseGitUrl } from '../Dapp';
import { ApolloBlockItemImage, ApolloBlockItemName } from '.';
import { ApolloRunDappMainItemSource } from './ApolloRunDappMainItemSource';
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ApolloRunDappMainItemActions } from './ApolloRunDappMainItemActions';
import { useNavigate } from 'react-router-dom';
import { useErrorContext } from '../../../Error/ErrorProvider';
import { Colors, DesktopSizes } from '../../../Theme';
import {ApolloDappFunctions} from "./ApolloRunDappFunctions";
import {DappInput, DappInteractput, DappOutput, DappErrput} from "../../DappPut";

export type ApolloRunDappMainItemReadmeProps = {
    style ? : React.CSSProperties,
    readme : string | undefined
}

export const ApolloRunDappMainItemReadMe : FC<ApolloRunDappMainItemReadmeProps> = ({
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

export type ApolloRunDappMainItemInternalsProps = {
    dappItem : DappI
    style? : React.CSSProperties,
    key? : React.Key,
}

export const ApolloRunDappMainItemInternals : FC<ApolloRunDappMainItemInternalsProps>  = ({
    dappItem,
    style,
}) =>{

    return (

        <div style={{
            width : "100%",
            ...style
        }}>
            <div style={{
                display : "grid",
                width : "100%",
                gridTemplateColumns : "1fr"
            }}>
                <div style={{
                    width : "100%",
                    paddingBottom : DesktopSizes.Padding.whitespacePreferred
                }}>
                    <ApolloRunDappMainItemActions gitUrl={dappItem.gitUrl}/>
                </div>
                <div style={{
                    color : Colors.primaryTextColor,
                    width : "100%"
                }}>
                    <ApolloDappFunctions dapp={dappItem}/>
                </div>
                <br/>
                <div style={{
                    width : "100%"
                }}>
                    <DappInput dappInput={{
                        type : "input",
                        name : "msg",
                        prompt : "Test",
                        description : "Something should go in here.",
                        value : "None"
                    }}/>
                    <br/>
                    <DappInteractput dappInteractput={{
                        type : "interactive",
                        name : "Request to launch interactive mode",
                        description : "Something should go in here.",
                        value : "None"
                    }}/>
                    <br/>
                    <DappOutput
                        dappOutput={{
                            type : "output",
                            name : "Output from helloWorld",
                            description : "Something should go in here.",
                            value : "Your hash: 524b2a8ba5be13ef0837accdb22741c3e1bfba59"
                        }}
                    />
                    <br/>
                    <DappErrput dappErrput={{
                         type : "error",
                         name : "Error: invalid argument",
                         description : "You are seeing this error because.",
                         value : "Error: invalid argument at line 27 in oracle.py"
                    }}/>
                </div>
            </div>
        </div>

    )

}

export type ApolloRunDappMainItemProps = {
    dappItem : DappI,
    style? : React.CSSProperties,
    key? : React.Key,
    updateDapp ? : (dapp : DappI)=>void,
    forceLoad ? : boolean
}

export const ApolloRunDappMainItem : FC<ApolloRunDappMainItemProps>  = ({
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

        <ApolloRunDappMainItemInternals dappItem={dappState} style={style}/>

    )

}
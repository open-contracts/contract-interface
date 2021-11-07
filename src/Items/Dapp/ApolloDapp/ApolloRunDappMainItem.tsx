import React, {FC, ReactElement, useEffect, useState} from 'react';
import { DappI, getDappName, getDappSolidityContract, getDappOracle, getDappImageUri, getDappReadMe, parseGitUrl, getDappContract } from '../Dapp';
import { ApolloBlockItemImage, ApolloBlockItemName } from '.';
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
                    textAlign : "left",
                    color : Colors.primaryTextColor
                }}>
                    <h3>{dappItem.name}</h3>
                </div>
                <br/>
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

    const [nameLoad, setNameLoad] = useState<string|undefined>(undefined);
    useEffect(()=>{

        if(!nameLoad){
            getDappName(
                dappItem,
                (name : string)=>setNameLoad(name)
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    }, [])
    useEffect(()=>{

        if(dappState.name !== nameLoad){
            setDappState({
                ...dappState,
                name : nameLoad
            })
        }

    })

    const [contractLoad, setContractLoad] = useState<OpenContractI|undefined>(undefined);
    useEffect(()=>{

        if(!contractLoad){
            getDappContract(
                dappItem,
                (contract : OpenContractI)=>setContractLoad(contract)
            ).catch((err)=>{

                console.log(err);

                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    }, [])
    useEffect(()=>{

        if(dappState.contract !== contractLoad){
            setDappState({
                ...dappState,
                contract : contractLoad
            })
        }

    })

    return (

        <ApolloRunDappMainItemInternals dappItem={dappState} style={style}/>

    )

}
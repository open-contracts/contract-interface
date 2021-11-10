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
import { ApolloRunDappMainItemActions } from './ApolloRunDappMainItemActions';


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
    dappItem : DappI,
    setDappItem ? : (dappItem : DappI)=>void,
    style? : React.CSSProperties,
    key? : React.Key,
}

export const ApolloRunDappMainItemInternals : FC<ApolloRunDappMainItemInternalsProps>  = ({
    dappItem,
    style,
    setDappItem
}) =>{

    const [which, setWhich] = useState<string|undefined>(undefined);

    const _selectedFunc = dappItem.contract && dappItem.contract.contractFunctions ? 
                            dappItem.contract.contractFunctions.filter((func)=>{
                                return func.name === which
                            })[0] : undefined

    const selectedFunc = _selectedFunc || (
        dappItem.contract?.contractFunctions[0]
    )

    const setFunc = (contractFunction : OpenContractFunctionI)=>{

        

        if(dappItem.contract && setDappItem){

            const newContractFunctions = dappItem.contract.contractFunctions.reduce((agg, oldContractFunction)=>{

                return [
                    ...agg,
                    ...(contractFunction.name === oldContractFunction.name) ? [contractFunction] : [oldContractFunction]
                ]
            }, [] as OpenContractFunctionI[])

        
    
            setDappItem({
                ...dappItem,
                contract : {
                    ...dappItem.contract,
                    contractFunctions : newContractFunctions
                }
            })

        }

    }

    const [grid, setGrid] = useState(true);
    const handleWhich = (which : string)=>{
        setGrid(false);
        setWhich(which);
    }

    return (

        <div style={{
            width : "100%",
            paddingBottom : DesktopSizes.Padding.whitespacePreferred,
            ...style
        }}>
            <div>
                <div style={{
                    textAlign : "left",
                    color : Colors.Maintheme
                }}>
                    <h1>{dappItem.name}</h1>
                </div>
                <div>
                    <ApolloRunDappMainItemActions
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

        if((dappState !== dappItem) && updateDapp){
            
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
    const [contractLoaded, setContracLoaded] = useState(false);
    useEffect(()=>{

        if(!contractLoad){
            getDappContract(
                dappItem,
                (contract : OpenContractI)=>{
                    
                    setContractLoad(contract)
                }
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

        if(contractLoad && (dappState.contract !== contractLoad) && !contractLoaded){
            setDappState({
                ...dappState,
                contract : contractLoad
            })
            setContracLoaded(true);
        }

    })

    const handleSetDappState = (dapp :DappI)=>{
        
        
        setDappState(dapp);
    }
    

    return (

        <ApolloRunDappMainItemInternals setDappItem={handleSetDappState} dappItem={dappState} style={style}/>

    )

}
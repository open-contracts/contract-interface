import React, {FC, ReactElement, useEffect, useState} from 'react';
import { DappI, getDappName, getDappSolidityContract, getDappOracle, getDappImageUri, getDappReadMe, parseGitUrl, getDappContract } from '../Dapp';
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ApolloRunDappMainItemActions } from './ApolloRunDappMainItemActions';
import { useNavigate } from 'react-router-dom';
import { useErrorContext } from '../../../Error/ErrorProvider';
import { Colors, DesktopSizes } from '../../../Theme';
import {ApolloDappFunctions} from "./ApolloRunDappFunctions";
import {DappInput, DappInteractput, DappOutput, DappErrput} from "../../DappPut";
import {DappFunctionAthena} from "../../DappFunction";

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

    useEffect(()=>{
        
    })


    return (

        <div style={{
            width : "100%",
            ...style
        }}>
            <div style={{
            }}>
                <div style={{
                    textAlign : "left",
                    color : Colors.Maintheme
                }}>
                    <h1>{dappItem.name}</h1>
                </div>
                <br/>
                <div>
                    <ApolloRunDappMainItemActions gitUrl={dappItem.gitUrl} dapp={dappItem}/>
                </div>
                <div style={{
                    textAlign : "left",
                    color : Colors.Maintheme
                }}>
                    <h3>Functions</h3>
                </div>
                <div style={{
                    color : Colors.Maintheme,
                    width : "100%"
                }}>
                    <ApolloDappFunctions which={selectedFunc ? selectedFunc.name : undefined} dapp={dappItem} setWhich={setWhich}/>
                </div>
                <br/>
                <div style={{
                    width : "100%"
                }}>
                   {selectedFunc && <DappFunctionAthena 
                            setDappFunction={setFunc}
                            dapp={dappItem} 
                            contractFunction={selectedFunc}/>}
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
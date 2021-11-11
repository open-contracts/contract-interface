import React, {FC, ReactElement, useReducer} from 'react';
import { Colors, DesktopSizes } from '../../Theme';
import { DappI, parseGitUrl } from '../Dapp/Dapp';
import { DappInput, DappPut } from '../DappPut';
import { DappDescputI, DappOracleInputI, DappErrputI, DappInputI, DappInteractputI, DappOracleputI, DappOutputI, DappPutI, DappResultputI } from '../DappPut/DappPutType';
import {to} from "await-to-js";
import { useEffect } from 'react';
import {DappFunctionLogRunButton} from "./DappFunctionLogRunButton";
import {DappFunctionSubmitState} from "./DappFunctionSubmitState";
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import {generate} from "shortid";
import * as log from "./StateMethods";

export type DappFunctionLogAthenaProps = {
    dapp : DappI,
    contractFunction : OpenContractFunctionI,
    setDappFunction ? : (func : OpenContractFunctionI)=>void
}



export const DappFunctionLogAthena : FC<DappFunctionLogAthenaProps>  = ({
    dapp,
    contractFunction,
    setDappFunction 
}) =>{

    

    const resetArgs = (
        oc : OpenContractFunctionI,
        setOc ? : (oc : OpenContractFunctionI)=>void
    )=>{
        setOc && setOc({
            ...oc,
            inputs : log.resetInputs(oc.inputs)
        })
    }

    const inputs = log.createInputs(
        contractFunction.inputs,
        contractFunction,
        setDappFunction
    );
    const updatedPuts = log.produceUpdatedPuts(
        contractFunction.puts,
        contractFunction,
        setDappFunction
    )
    const puts = updatedPuts.reduce((agg, put, index)=>{
        return [
            ...agg,
            ...put.putType !== "input" ? [
                (
                    <><DappPut 
                        key={generate()}
                        contractFunction={contractFunction}
                        setContractFunction={setDappFunction}
                        end={index > (contractFunction.puts ? contractFunction.puts.length - 2 : -1)}
                        index={index} put={put}/><br/></>
                )
            ] : []
        ]
    }, [] as React.ReactNode[])


    const addOutput = (name : string, message : string)=>{
        const newOutput = {
            name : name,
            value : message
        };
        const _newFuctionState = {
            ...contractFunction,
            ...contractFunction.requiresOracle ? {
                result : "Oracle output received! See below."
            } : {},
            prints : [...contractFunction.prints||[], newOutput],
            puts : [...contractFunction.puts||[], ...log.createOutputs(
                [newOutput],
                contractFunction,
                setDappFunction
            )]
        }
        setDappFunction && setDappFunction(_newFuctionState);
    }
    contractFunction.printHandler = async (message : string)=>{
        addOutput("Output received!", message)
    }

    const addOracleInput = (
        data : string,
        resolve : (msg : string)=>void,
        reject : (msg : string)=>void
    )=>{
        const newOracleInput = {
            prompt : data,
            response : undefined,
            id : generate()
        }
        const _newFunctionState = {
            ...contractFunction,
            oracleInputs : {
                ...contractFunction.oracleInputs, 
                [newOracleInput.id] : newOracleInput
            },
            puts : [...contractFunction.puts||[], ...log.createOracleInputs(
                {[newOracleInput.id] : newOracleInput},
                contractFunction,
                resolve,
                reject,
                setDappFunction
            )]
        }
        setDappFunction &&  setDappFunction({
            ..._newFunctionState,
        })
    }
    contractFunction.inputHandler = async (message : string)=>{
        return new Promise((resolve, reject)=>{
            addOracleInput(message, resolve, reject);
        })
    }

    const addError = (name : string, e : any)=>{
        const newError = {
            name : name,
            description : e
        }
        const _newFunctionState = {
            ...contractFunction,
            errors : [...contractFunction.errors||[], newError],
            puts : [...(contractFunction.puts||[]), ...log.createErrors(
                [newError], 
                resetArgs,
                contractFunction,
                setDappFunction
            )]
        }
        setDappFunction && setDappFunction(_newFunctionState)
    }

    const handleError = async (message : string)=>{

        

        addError("An error occurred!", message);

    }
    contractFunction.errorHandler = handleError;

    const addOracleData = (
        data : OpenContractFunctionI["oracleData"], 
        resolve : OpenContractFunctionI["oraclePromiseResolve"],
        reject : OpenContractFunctionI["oraclePromiseReject"]
    )=>{
        
        setDappFunction && setDappFunction({
            ...contractFunction,
            oracleData : data,
            oraclePromiseResolve : resolve,
            oraclePromiseReject : reject
        })
    }

    const addResult = (data : OpenContractFunctionI["result"])=>{
        const _newFunctionState = {
            ...contractFunction,
            result : data,
            puts : [...contractFunction.puts||[], log.createResult(
                data,
                contractFunction,
                setDappFunction
            )]
        }
        setDappFunction &&  setDappFunction({
            ..._newFunctionState,
            
        })
    }

    const [oracleStates, setOracleStates] = useReducer<
        (
            state : OpenContractFunctionI["oracleData"], 
            data : OpenContractFunctionI["oracleData"]
        )=>OpenContractFunctionI["oracleData"]
    >(
        (state, data)=>{
            return {
                ...state,
                ...data
            }
        },
        (contractFunction.oracleData)
    );
    useEffect(()=>{
        if(
            oracleStates !== undefined
            && log.allPromisesResolved(oracleStates) 
            && contractFunction.oracleData !== oracleStates
        ){
            contractFunction.oraclePromiseResolve && contractFunction.oraclePromiseResolve(oracleStates as any);
            addOracleData(
                oracleStates,
                undefined,
                undefined
            );
        }
    }, [oracleStates])

    const loadOracleData = async () : Promise<{[key : string] : string}>=>{
        const {
            owner,
            repo,
            branch
        } = parseGitUrl(dapp.gitUrl)

        const [error, data]= await to<{[key : string] : Promise<string>}>(window.githubOracleDownloader(
            owner || "",
            repo || "",
            branch || "main",
            contractFunction.oracleFolder
        ));

        if(error){
            addError(
                "Oracle data unavailable.",
                `We were unable to fetch oracle data at ${owner}/${repo}/${branch}.`
            )
        }
        return new Promise((resolve, reject)=>{
            if(data){
                Object.keys(data).map((key)=>{
                    if((data[key] as Promise<string>).then){
                        (data[key] as Promise<string>).then((data)=>{
                            setOracleStates({
                                [key] : data
                            })
                        }).catch(()=>{
                            contractFunction.oraclePromiseReject && 
                            contractFunction.oraclePromiseReject(); 
                        })
                    }
                })
            }
            addOracleData(
                data||{} as any,
                resolve,
                reject
            );
            if(error){
                addError("An error occurred!", "GitHub download failed.");
                reject();
            }
        })

    }

    const addOracleCallput = (call : ()=>Promise<string>)=>{
        const _newFunctionState : OpenContractFunctionI = {
            ...contractFunction,
            callOracle : call
        }
        setDappFunction &&  setDappFunction({
            ..._newFunctionState,

        });
    }

    const handleSubmit = async (call : ()=>Promise<string>)=>{
        addOracleCallput(call);
    }
    contractFunction.submitHandler = handleSubmit;

    const handleCall = async ()=>{

       return new Promise((resolve, reject)=>{

            /*addResult(<div style={{
                display : 'flex',
                alignContent : "center",
                alignItems : "center"
            }}>
                <Spinner style={{
                    height : "10px",
                    width : "10px"
                }} animation="border"/>
                &emsp;Pending...
            </div>)*/

            if(contractFunction.requiresOracle){

                if(!contractFunction.oracleData){
                    addError("No Oracle data!", "Oracle data is required for this function.");
                    resolve({});
                }

                contractFunction.call(contractFunction).then((data)=>{
                    /*addOutput(data ? data : <div style={{
                        display : 'flex',
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        <Spinner style={{
                            height : "10px",
                            width : "10px"
                        }} animation="border"/>
                        &emsp;Attempting oracle connection...
                    </div>)*/;
                    resolve(data);
                }).catch((err)=>{
                    addError("An error occurred!", err.toString());
                    resolve({});
                })
                return;
            } 
            contractFunction.call(contractFunction).then((data)=>{
                addResult(data.length ? data : "Success!");
                resolve(data);
            }).catch((err)=>{
                addError("An error occurred!", err.toString());
                resolve({});
            })
       })

    }

    const addInteractput = (name : string, targetUrl : string, sessionUrl : string)=>{
        const newXpra =  {
            name : name,
            description : targetUrl,
            value : sessionUrl
        };
        const _newFuctionState = {
            ...contractFunction,
            ...contractFunction.requiresOracle ? {
                result : "Oracle output received! See below."
            } : {},
            xpras : [...contractFunction.xpras||[], newXpra],
            puts : [...contractFunction.puts||[], ...log.createXpras(
                [newXpra],
                contractFunction,
                setDappFunction
            )]
        }
        setDappFunction && setDappFunction(_newFuctionState);

    }

    contractFunction.xpraHandler = async (targetUrl, sessionUrl, xpraExit)=>{

        addInteractput("Interactive session requested.", targetUrl, sessionUrl);

    }

    

    return (

        <>
            <div style={{
                width : "100%",
                paddingBottom : DesktopSizes.Padding.standard,
            }}>
                <DappFunctionLogRunButton
                    setContractFunction={setDappFunction}
                    contractFunction={contractFunction}
                />
                <br/>
                <DappFunctionSubmitState
                    setFunc={setDappFunction}
                    loadOracleData={loadOracleData}
                    call={handleCall}
                    contractFunction={contractFunction}
                />
                <br/>
                {puts}
                <br/>
            </div>
        </>

    )

}
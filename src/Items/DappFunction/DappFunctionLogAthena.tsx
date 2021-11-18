import React, {FC, PureComponent, ReactElement, useReducer} from 'react';
import { Colors, DesktopSizes } from '../../Theme';
import { DappI, parseGitUrl } from '../Dapp/Dapp';
import { DappDescput, DappInput, DappPut } from '../DappPut';
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
    setFunctionState ? : (func : OpenContractFunctionI)=>void
}

export class ClientError extends Error {
    
}

export const DappFunctionLogAthena : FC<DappFunctionLogAthenaProps>  = ({
    dapp,
    contractFunction,
    setFunctionState
}) =>{

    const [reducedFunctionState, reduceFunctionState] = useReducer(
        (state : OpenContractFunctionI, update : log.reduceContractFunctionI)=>{
            
            setFunctionState && setFunctionState(update(state));
            return update(state);
        },
        contractFunction
    )

    const resetArgs = (reduceFunctionState : (update : log.reduceContractFunctionI)=>void)=>{
        reduceFunctionState((oc : OpenContractFunctionI)=>{
            return {
                ...oc,
                inputs : log.resetInputs(oc.inputs)
            }
        })
    }
    const updatedPuts = log.produceUpdatedPuts(
        contractFunction.puts,
        contractFunction,
        reduceFunctionState
    );
    const puts = updatedPuts.reduce((agg, put, index)=>{
        return [
            ...agg,
            ...put.putType !== "input" ? [
                (
                    <div key={index}><DappPut 
                        key={index}
                        contractFunction={contractFunction}
                        reduceContractFunction={reduceFunctionState}
                        end={index > (contractFunction.puts ? contractFunction.puts.length - 2 : -1)}
                        index={index} put={put}/><br/></div>
                )
            ] : []
        ]
    }, [] as React.ReactNode[])


    const addOutput = (name : string, message : string)=>{
        const update = (contractFunction : OpenContractFunctionI)=>{
            const newOutput = {
                name : name,
                value : message
            };
            return {
                ...contractFunction,
                ...contractFunction.requiresOracle ? {
                    result : "Oracle output received! See below."
                } : {},
                prints : [...contractFunction.prints||[], newOutput],
                puts : [...contractFunction.puts||[], ...log.createOutputs(
                    [newOutput],
                    contractFunction,
                    reduceFunctionState
                )]
            }
        }
        reduceFunctionState(update);
    }
    contractFunction.printHandler = async (message : string)=>{
        addOutput("Notification.", message)
    }

    const addOracleInput = (
        data : string,
        resolve : (msg : string)=>void,
        reject : (msg : string)=>void
    )=>{
        const update = (contractFunction : OpenContractFunctionI)=>{
            
            const newOracleInput = {
                prompt : data,
                response : undefined,
                id : generate()
            }
            return {
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
                    reduceFunctionState
                )]
            }
        }
        reduceFunctionState(update);
    };
    useEffect(()=>{
        setFunctionState && setFunctionState({
            ...contractFunction,
        })
    }, [contractFunction.puts])
    useEffect(()=>{
        contractFunction.inputHandler = async (message : string)=>{
            
            return new Promise((resolve, reject)=>{
                
                addOracleInput(message, resolve, reject);
            })
        }
    })

    const addError = (e : Error)=>{
        const update = (contractFunction : OpenContractFunctionI)=>{
            const newError = {
                ...e,
                description : e.message
            }
            const _newFunctionState = {
                ...contractFunction,
                errors : [...contractFunction.errors||[], newError],
                puts : [...(contractFunction.puts||[]), ...log.createErrors(
                    [newError], 
                    resetArgs,
                    contractFunction,
                    reduceFunctionState
                )]
            }
            return _newFunctionState;
        }
        reduceFunctionState(update);
    }

    const handleError = async (e : Error)=>{

        addError(e);

    }
    contractFunction.errorHandler = handleError;

    const addOracleData = (
        data : OpenContractFunctionI["oracleData"], 
        resolve : OpenContractFunctionI["oraclePromiseResolve"],
        reject : OpenContractFunctionI["oraclePromiseReject"]
    )=>{
        
        reduceFunctionState((contractFunction)=>{
           return {
            ...contractFunction,
            oracleData : data,
            oraclePromiseResolve : resolve,
            oraclePromiseReject : reject
           }
        })

    }

    const addResult = (data : OpenContractFunctionI["result"])=>{

        const update = (contractFunction : OpenContractFunctionI)=>{
            const _newFunctionState = {
                ...contractFunction,
                result : data,
                puts : [...contractFunction.puts||[], log.createResult(
                    data,
                    contractFunction,
                    reduceFunctionState
                )]
            }
            return _newFunctionState;
        }
        reduceFunctionState(update);

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

        const [error, data]= await to<{[key : string] : Promise<string>}>(window.githubOracleDownloader(
            dapp.owner || "",
            dapp.repo || "",
            dapp.branch || "main",
            contractFunction.oracleFolder
        ));

        if(error){
            addError(
                new ClientError("Oracle data unavailable."),
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
                addError(new ClientError("GitHub download failed."));
                reject();
            }
        })

    }

    const addOracleCallput = (call : ()=>Promise<void>)=>{
        reduceFunctionState((contractFunction)=>{
            return {
                ...contractFunction,
                callOracle : call,
                puts : [...contractFunction.puts||[], log.createOracleCallPut(
                    call,
                    contractFunction,
                    reduceFunctionState
                )]
            }
        })
    }

    const handleSubmit = async (call : ()=>Promise<void>)=>{
        
        addOracleCallput(call);
    }
    contractFunction.submitHandler = handleSubmit;

    const handleCall = async ()=>{

        

       return new Promise((resolve, reject)=>{

            if(contractFunction.requiresOracle){

                if(!contractFunction.oracleData){
                    addError(new ClientError("Oracle data is required for this function."));
                    resolve({});
                }

                contractFunction.call(contractFunction).then((data)=>{
                    resolve(data);
                }).catch((err)=>{
                    addError(err);
                    resolve({});
                })
                return;
            } 
            contractFunction.call(contractFunction).then((data)=>{
                addResult(data);
                
                resolve(data);
            }).catch((err)=>{
                
                addError(err);
                resolve({});
            })
       })

    }

    const addInteractput = (name : string, targetUrl : string, sessionUrl : string, xpraExit : Promise<void>)=>{
      reduceFunctionState((contractFunction)=>{
        const newXpra : DappInteractputI =  {
            name : name,
            targetUrl : targetUrl,
            sessionUrl : sessionUrl,
            xpraExit : xpraExit,
            description : targetUrl,
            value : sessionUrl,
            putType : "interactive",
            contractFunction : contractFunction,
            reduceContractFunction : reduceFunctionState
        };
        return {
            ...contractFunction,
            ...contractFunction.requiresOracle ? {
                result : "Oracle output received! See below."
            } : {},
            xpras : [...contractFunction.xpras||[], newXpra],
            puts : [...contractFunction.puts||[], ...log.createXpras(
                [newXpra],
                contractFunction,
                reduceFunctionState
            )]
        }
      });

    }

    contractFunction.xpraHandler = async (targetUrl, sessionUrl, xpraExit)=>{

        
        addInteractput("Interactive session started.", targetUrl, sessionUrl, xpraExit);

    }

    

    return (

        <>
            <div style={{
                width : "100%",
                paddingBottom : DesktopSizes.Padding.standard,
            }}>
                {contractFunction.description && <DappDescput
                contractFunction={contractFunction}
                reduceContractFunction={reduceFunctionState}
                    dappDescput={{
                        name : "Description",
                        description : contractFunction.description,
                        value : contractFunction.description,
                        putType : "description",
                        contractFunction : contractFunction,
                        reduceContractFunction : reduceFunctionState
                    }}
                />}
                <br/>
                {contractFunction.inputs.length > 0 && <DappFunctionLogRunButton
                    reduceContractFunction={reduceFunctionState}
                    contractFunction={contractFunction}
                />}
                <br/>
                <DappFunctionSubmitState
                    reduceContractFunction={reduceFunctionState}
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

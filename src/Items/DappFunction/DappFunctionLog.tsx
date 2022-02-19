import React, {FC, PureComponent, ReactElement, useReducer} from 'react';
import { Colors, DesktopSizes } from '../../Theme';
import { DappI, parseGitUrl } from '../Dapp/Dapp';
import { DappDescput, DappInput, DappPut } from '../DappPut';
import { DappDescputI, DappOracleInputI, DappErrputI, DappInputI, DappInteractputI, DappOracleputI, DappOutputI, DappPutI, DappResultputI } from '../DappPut/DappPutType';
import {to} from "await-to-js";
import { useEffect } from 'react';
import {DappFunctionLogRunButton} from "./DappFunctionLogRunButton";
import {DappFunctionSubmitState} from "./DappFunctionSubmitState";
import {generate} from "shortid";
import * as log from "./StateMethods";
import { OpenContractFunctionReducer } from '../../Types';


export type DappFunctionLogProps = {
    dapp : DappI,
    contractFunction : OpenContractFunctionI,
    setFunctionState : OpenContractFunctionReducer
}

/**
 * Declared here, but the ClientError from the window will be used.
 */
export class ClientError extends Error {};

export const DappFunctionLog : FC<DappFunctionLogProps>  = ({
    dapp,
    contractFunction,
    setFunctionState
}) =>{

    const [tick, forceUpdate] = useReducer(x=>x+1, 0);

    const resetArgs = (setFunctionState : (update : log.reduceContractFunctionI)=>void)=>{
        setFunctionState((oc : OpenContractFunctionI)=>{
            return {
                ...oc,
                inputs : log.resetInputs(oc.inputs)
            }
        })
    };

    const updatedPuts = log.produceUpdatedPuts(
        contractFunction.puts,
        contractFunction,
        setFunctionState
    );

    const puts = updatedPuts.reduce((agg, put, index)=>{
        return [
            ...agg,
            ...put.putType !== "input" ? [
                (
                    <div 
                        style={{
                            paddingBottom : DesktopSizes.Padding.standard
                        }}
                        key={index}><DappPut 
                        key={`${index}-${tick}`} // this needs to be index to allow for updates, but...
                        // we also need to inlcude an index 
                        contractFunction={contractFunction}
                        reduceContractFunction={setFunctionState}
                        end={index > (contractFunction.puts ? contractFunction.puts.length - 2 : -1)}
                        index={index} put={put}/></div>
                )
            ] : []
        ]
    }, [] as React.ReactNode[])


    const addOutput = (name : string, message : string)=>{
        setFunctionState((contractFunctionState)=>{
            const newOutput = {
                name : name,
                value : message
            };
            return {
                ...contractFunctionState,
                ...contractFunctionState.requiresOracle ? {
                    result : "Oracle output received! See below."
                } : {},
                waiting : false,
                prints : [...contractFunctionState.prints||[], newOutput],
                puts : [...contractFunctionState.puts||[], ...log.createOutputs(
                    [newOutput],
                    contractFunction,
                    setFunctionState
                )]
            }
        });
    }
    contractFunction.printHandler = async (message : string)=>{
        addOutput("Notification.", message)
    }

    const addOracleInput = (
        data : string,
        resolve : (msg : string)=>void,
        reject : (msg : string)=>void
    )=>{
        setFunctionState((contractFunction : OpenContractFunctionI)=>{
            
            const newOracleInput = {
                prompt : data,
                response : undefined,
                id : generate()
            }
            return {
                ...contractFunction,
                waiting : false,
                oracleInputs : {
                    ...contractFunction.oracleInputs, 
                    [newOracleInput.id] : newOracleInput
                },
                puts : [...contractFunction.puts||[], ...log.createOracleInputs(
                    {
                        [newOracleInput.id] : newOracleInput
                    },
                    contractFunction,
                    resolve,
                    reject,
                    setFunctionState
                )]
            }
        });
    };
    useEffect(()=>{
        contractFunction.inputHandler = async (message : string)=>{
            return new Promise((resolve, reject)=>{
                addOracleInput(message, resolve, reject);
                forceUpdate();
            })
        }
    })

    const addError = (e : Error)=>{
        setFunctionState((contractFunction : OpenContractFunctionI)=>{
            const newError = {
                ...e,
                value : e.message
            }
            return {
                ...contractFunction,
                waiting : false,
                errors : [...contractFunction.errors||[], newError],
                puts : [...(contractFunction.puts||[]), ...log.createErrors(
                    [newError], 
                    resetArgs,
                    contractFunction,
                    setFunctionState
                )]
            }
        });
    }

    contractFunction.errorHandler = async (e : Error)=>{
        addError(e);
    };

    const addOracleData = (
        data : OpenContractFunctionI["oracleData"], 
        resolve : OpenContractFunctionI["oraclePromiseResolve"],
        reject : OpenContractFunctionI["oraclePromiseReject"]
    )=>{
        
        setFunctionState((contractFunction)=>{
           return {
            ...contractFunction,
            waiting : false,
            oracleData : {
                ...contractFunction.oracleData,
                ...data
            },
            oraclePromiseResolve : resolve,
            oraclePromiseReject : reject
           }
        })

    }

    const addResult = (data : OpenContractFunctionI["result"])=>{

        

        setFunctionState((contractFunction : OpenContractFunctionI)=>{
            return {
                ...contractFunction,
                result : data,
                puts : [...contractFunction.puts||[], log.createResult(
                    data,
                    contractFunction,
                    setFunctionState
                )]
            }
        });

    }

    const [oracleStates, setOracleStates] = useReducer(
        (
            state : OpenContractFunctionI["oracleData"], 
            set : (data : OpenContractFunctionI["oracleData"])=>OpenContractFunctionI["oracleData"]
        )=>set(state),
        contractFunction.oracleData
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
                            setOracleStates((oracleData)=>({
                                ...oracleData,
                                [key] : data
                            }))
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
        setFunctionState((contractFunction)=>{
            return {
                ...contractFunction,
                waiting : false,
                callOracle : call,
                puts : [...contractFunction.puts||[], log.createOracleCallPut(
                    call,
                    contractFunction,
                    setFunctionState
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

                contractFunction.call().then((data)=>{
                    resolve(data);
                }).catch((err)=>{
                    addError(err);
                    resolve({});
                })
                return;
            } 
            
            contractFunction.call().then((data)=>{
                addResult(data);
                resolve(data);
            }).catch((err)=>{
                addError(err);
                resolve({});
            })
       })

    }

    const addInteractput = (name : string, targetUrl : string, sessionUrl : string, xpraExit : Promise<void>)=>{
      setFunctionState((contractFunction)=>{
        const newXpra : DappInteractputI =  {
            name : name,
            targetUrl : targetUrl,
            sessionUrl : sessionUrl,
            xpraExit : xpraExit,
            description : "",
            value : "",
            putType : "interactive",
            contractFunction : contractFunction,
            reduceContractFunction : setFunctionState
        };
        return {
            ...contractFunction,
            ...contractFunction.requiresOracle ? {
                result : "Oracle output received! See below."
            } : {},
            waiting : false,
            xpras : [...contractFunction.xpras||[], newXpra],
            puts : [...contractFunction.puts||[], ...log.createXpras(
                [newXpra],
                contractFunction,
                setFunctionState
            )]
        }
      });

    }

    contractFunction.xpraHandler = async (targetUrl, sessionUrl, xpraExit)=>{

        addInteractput("Interactive session started.", targetUrl, sessionUrl, xpraExit);

    }

    const addWaitingPut = (seconds : number, message : string)=>{

        log.removeWaitingPut(setFunctionState);

        setFunctionState((state)=>{
            return {
                ...state,
                waiting : true,
                puts : [...state.puts||[], log.createWaitingPut(
                    seconds, 
                    message,
                    contractFunction,
                    setFunctionState
                )]
            }
        })
    }

    contractFunction.waitHandler = async (seconds, message)=>{
        addWaitingPut(seconds, message);
    }

    useEffect(()=>{
        if(!contractFunction.waiting){
            log.removeWaitingPut(setFunctionState);
        }
    }, [contractFunction.waiting]);

    return (

        <>
            <div style={{
                width : "100%",
                paddingBottom : DesktopSizes.Padding.standard,
            }}>
                {contractFunction.description && <div style={{
                    paddingBottom : DesktopSizes.Padding.standard
                }}>
                    <DappDescput
                    contractFunction={contractFunction}
                    reduceContractFunction={setFunctionState}
                    dappDescput={{
                        name : "Description",
                        value : contractFunction.description,
                        putType : "description",
                        contractFunction : contractFunction,
                        reduceContractFunction : setFunctionState
                    }}/>    
                </div>}
                {contractFunction.inputs.length > 0 && <div style={{
                    paddingBottom : DesktopSizes.Padding.standard
                }}>
                    <DappFunctionLogRunButton
                    reduceContractFunction={setFunctionState}
                    contractFunction={contractFunction}
                /></div>}
                <div style={{
                    paddingBottom : DesktopSizes.Padding.standard
                }}>
                    <DappFunctionSubmitState
                        reduceContractFunction={setFunctionState}
                        loadOracleData={loadOracleData}
                        call={handleCall}
                        contractFunction={contractFunction}
                    />
                </div>
                {puts}
                <br/>
            </div>
        </>

    )

}

import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { Play, PlayCircleFill, PlayFill } from 'react-bootstrap-icons';
import { AthenaButton } from '../../Components/Buttons';
import { Colors, DesktopSizes } from '../../Theme';
import { DappI, parseGitUrl } from '../Dapp/Dapp';
import { DappInput, DappPut } from '../DappPut';
import { DappDescputI, DappErrputI, DappInputI, DappInteractputI, DappOracleputI, DappOutputI, DappPutI, DappResultputI } from '../DappPut/DappPutType';
import {to} from "await-to-js";
import { useEffect } from 'react';
import { DappInputHeader } from '../DappPut/DappInput/DappInputHeader';
import { DappResultput } from '../DappPut/DappResultput';
import { ArrowReturnRight } from 'react-bootstrap-icons';
import {DappFunctionLogRunButton} from "./DappFunctionLogRunButton";
import {DappFunctionSubmitState} from "./DappFunctionSubmitState";
import { Spinner } from 'react-bootstrap';

export interface OpenContractLogStateI {
    log : any[]
}

export type DappFunctionLogAthenaProps = {
    dapp : DappI,
    contractFunction : OpenContractFunctionI,
    setDappFunction ? : (func : OpenContractFunctionI)=>void
}

export const transformToDappPut = (put : OpenContractFunctionI["inputs"] | OpenContractFunctionI["prints"])=>{

}

export const createInputs = (inputs : OpenContractFunctionI["inputs"]) : DappInputI[]=>{
    return inputs.map((input)=>{
        return {
            ...input,
            putType : "input"
        } as DappInputI
    })
}

export const createErrors = (errors : OpenContractFunctionI["errors"]) : DappErrputI[]=>{
    return errors ? errors.map((error)=>{
        return {
            ...error,
            putType : "error"
        }
    }) : []
}

export const createXpras = (xpras : OpenContractFunctionI["xpras"]) : DappInteractputI[]=>{
    return xpras ? xpras.map((xpra)=>{
        return {
            ...xpra,
            putType : "interactive"
        } 
    }) : []
}

export const createOutputs = (prints : OpenContractFunctionI["prints"]) : DappOutputI[]=>{
    return prints ? prints.map((print)=>{
        return {
            ...print,
            putType : "output"
        } 
    }) : []
}

export const createOracleData = (
    contractFunction : OpenContractFunctionI,
    setFunc ? : (func : OpenContractFunctionI)=>void
) : DappOracleputI=>{

    const setOracleData = (data : OpenContractFunctionI["oracleData"])=>{
        
        
        setFunc && setFunc({
            ...contractFunction,
            oracleData : data,
            oraclePromiseReject : undefined,
            oraclePromiseResolve : undefined
        })
    }

    return {
        name : "Oracle data",
        contractFunction : contractFunction,
        putType : "oracle",
        setOracleData : setOracleData
    } as DappOracleputI

}

export const createResult = (contractFunction : OpenContractFunctionI) : DappResultputI=>{
    return {
        name : contractFunction.name,
        value : contractFunction.result,
        putType : "result"
    }
}

export const createDescriptionData = (contractFunction : OpenContractFunctionI) : DappDescputI[]=>{
    return [
        {
            name : contractFunction.name,
            description : contractFunction.description,
            putType : "description",
            value : contractFunction.name,

        }
    ]
}

export const aggregateContractFunctionPuts = (
    contractFunction : OpenContractFunctionI,
)=>{

    return [
       /* ...createInputs(contractFunction),
        ...createErrors(contractFunction),
        ...createXpras(contractFunction),
        ...createOutputs(contractFunction),*/
    ]

}

export const getContractFunctionInputs = (puts : DappPutI[])=>{
    return puts.filter((put)=>{
        return put.putType === "input";
    });
}

export const DappFunctionLogAthena : FC<DappFunctionLogAthenaProps>  = ({
    dapp,
    contractFunction,
    setDappFunction
}) =>{

    const setPut = (put : DappPutI, index : number)=>{
        if(!contractFunction.puts){
            contractFunction.puts = [];
        }
        contractFunction.puts[index] = put;
        setDappFunction && setDappFunction({
            ...contractFunction,
            inputs : getContractFunctionInputs(contractFunction.puts)
        })
    }

    const inputs = createInputs(contractFunction.inputs);
    const puts = contractFunction.puts && contractFunction.puts.reduce((agg, put, index)=>{
        return [
            ...agg,
            ...put.putType !== "input" ? [
                (
                    <DappPut 
                        end={index > (contractFunction.puts ? contractFunction.puts.length - 2 : -1)}
                        setPut={setPut} index={index} put={put}/>
                )
            ] : []
        ]
    }, [] as React.ReactNode)

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
            puts : [...contractFunction.puts||[], ...createOutputs([newOutput])]
        }
        setDappFunction && setDappFunction(_newFuctionState)
    }

    contractFunction.printHandler = async (message : string)=>{
        addOutput("Output received!", message)
    }

    const addError = (name : string, e : any)=>{

        const newResult = (
            <div style={{
                alignContent : 'center',
                alignItems : 'center'
            }}>
                <p>
                    <span style={{
                        color : Colors.secondaryTextColor
                    }}>Previous result:</span> {typeof contractFunction.result === "string" ? contractFunction.result : "No data received."}
                </p>
                <p style={{
                    color : Colors.fadedRed
                }}>
                     <span style={{
                        color : Colors.secondaryTextColor
                    }}>Current result:</span> Error
                </p>
            </div>
        )
        const newError = {
            name : name,
            description : e
        }
        const _newFunctionState = {
            ...contractFunction,
            result : newResult,
            errors : [...contractFunction.errors||[], newError],
            puts : [...contractFunction.puts||[], ...createErrors([newError])]
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
        }
        setDappFunction &&  setDappFunction({
            ..._newFunctionState,
            puts : [
                ..._newFunctionState.puts || [],
                createResult(_newFunctionState)
            ]
        })
    }

    const loadOracleData = async () : Promise<{[key : string] : string}>=>{
        const {
            owner,
            repo
        } = parseGitUrl(dapp.gitUrl)

        const [error, data]= await to(window.githubOracleDownloader(
            owner || "",
            repo || "",
            "main",
            contractFunction.oracleFolder
        ));

        return new Promise((resolve, reject)=>{
            addOracleData(
                data||{} as any,
                resolve,
                reject
            )
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
            puts : [
                ..._newFunctionState.puts || [],
                createResult(_newFunctionState)
            ]
        })
    }

    const handleCall = async ()=>{

       return new Promise((resolve, reject)=>{

            addResult(<div style={{
                display : 'flex',
                alignContent : "center",
                alignItems : "center"
            }}>
                <Spinner style={{
                    height : "10px",
                    width : "10px"
                }} animation="border"/>
                &emsp;Pending...
            </div>)

            if(contractFunction.requiresOracle){

                if(!contractFunction.oracleData){
                    addError("No Oracle data!", "Oracle data is required for this function.");
                    resolve({});
                }

                contractFunction.call(contractFunction).then((data)=>{
                    addResult(data ? data : <div style={{
                        display : 'flex',
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        <Spinner style={{
                            height : "10px",
                            width : "10px"
                        }} animation="border"/>
                        &emsp;Attempting oracle connection...
                    </div>);
                    console.log("Oracle data received...", data);
                    addOracleCallput(data);
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
            puts : [...contractFunction.puts||[], ...createXpras([newXpra])]
        }
        setDappFunction && setDappFunction(_newFuctionState)
    }

    contractFunction.xpraHandler = async (targetUrl, sessionUrl, xpraExit)=>{

        addInteractput("Interactive session requested.", targetUrl, sessionUrl);

    }

    console.log(contractFunction.callOracle);

    return (

        <>
            <div style={{
                width : "100%",
                paddingBottom : DesktopSizes.Padding.standard,
            }}>
                <DappFunctionLogRunButton
                    puts={inputs}
                    setPut={setPut}
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
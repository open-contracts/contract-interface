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

export const createInputs = (contractFunction : OpenContractFunctionI) : DappInputI[]=>{
    return contractFunction.inputs.map((input)=>{
        return {
            ...input,
            putType : "input"
        } as DappInputI
    })
}

export const createErrors = (contractFunction : OpenContractFunctionI) : DappErrputI[]=>{
    return contractFunction.errors ? contractFunction.errors.map((error)=>{
        return {
            ...error,
            putType : "error"
        }
    }) : []
}

export const createXpras = (contractFunction : OpenContractFunctionI) : DappInteractputI[]=>{
    return contractFunction.xpras ? contractFunction.xpras.map((xpra)=>{
        return {
            ...xpra,
            putType : "interactive"
        } 
    }) : []
}

export const createOutputs = (contractFunction : OpenContractFunctionI) : DappOutputI[]=>{
    return contractFunction.prints ? contractFunction.prints.map((xpra)=>{
        return {
            ...xpra,
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
            oracleData : data
        })
    }

    return {
        name : contractFunction.name,
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
    setFunc ? : (func : OpenContractFunctionI)=>void
)=>{

    return [
        ...createInputs(contractFunction),
        ...contractFunction.requiresOracle ? [createOracleData(contractFunction, setFunc)] : [],
        ...createErrors(contractFunction),
        ...createXpras(contractFunction),
        ...createOutputs(contractFunction),
    ]

}

export const getContractFunctionInputs = (puts : DappPutI[])=>{


    return puts.filter((put)=>{
        
        return put.putType === "input";
    })

}

export const DappFunctionLogAthena : FC<DappFunctionLogAthenaProps>  = ({
    dapp,
    contractFunction,
    setDappFunction
}) =>{

    const logState : OpenContractLogStateI = {
        log : aggregateContractFunctionPuts(contractFunction)
    }

    const setPut = (put : DappPutI, index : number)=>{
        logState.log[index] = put;
        setDappFunction && setDappFunction({
            ...contractFunction,
            inputs : getContractFunctionInputs(logState.log)
        })
    }

    const puts = logState.log.map((put, index)=>{
        return (
            <div style={{
                width : "100%",
                paddingBottom : DesktopSizes.Padding.standard
            }}><DappPut setPut={setPut} index={index} put={put}/></div>
        )
    })

    const addOutput = (name : string, message : string)=>{
        setDappFunction && setDappFunction({
            ...contractFunction,
            prints : [...contractFunction.prints||[], {
                name : name,
                value : message
            }]
        })
    }

    contractFunction.printHandler = async (message : string)=>{
        addOutput("Output received!", message)
    }

    const addError = (name : string, e : any)=>{

        setDappFunction && setDappFunction({
            ...contractFunction,
            errors : [...contractFunction.errors||[], {
                name : name,
                description : e
            }]
        })

    }

    const handleError = async (message : string)=>{

        addError("An error occurred!", message);

    }
    contractFunction.errorHandler = handleError;

    const addOracleData = (data : OpenContractFunctionI["oracleData"])=>{
        setDappFunction && setDappFunction({
            ...contractFunction,
            oracleData : data
        })
    }

    const addResult = (data : OpenContractFunctionI["result"])=>{
        setDappFunction &&  setDappFunction && setDappFunction({
            ...contractFunction,
            result : data
        })
    }

    const handleCall = async ()=>{

        if(contractFunction.requiresOracle){

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

            if(error){
                addError("An error occurred!", "GitHub download failed.");
                return;
            }

            addOracleData(data||{} as any)

            contractFunction.oracleData = data || {} as any;

            contractFunction.call(contractFunction).then((data)=>{
                addResult(data);
            }).catch((err)=>{
                addError("An error occurred!", err.toString());
            })

        }
        contractFunction.call(contractFunction).then((data)=>{
            addResult(data);
        }).catch((err)=>{
            addError("An error occurred!", err.toString());
        })

    }

    const addInteractput = (name : string, targetUrl : string, sessionUrl : string)=>{

        setDappFunction && setDappFunction({
            ...contractFunction,
            xpras : [...contractFunction.xpras||[], {
                name : name,
                description : sessionUrl,
                value : targetUrl
            }]
        })
    }

    contractFunction.xpraHandler = async (targetUrl, sessionUrl, xpraExit)=>{

        addInteractput("Interactive session requested.", targetUrl, sessionUrl);

    }

    const inputs = contractFunction.inputs.map((input)=>{
        return (
            <div style={{
                alignContent : 'center',
                alignItems : "center",
                paddingBottom : DesktopSizes.Padding.standard,
                lineHeight : "18px"
            }}>
                <DappInputHeader dappInput={input as DappInputI} style={{
                    width : "50px",
                    fontSize : "16px",
                }}/>
                <span style={{
                    color : Colors.forestEdge,
                    fontSize : "16px"
                }}>&emsp;=&ensp;{input.value||"undefined"}</span>
            </div>
        )
    })

    console.log(logState);

    return (

        <>
            <div style={{
                width : "100%",
                paddingBottom : DesktopSizes.Padding.standard,
            }}>
                <DappFunctionLogRunButton
                    puts={logState.log}
                    setPut={setPut}
                    contractFunction={contractFunction}
                    handleCall={handleCall}
                />
                {puts}
                <DappFunctionSubmitState
                    call={handleCall}
                    contractFunction={contractFunction}
                />
            </div>
        </>

    )

}
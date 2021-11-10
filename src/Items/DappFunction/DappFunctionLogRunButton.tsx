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
import { TextInputApollo } from '../../Components/TextInput';
export const createResult = (contractFunction : OpenContractFunctionI) : DappResultputI=>{
    return {
        name : contractFunction.name,
        value : contractFunction.result,
        putType : "result"
    }
}

export type DappFunctionLogRunButtonProps = {
    contractFunction : OpenContractFunctionI,
    puts : DappPutI[],
    setPut : (put : DappPutI, index : number)=>void
}

export const DappFunctionLogRunButton : FC<DappFunctionLogRunButtonProps>  = ({
    puts,
    contractFunction,
    setPut
}) =>{

    console.log("Puts received...", puts);

    const inputs = puts.reduce((agg, put, index)=>{
        
        const onTextInput = (text : string)=>{
            setPut({
                ...put,
                value : text
            } as DappInputI, index)
        }
        return [
            ...agg,
            ...put.putType === "input" ? [
                (
                    <div style={{
                        alignContent : 'center',
                        alignItems : "center",
                        paddingBottom : DesktopSizes.Padding.standard,
                        lineHeight : "18px"
                    }}>
                        <DappInputHeader dappInput={put as DappInputI} style={{
                            width : "50px",
                            fontSize : "16px",
                        }}/>
                        <br/>
                        <div style={{
                            display : "flex",
                            color : Colors.secondaryTextColor,
                            alignContent : "center",
                            alignItems : "center",
                            fontSize : "16px"
                        }}>
                           &emsp;<span style={{
                               fontSize : "16px"
                           }}>=&emsp;</span><TextInputApollo
                            value={put.value ? put.value : ""}
                            onTextInput={onTextInput}
                            style={{
                                fontSize : "16px"
                           }}/>
                        </div>
                    </div>
                )
            ] : []
        ]
    }, [] as React.ReactNode[])
    return (
             <div style={{
                position : "relative",
            }}>
                <div
                    style={{
                        width : "100%",
                        padding : DesktopSizes.Padding.standard,
                        borderTopLeftRadius : DesktopSizes.BorderRadius.standard,
                        borderTopRightRadius : DesktopSizes.BorderRadius.standard,
                        borderBottomLeftRadius : DesktopSizes.BorderRadius.standard,
                        borderBottomRightRadius : DesktopSizes.BorderRadius.standard,
                        borderLeft :`1px solid ${Colors.Maintheme}`,
                        borderRight : `1px solid ${Colors.Maintheme}`,
                        borderTop : `1px solid ${Colors.Maintheme}`,
                        borderBottom : `1px solid ${Colors.Maintheme}`,
                        background : 'white'
                    }}>
                    <div style={{
                        fontSize : "24px",
                        textAlign : "left"
                    }}>
                        <p><PlayCircleFill/>&emsp;{contractFunction.name}<sub>𝑥</sub></p>
                        <div style={{
                            paddingLeft : DesktopSizes.Padding.whitespacePreferred
                        }}>
                            {inputs}
                        </div>
                    </div>
                </div>
            </div>
       
      

    )

}
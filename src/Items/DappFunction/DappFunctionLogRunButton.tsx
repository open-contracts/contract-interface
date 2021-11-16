import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { Play, PlayCircleFill, PlayFill } from 'react-bootstrap-icons';
import { AthenaButton } from '../../Components/Buttons';
import { Colors, DesktopSizes } from '../../Theme';
import { DappInputHeader } from '../DappPut/DappInput/DappInputHeader';
import { DappResultput } from '../DappPut/DappResultput';
import { ArrowReturnRight } from 'react-bootstrap-icons';
import { TextInputApollo } from '../../Components/TextInput';
import * as pure from "./StateMethods";
import {generate} from "shortid";


export type DappFunctionLogRunButtonProps = {
    contractFunction : OpenContractFunctionI,
    reduceContractFunction : (contractFunction : pure.reduceContractFunctionI)=>void,
}

export const DappFunctionLogRunButton : FC<DappFunctionLogRunButtonProps>  = ({
    contractFunction,
    reduceContractFunction
}) =>{

    

    const inputs = pure.createInputs(
        contractFunction.inputs,
        contractFunction,
        reduceContractFunction
    ).map((input, index)=>{

        const onTextInput = (text : string)=>{

            reduceContractFunction((contractFunction)=>{
                
                contractFunction.inputs[index] =  {
                    ...contractFunction.inputs[index],
                    value : text
                }
                return contractFunction
            });
        }

        console.log(input.value);

        return (
                    <div 
                    key={`${index}-${input.name}`}
                    style={{
                        alignContent : 'center',
                        alignItems : "center",
                        paddingBottom : DesktopSizes.Padding.standard,
                        lineHeight : "18px"
                    }}>
                        <DappInputHeader dappInput={input} style={{
                            // width : "50px",
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
                           defaultValue={input.value}
                           value={input.value||""}
                            onTextInput={onTextInput}
                            style={{
                                fontSize : "16px"
                           }}/>
                        </div>
                    </div>
                )
         
    })
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
                        <p>𝑥&emsp;Inputs</p>
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
import React, {FC, ReactElement} from 'react';
import { Colors, DesktopSizes, Shadows } from '../../Theme';
import { DappInputHeader } from '../DappPut/DappInput/DappInputHeader';
import { TextInputApollo } from '../../Components/TextInput';
import * as pure from "./StateMethods";
import { DefaultHeader } from '../DappPut/Standards';

export type DappFunctionLogRunButtonProps = {
    contractFunction : OpenContractFunctionI,
    reduceContractFunction : (contractFunction : pure.reduceContractFunctionI)=>void,
}

export const DappFunctionLogRunButton : FC<DappFunctionLogRunButtonProps>  = ({
    contractFunction,
    reduceContractFunction
}) =>{

    const searchParams = new URLSearchParams(window.location.search);

    const inputs = pure.createInputs(
        contractFunction,
        reduceContractFunction
    ).map((input, index)=>{

       const _input = searchParams.get(`${contractFunction.name}.${input.name}`);
       const val = _input && decodeURI(_input);

       if(!input.value && val){
           reduceContractFunction((contractFunction)=>{
            const newInput =  {
                ...contractFunction.inputs[index],
                value : val
            };
            return  {
                ...contractFunction,
                inputs : [
                    ...contractFunction.inputs.slice(0, index),
                    newInput,
                    ...contractFunction.inputs.slice(index + 1)
                ]
            };
           })
       }

        const onTextInput = (text : string)=>{
      
            reduceContractFunction((contractFunction)=>{
                
                const newInput =  {
                    ...contractFunction.inputs[index],
                    value : text
                };
                const newC = {
                    ...contractFunction,
                    inputs : [
                        ...contractFunction.inputs.slice(0, index),
                        newInput,
                        ...contractFunction.inputs.slice(index + 1)
                    ]
                };
                searchParams.set(
                    `${contractFunction.name}.${input.name}`,
                    text
                );

                

                // nav(`/${params.toString()}#/${window.location.hash}`)

                window.history.pushState({
                    path : `/?${searchParams.toString()}${window.location.hash}`
                }, '', `/?${searchParams.toString()}${window.location.hash}`)

                return newC;
            });
        }

        

        return (
                    <><div 
                    key={`${index}-${input.name}`}
                    style={{
                        alignContent : 'center',
                        alignItems : "center",
                        paddingBottom : DesktopSizes.Padding.standard,
                        lineHeight : "18px"
                    }}>
                        <DappInputHeader dappInput={input} style={{
                            fontSize : "16px",
                        }}/>
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
                            value={input.value||val||""}
                            onTextInput={onTextInput}
                            style={{
                                fontSize : "16px"
                           }}/>
                        </div>
                    </div><br/></>
                )
         
    });

    return (
             <div style={{
                position : "relative",
            }}>
                <div
                    style={{
                        width : "100%",
                        borderTopLeftRadius : DesktopSizes.BorderRadius.standard,
                        borderTopRightRadius : DesktopSizes.BorderRadius.standard,
                        borderBottomLeftRadius : DesktopSizes.BorderRadius.standard,
                        borderBottomRightRadius : DesktopSizes.BorderRadius.standard,
                        background : 'white',
                        boxShadow : Shadows.defaultShadow,
                        padding :  "20px"
                    }}>
                    <div style={{
                        color : Colors.Maintheme
                    }}>
                        <DefaultHeader dappPut={{
                            name : "Inputs",
                            putType : "Inputs",
                            value : "any",
                            contractFunction : {} as OpenContractFunctionI,
                            reduceContractFunction : ()=>{} 
                        }}>
                            <DefaultHeader.Pre>
                            𝑥
                            </DefaultHeader.Pre>
                        </DefaultHeader>
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
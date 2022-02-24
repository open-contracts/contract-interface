import React, {FC, ReactElement} from 'react';
import { Colors, DesktopSizes, Shadows } from '../../Theme';
import { DappInputHeader } from '../DappPut/DappInput/DappInputHeader';
import { TextInputApollo } from '../../Components/TextInput';
import * as pure from "./StateMethods";
import { DefaultHeader } from '../DappPut/Standards';
import { useSearchParams } from 'react-router-dom';
import jwt from "jwt-simple";
import lz from "lzutf8";
import { StringifyOptions } from 'node:querystring';

export type DappFunctionLogRunButtonProps = {
    contractFunction : OpenContractFunctionI,
    reduceContractFunction : (contractFunction : pure.reduceContractFunctionI)=>void,
}

export const DappFunctionLogRunButton : FC<DappFunctionLogRunButtonProps>  = ({
    contractFunction,
    reduceContractFunction
}) =>{

    const [searchParams, setSearchParams]= useSearchParams();
    const searchInput = searchParams.get(contractFunction.name);
    const _searchInput : {[key : string] : string} | undefined= searchInput 
    && JSON.parse(decodeURI(searchInput));

    const inputs = pure.createInputs(
        contractFunction,
        reduceContractFunction
    ).map((input, index)=>{

       const val = _searchInput && _searchInput[input.name];

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
                }

                /*setSearchParams({
                    ...searchParams,
                    [contractFunction.name] : encodeURI(JSON.stringify({
                            ..._searchInput,
                            [input.name] : text
                        }))
                });*/

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
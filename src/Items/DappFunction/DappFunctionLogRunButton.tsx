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
export const createResult = (contractFunction : OpenContractFunctionI) : DappResultputI=>{
    return {
        name : contractFunction.name,
        value : contractFunction.result,
        putType : "result"
    }
}

export type DappFunctionLogRunButtonProps = {
    contractFunction : OpenContractFunctionI,
    handleCall : ()=>void
}

export const DappFunctionLogRunButton : FC<DappFunctionLogRunButtonProps>  = ({
    contractFunction,
    handleCall
}) =>{

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

    const [isHovered, setHovered] = useState(false);
    const handleMouseOver = ()=>{
        setHovered(true);
    }
    const handleMouseOut = ()=>{
        setHovered(false);
    }

    return (
        <div 
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
             <div style={{
                position : "relative",
            }}>
                <AthenaButton 
                    hovered={isHovered}
                    style={{
                        width : "100%",
                        padding : DesktopSizes.Padding.standard,
                        borderBottomLeftRadius : "0px",
                        borderBottom : "none",
                        borderLeft :`1px solid ${Colors.Maintheme}`,
                        borderRight : `1px solid ${Colors.Maintheme}`,
                        borderTop : `1px solid ${Colors.Maintheme}`,
                        borderBottomRightRadius : "0px"
                    }}
                    primaryColor={Colors.Maintheme} secondaryColor={"white"} onClick={handleCall}>
                    <div style={{
                        fontSize : "24px",
                        textAlign : "left"
                    }}>
                        <p><PlayCircleFill/>&emsp;{contractFunction.name}<sub>x</sub></p>
                        <div style={{
                            paddingLeft : DesktopSizes.Padding.whitespacePreferred
                        }}>
                            {inputs}
                        </div>
                    </div>
                </AthenaButton>
            </div>
            <div style={{
                display : "grid",
                alignContent : "center",
                alignItems : "center",
                gridTemplateColumns : "1fr 9fr"
            }}>
                <AthenaButton 
                hovered={isHovered}
                onClick={handleCall}
                primaryColor={Colors.Maintheme} secondaryColor={"white"}
                style={{
                    height : "100%",
                    width : "100%",
                    borderTopLeftRadius : "0px",
                    borderTopRightRadius : "0px",
                    borderBottomRightRadius : "0px",
                    zIndex : 100,
                    borderTop : "none",
                    borderRight : "none",
                    borderBottom : `1px solid ${Colors.Maintheme}`,
                    borderLeft : `1px solid ${Colors.Maintheme}`
                }}><ArrowReturnRight size={30}/></AthenaButton>
                <div style={{
                    background : isHovered ? Colors.Maintheme : "white",
                    borderBottomLeftRadius : "0px",
                    borderBottomRightRadius : DesktopSizes.BorderRadius.standard,
                }}>
                    <DappResultput
                        dappResultput={createResult(contractFunction)}
                        style={{
                            borderTopLeftRadius : DesktopSizes.BorderRadius.standard,
                            borderBottomLeftRadius : "0px",
                            borderTopRightRadius : "0px",
                            borderLeft : `1px solid ${Colors.Maintheme}`,
                            borderRight : `1px solid ${Colors.bloodOrange}`,
                            borderTop : `1px solid ${Colors.Maintheme}`,
                            borderBottom : `1px solid ${Colors.bloodOrange}`
                        }}
                />
                </div>
            </div>
        </div>
      

    )

}
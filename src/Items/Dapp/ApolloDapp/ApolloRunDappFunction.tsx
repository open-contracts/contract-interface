import React, {FC, ReactElement} from 'react';
import {DappI} from "../Dapp";
import {AthenaButton} from "../../../Components/Buttons/AthenaButton";
import {Colors, DesktopSizes} from "../../../Theme";
import { DappInputHeader } from '../../DappPut/DappInput/DappInputHeader';
import { DappInputI } from '../../DappPut/DappPutType';

export type ApolloDappFunctionProps = {
    dapp : DappI,
    func : OpenContractFunctionI,
    selected : boolean,
    onClick ? : (
        e : React.MouseEvent,
        name : string
    )=>void,
    style ? : React.CSSProperties
}

export const ApolloDappFunction : FC<ApolloDappFunctionProps>  = ({
    dapp,
    func,
    selected,
    onClick,
    style 
}) =>{

    const handleClick = (e : React.MouseEvent)=>{
        onClick && onClick(e, func.name);
    }

    const inputs = func.inputs.map((input)=>{
        return (<DappInputHeader
            key={input.name}
            dappInput={input as DappInputI} style={{
            fontSize : "16px"
        }}/>)
    })

    return (

    
            <AthenaButton 
            onClick={handleClick}
                style={{
                    wordWrap : "normal",
                    width : "auto",
                    fontSize : "18px",
                    ...style
                }}
            
                primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                       <div style={{
                           overflowX : "scroll",
                           overflowY : "scroll",
                           padding : DesktopSizes.Padding.standard
                       }}>
                            <div style={{
                                display : "flex",
                                justifyContent : "left",
                                alignContent : "center",
                                alignItems : "center",
                            }}>
                                <div>
                                    <b>ƒ<sub>𝑥</sub></b>&emsp;
                                </div>
                                <hr style={{
                                    color : Colors.Maintheme
                                }}/>
                                <div>
                                    {func.name}
                                </div>
                            </div>  
                            <div>
                                {inputs}
                            </div>
                            <div style={{
                                textAlign : "left"
                            }}>
                                {func.requiresOracle && <i style={{
                                    color : Colors.deepCyan,
                                    fontSize : "16px",
                                    textAlign : "left"
                                }}>
                                    Oracle required.  
                                </i>}
                            </div>
                       </div>
            </AthenaButton>


    )

}
import React, {FC, ReactElement, useState} from 'react';
import {DappI} from "../Dapp";
import {AthenaButton} from "../../../Components/Buttons/AthenaButton";
import {Colors, DesktopSizes} from "../../../Theme";
import { DappInputHeader } from '../../DappPut/DappInput/DappInputHeader';
import { DappInputI } from '../../DappPut/DappPutType';
import { ThroughGlassAgathocles } from '../../../Glitter/Animations/ThroughGlass/ThroughGlassAgathocles';
import { GrowOnEventAchamaenid } from '../../../Glitter/Animations';

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

    const [isHovered, setHovered] = useState(false);

    const handleMouseOver = ()=>{
        setHovered(true);
    }

    const handleMouseOut = ()=>{
        setHovered(false);
    }

    return (

     
        <ThroughGlassAgathocles glass={isHovered} glassOpacity={.7}>
            <GrowOnEventAchamaenid grow={isHovered}>
            <AthenaButton 
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseOut}
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
                                    fontSize : "18px"
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
                                        color : Colors.cyan,
                                        fontSize : "16px",
                                        textAlign : "left"
                                    }}>
                                        Oracle required.  
                                    </i>}
                                </div>
                        </div>
                </AthenaButton>
            </GrowOnEventAchamaenid>
    </ThroughGlassAgathocles>



    )

}
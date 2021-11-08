import React, {FC, ReactElement} from 'react';
import {DappI} from "../Dapp";
import {AthenaButton} from "../../../Components/Buttons/AthenaButton";
import {Colors} from "../../../Theme";

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

    return (

    
            <AthenaButton 
            onClick={handleClick}
                style={{
                    wordWrap : "normal",
                    width : "auto",
                    fontSize : "18px",
                    ...style
                }}
            
            primaryColor={Colors.Maintheme} secondaryColor={Colors.primaryTextColor}>
                    <div style={{
                        display : "flex",
                        justifyContent : "center",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        <div>
                            <b>ƒ<sub>x</sub></b>&emsp;
                        </div>
                        <div>
                           {func.name}
                        </div>
                    </div>
            </AthenaButton>


    )

}
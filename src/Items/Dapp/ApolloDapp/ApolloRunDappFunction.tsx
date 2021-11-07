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
    )=>void
}

export const ApolloDappFunction : FC<ApolloDappFunctionProps>  = ({
    dapp,
    func,
    selected,
    onClick 
}) =>{

    const handleClick = (e : React.MouseEvent)=>{
        onClick && onClick(e, func.name);
    }

    return (

    
            <AthenaButton 
            onClick={handleClick}
                style={{
                    borderTop : "none",
                    borderLeft: "none",
                    borderRight : "none",
                    borderBottom : selected ? `1px solid ${Colors.primaryTextColor}` : "none",
                    borderRadius : 0,
                    wordWrap : "normal",
                    width : "auto"
                }}
            
            primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
                    <div style={{
                        display : "grid",
                        gridTemplateColumns : "1fr auto",
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
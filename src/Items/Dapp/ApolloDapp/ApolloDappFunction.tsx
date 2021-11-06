import React, {FC, ReactElement} from 'react';
import {DappI} from "../Dapp";
import {AthenaButton} from "../../../Components/Buttons/AthenaButton";
import {Colors} from "../../../Theme";
import { AbiI } from '../../../Sytems/DoOpenContracts/OpenContractInterface';

export type ApolloDappFunctionProps = {
    dapp : DappI,
    func : AbiI,
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

        <div>
            <AthenaButton 
            onClick={handleClick}
                style={{
                    borderTop : "none",
                    borderLeft: "none",
                    borderRight : "none",
                    borderBottom : selected ? `1px solid ${Colors.primaryTextColor}` : "none",
                    borderRadius : 0
                }}
            
            primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
                <b>ƒ<sub>x</sub></b>&emsp;{func.name}
            </AthenaButton>
        </div>

    )

}